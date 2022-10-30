import { Request, Response } from "express";

/**
 * @file Declares API for Follow related controller methods
 */
export default interface FollowsController {
  userFollowsOtherUser(req: Request, res: Response): Promise<void>;
  userUnfollowsOtherUser(req: Request, res: Response): Promise<void>;
  userViewsFollowerList(req: Request, res: Response): Promise<void>;
  userViewsFollowingList(req: Request, res: Response): Promise<void>;
  otherUsersFollowerList(req: Request, res: Response): Promise<void>;
  otherUsersFollowingList(req: Request, res: Response): Promise<void>;
}
