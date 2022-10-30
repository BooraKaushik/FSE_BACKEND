/**
 * @file Controller RESTful Web service API for Bookmark resource
 */
import { Express, Request, Response } from "express";
import BookmarkDao from "../daos/BookmarkDao";
import BookmarksControllerI from "../interfaces/Bookmarks/BookmarksController";
import Bookmark from "../models/Bookmark";

/**
 * @class BookmarkController Implements RESTful Web service API for Bookmark resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:userId/bookmarks to retrieve all the Bookmarks of a user
 *     </li>
 *     <li>GET /api/otherusers/:userId/bookmarks to retrieve all the Bookmarks of another user
 *     </li>
 *     <li>POST /api/users/:uid/bookmarks/:tid to record that a user bookmarked a tuit
 *     </li>
 *     <li>DELETE /api/unbookmarks/:bookmarkId to record that a user
 *     no londer bookmarked a tuit</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing likes CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
export default class BookmarkController implements BookmarksControllerI {
  private static bookmarkDao: BookmarkDao = BookmarkDao.getInstance();
  private static bookmarkController: BookmarkController | null = null;
  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return BookmarkController
   */
  public static getInstance = (app: Express): BookmarkController => {
    if (BookmarkController.bookmarkController === null) {
      BookmarkController.bookmarkController = new BookmarkController();
      app.post(
        "/api/users/:uid/bookmarks/:tid",
        BookmarkController.bookmarkController.bookmarkTuit
      );
      app.delete(
        "/api/unbookmarks/:bookmarkId",
        BookmarkController.bookmarkController.unbookmarkTuit
      );
      app.get(
        "/api/users/:userId/bookmarks",
        BookmarkController.bookmarkController.bookmarkedTuitList
      );
      app.get(
        "/api/otherusers/:userId/bookmarks",
        BookmarkController.bookmarkController.otherUsersBookmarkedTuitLists
      );
    }
    return BookmarkController.bookmarkController;
  };

  private constructor() {}
  /**
   * Creates a Bookmark record on database
   * @param {Request} req Represents request from client, including the path
   * parameter both tuit id and users id.
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the bookmark objects.
   */
  async bookmarkTuit(req: Request, res: Response): Promise<void> {
    const data = new Bookmark(req.params.tid, req.params.uid);
    const resp = await BookmarkController.bookmarkDao.createBookmark(data);
    res.send(resp);
  }

  /**
   * Deletes a bookmark record on database
   * @param {Request} req Represents request from client, including the path
   * parameter bookmark ID.
   * @param {Response} res Represents response to client, including the
   * status JSON object.
   */
  async unbookmarkTuit(req: Request, res: Response): Promise<void> {
    const resp = await BookmarkController.bookmarkDao.deleteBookmark(
      req.params.bookmarkId
    );
    res.send(resp);
  }

  /**
   * Returns a Bookmarks list of a user.
   * @param {Request} req Represents request from client, including the path
   * parameter and users id.
   * @param {Response} res Represents response to client, including the
   * status JSON Array with bookmarks list.
   */
  async bookmarkedTuitList(req: Request, res: Response): Promise<void> {
    const resp = await BookmarkController.bookmarkDao.usersBookmarks(
      req.params.userId
    );
    res.send(resp);
  }

  /**
   * Returns a Bookmarks list of another user.
   * @param {Request} req Represents request from client, including the path
   * parameter and another users id.
   * @param {Response} res Represents response to client, including the
   * status JSON Array with Bookmarks list.
   */
  async otherUsersBookmarkedTuitLists(
    req: Request,
    res: Response
  ): Promise<void> {
    const resp = await BookmarkController.bookmarkDao.usersBookmarks(
      req.params.userId
    );
    res.send(resp);
  }
}
