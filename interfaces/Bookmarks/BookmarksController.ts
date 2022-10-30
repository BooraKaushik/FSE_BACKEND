import { Request, Response } from "express";

/**
 * @file Declares API for Bookmarks related controller methods
 */
export default interface BookmarksController {
  bookmarkTuit(req: Request, res: Response): Promise<void>;
  unbookmarkTuit(req: Request, res: Response): Promise<void>;
  bookmarkedTuitList(req: Request, res: Response): Promise<void>;
  otherUsersBookmarkedTuitLists(req: Request, res: Response): Promise<void>;
}
