/**
 * @file Implements DAO managing data storage of Follow. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import Follow from "../models/Follow";
import FollowsDaoI from "../interfaces/Follows/FollowsDao";
import User from "../models/User";
import FollowModel from "../mongoose/Follow/FollowModel";
/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follow
 * @property {FollowDao} userDao Private single instance of FollowDao
 */
export default class FollowDao implements FollowsDaoI {
  private static followDao: FollowsDaoI | null = null;
  /**
   * Creates singleton DAO instance
   * @returns FollowDao
   */
  public static getInstance = (): FollowDao => {
    if (FollowDao.followDao === null) {
      FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
  };
  private constructor() {}
  /**
   * Creates a Follow record on the Database.
   * @param data Follow object containing UserFollowing and UserFollowed.
   * @returns Promise To be notified when the Follow is created on
   * database
   */
  async createFollow(data: Follow): Promise<Follow> {
    const response = await FollowModel.create(data);
    return response;
  }
  /**
   * Delets a Follow record on the Database.
   * @param data ID of the follow record.
   * @returns Promise To be notified when the Follow is deleted on
   * database
   */
  async deleteFollow(data: string): Promise<any> {
    const response = await FollowModel.deleteOne({ _id: data });
    return response;
  }
  /**
   * Extracts a List of Followers of a particular User.
   * @param userId ID of the User whose followers must be extracted.
   * @returns Promise To be notified when the data is extracted on
   * database
   */
  async followerList(userId: string): Promise<User[]> {
    const response = await FollowModel.find({ userFollowed: userId })
      .populate("userFollowing")
      .exec();
    return response;
  }
  /**
   * Extracts a List of Following Users of a particular User.
   * @param userId ID of the User whose following list must be extracted.
   * @returns Promise To be notified when the data is extracted on
   * database
   */
  async followingList(userId: string): Promise<User[]> {
    const response = await FollowModel.find({ userFollowing: userId })
      .populate("userFollowed")
      .exec();
    return response;
  }
}
