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
    LikeModel.find({ tuit: tid }).populate("likedBy").exec();

  /**
   * Extracts all the tuits liked by a particular User.
   * @param uid Id of the User
   * @returns a list of Tuit with the User Information Populated
   */
  findAllTuitsLikedByUser = async (uid: string): Promise<Like[]> =>
    LikeModel.find({ likedBy: uid }).populate("tuit").exec();

  /**
   * Creates a Like of the User to a particular tuit on the Database.
   * @param uid Id of the User
   * @param tid ID of the Tuit
   * @returns a like object that is created on Database.
   */
  userLikesTuit = async (uid: string, tid: string): Promise<any> =>
    LikeModel.create({ tuit: tid, likedBy: uid });

  /**
   * Deletes a Like of the User to a particular tuit on the Database.
   * @param uid Id of the User
   * @param tid ID of the Tuit
   * @returns Deletion status is returned.
   */
  userUnlikesTuit = async (uid: string, tid: string): Promise<any> =>
    LikeModel.deleteOne({ tuit: tid, likedBy: uid });
}
