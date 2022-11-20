/**
 * @file Declares API for Dislikes related Data Access Objects methods
 */

import Dislike from "../../models/Dislike";

export default interface DislikeDao {
  userDislikesTuit(tid: string, uid: string): Promise<any>;
  userUndislikesTuit(tid: string, uid: string): Promise<Dislike>;
}
