import Bookmark from "../../models/Bookmark";

/**
 * @file Declares API for Bookmarks related Data Access Objects methods
 */

export default interface BookmarksDao {
  createBookmark(data: Bookmark): Promise<Bookmark>;
  deleteBookmark(data: string): Promise<any>;
  usersBookmarks(data: string): Promise<Bookmark[]>;
}
