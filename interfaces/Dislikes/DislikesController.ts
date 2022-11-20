import { Request, Response } from "express";

/**
 * @file Declares API for DisLikes related controller methods
 */
export default interface DislikeControllerI {
  userDislikesTuit(req: Request, res: Response): void;
  userUndislikesTuit(req: Request, res: Response): void;
}
