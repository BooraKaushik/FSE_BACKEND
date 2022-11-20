import Like from "../../models/Like";

/**
 * @file Declares API for Likes related Data Access Objects methods
 */

export default interface LikeDao {
  findAllUsersThatLikedTuit(tid: string): Promise<Like[]>;
  findAllTuitsLikedByUser(uid: string): Promise<Like[]>;
  userUnlikesTuit(tid: string, uid: string): Promise<any>;
  userDislikesTuit(uid: string, tid: string): Promise<any>;
  userLikesTuit(tid: string, uid: string): Promise<Like>;
  findUserLikesTuit(uid: any, tid: any): Promise<any>;
  countHowManyDislikedTuit(tid: any): Promise<any>;
  countHowManyLikedTuit(tid: any): Promise<any>;
  countHowManyLikedTuitToggle(tid: any): Promise<any>;
  findAllTuitsDislikedByUser(uid: any): Promise<any>;
}
