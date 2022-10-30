import Follow from "../../models/Follow";
import User from "../../models/User";

/**
 * @file Declares API for Follows related Data Access Objects methods
 */
export default interface FollowsDao {
  createFollow(data: Follow): Promise<Follow>;
  deleteFollow(data: string): Promise<any>;
  followerList(userId: string): Promise<User[]>;
  followingList(userId: string): Promise<User[]>;
}
