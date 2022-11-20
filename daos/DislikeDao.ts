/**
 * @file Implements DAO managing data storage of DisLikes. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import DislikeDaoI from "../interfaces/Dislikes/DislikesDao";
import DislikeModel from "../mongoose/Dislike/DislikeModel";
/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {DislikeDao} userDao Private single instance of DislikeDao.
 */
export default class DislikeDao implements DislikeDaoI {
  private static dislikeDao: DislikeDao | null = null;
  /**
   * Creates singleton DAO instance
   * @returns DisLikeDao
   */
  public static getInstance = (): DislikeDao => {
    if (DislikeDao.dislikeDao === null) {
      DislikeDao.dislikeDao = new DislikeDao();
    }
    return DislikeDao.dislikeDao;
  };
  private constructor() {}
  /**
   * Creates a Like of the User to a particular tuit on the Database.
   * @param uid Id of the User
   * @param tid ID of the Tuit
   * @returns a like object that is created on Database.
   */
  userDislikesTuit = async (uid: string, tid: string): Promise<any> =>
    DislikeModel.create({ tuit: tid, dislikedBy: uid });

  /**
   * Deletes a Like of the User to a particular tuit on the Database.
   * @param uid Id of the User
   * @param tid ID of the Tuit
   * @returns Deletion status is returned.
   */
  userUndislikesTuit = async (uid: string, tid: string): Promise<any> =>
    DislikeModel.deleteOne({ tuit: tid, likedBy: uid });
}
