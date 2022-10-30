/**
 * @file Implements DAO managing data storage of Bookmarks. Uses mongoose BookmarkModel
 * to integrate with MongoDB
 */
import BookmarksDaoI from "../interfaces/Bookmarks/BookmarksDao";
import Bookmark from "../models/Bookmark";
import BookmarkModel from "../mongoose/Bookmark/BookmarkModel";
/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmark
 * @property {BookmarkDao} userDao Private single instance of BookmarkDao
 */
export default class BookmarkDao implements BookmarksDaoI {
  private static bookmarkDao: BookmarksDaoI | null = null;
  /**
   * Creates singleton DAO instance
   * @returns BookmarkDao
   */
  public static getInstance = (): BookmarkDao => {
    if (BookmarkDao.bookmarkDao == null) {
      BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
  };
  private constructor() {}

  /**
   * Creates a Bookmark record on the Database.
   * @param data bookmark data that is to be put on the Database.
   * @returns Promise To be notified when the record is created on
   * database
   */
  async createBookmark(data: Bookmark): Promise<Bookmark> {
    const res = await BookmarkModel.create(data);
    return res;
  }
  /**
   * Deletes a Bookmark record on the Database.
   * @param data ID of the Bookmark record.
   * @returns Promise To be notified when the record is Deleted on
   * database
   */
  async deleteBookmark(data: string): Promise<any> {
    const res = await BookmarkModel.deleteOne({ _id: data });
    return res;
  }
  /**
   * Extracts all the Bookmarks by a user on the Database.
   * @param data ID of the user whsose bookmark records must be extracted.
   * @returns Promise To be notified when the records are extracted from
   * database
   */
  async usersBookmarks(data: string): Promise<Bookmark[]> {
    const res = await BookmarkModel.find({ bookmarkedBy: data });
    return res;
  }
}
