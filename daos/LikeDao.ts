/**
 * @file Implements DAO managing data storage of Likes. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Like from "../models/Like";
import LikeDaoI from "../interfaces/Likes/LikesDao";
import LikeModel from "../mongoose/Like/LikeModel";

/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} userDao Private single instance of LikeDao.
 */
export default class LikeDao implements LikeDaoI {
  private static likeDao: LikeDao | null = null;
  /**
   * Creates singleton DAO instance
   * @returns LikeDao
   */
  public static getInstance = (): LikeDao => {
    if (LikeDao.likeDao === null) {
      LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
  };
  private constructor() {}
  /**
   * Extracts all the Users that liked a particular Tuit.
   * @param tid Id of the Tuit
   * @returns a list of Likes with the User Information Populated.
   */
  findAllUsersThatLikedTuit = async (tid: string): Promise<Like[]> =>
    LikeModel.find({ tuit: tid, liked: true }).populate("likedBy").exec();

  /**
   * Extracts all the tuits liked by a particular User.
   * @param uid Id of the User
   * @returns a list of Tuit with the User Information Populated
   */
  findAllTuitsLikedByUser = async (uid: any) =>
    LikeModel.find({ likedBy: uid })
      .populate({
        path: "tuit",
        populate: {
          path: "postedBy",
        },
      })
      .exec();
  /**
   * Creates a Like of the User to a particular tuit on the Database.
   * @param uid Id of the User
   * @param tid ID of the Tuit
   * @returns a like object that is created on Database.
   */
  userLikesTuit = async (uid: string, tid: string): Promise<any> => {
    const data = await LikeModel.findOne({ tuit: tid, likedBy: uid });
    if (data === null) {
      return await LikeModel.create({ tuit: tid, likedBy: uid, liked: true });
    } else {
      await LikeModel.updateOne({ _id: data._id }, { $set: { liked: true } });
      data.liked = true;
      return data;
    }
  };

  /**
   * Creates a Dislike of the User to a particular tuit on the Database.
   * @param uid Id of the User
   * @param tid ID of the Tuit
   * @returns a like object that is created on Database.
   */
  userDislikesTuit = async (uid: string, tid: string): Promise<any> => {
    const data = await LikeModel.findOne({ tuit: tid, likedBy: uid });
    if (data === null) {
      return await LikeModel.create({ tuit: tid, likedBy: uid, liked: false });
    } else {
      await LikeModel.updateOne({ _id: data._id }, { $set: { liked: false } });
      data.liked = false;
      return data;
    }
  };

  /**
   * Deletes a Like of the User to a particular tuit on the Database.
   * @param uid Id of the User
   * @param tid ID of the Tuit
   * @returns Deletion status is returned.
   */
  userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
    LikeModel.deleteOne({ tuit: tid, likedBy: uid });

  /**
   * QUeries the DB to check a user Liked a tuit
   * @param uid Id of the User
   * @param tid ID of the Tuit
   * @returns record if exists else null
   */
  findUserLikesTuit = async (uid: any, tid: any): Promise<any> =>
    LikeModel.findOne({ tuit: tid, likedBy: uid });

  /**
   * Counts the clikes of a tuit.
   * @param tid ID of the Tuit
   * @returns Like count
   */
  countHowManyLikedTuit = async (tid: any): Promise<any> =>
    LikeModel.count({ tuit: tid, liked: true });

  /**
   * Counts the clikes of a tuit.
   * @param tid ID of the Tuit
   * @returns Like count
   */
  countHowManyLikedTuitToggle = async (tid: any): Promise<any> =>
    LikeModel.count({ tuit: tid });

  /**
   * Counts the dislikes of a tuit.
   * @param tid ID of the Tuit
   * @returns Like count
   */
  countHowManyDislikedTuit = async (tid: any): Promise<any> =>
    LikeModel.count({ tuit: tid, liked: false });
}
