/**
 * @file This File Implements the model of Follow.
 */
/**
 * @typedef Follow is a model that represents Follow entity. 
 *
 * @property {ObjectId} userFollowed Id of the user who wants to follow.
 * @property {ObjectId} userFollowing Id of the User who is being followed.
 */
export default class Follow {
  private userFollowed: string | null = null;
  private userFollowing: string | null = null;
  constructor(userFollowed: string, userFollowing: string) {
    this.userFollowed = userFollowed;
    this.userFollowing = userFollowing;
  }
}
