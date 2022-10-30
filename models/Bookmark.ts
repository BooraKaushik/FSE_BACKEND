/**
 * @file This File Implements the model of Bookmark.
 */
/**
 * @typedef Bookmark is a model that represents bookmark entity.
 * 
 * @property {String} bookmarkedTuit Id of the Tuit Object.
 * @property {String} bookmarkedBy Id of the User who Bookmarked the Tuit.
 */
export default class Bookmark {
  private bookmarkedTuit: string | null = null;
  private bookmarkedBy: string | null = null;
  constructor(bookmarkedTuit: string, bookmarkedBy: string) {
    this.bookmarkedBy = bookmarkedBy;
    this.bookmarkedTuit = bookmarkedTuit;
  }
}
