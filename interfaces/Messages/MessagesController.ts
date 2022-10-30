import { Request, Response } from "express";

/**
 * @file Declares API for Messages related controller methods
 */
export default interface MessagesController {
  sendMessage(req: Request, res: Response): Promise<void>;
  removeMessage(req: Request, res: Response): Promise<void>;
  getInbox(req: Request, res: Response): Promise<void>;
  getOutBox(req: Request, res: Response): Promise<void>;
}
