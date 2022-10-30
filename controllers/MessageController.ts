/**
 * @file Controller RESTful Web service API for Messages resource
 */
import { Express, Request, Response } from "express";
import MessagesDao from "../daos/MessageDao";
import MessagesController from "../interfaces/Messages/MessagesController";
import MessagesDaoI from "../interfaces/Messages/MessagesDao";
import Message from "../models/Message";

/**
 * @class MessageController Implements RESTful Web service API for Message resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:userId/inbox to retrieve all the incomming messages to a user
 *     </li>
 *     <li>GET /api/users/:userId/outbox to retrieve all the outgoing messages of a user
 *     </li>
 *     <li>POST /api/users/:userId/messages/:recepientId to record that a user message to another user
 *     </li>
 *     <li>DELETE /api/users/:uid/deletemessages/:messageid to record that a user
 *     removed a message</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
export default class MessageController implements MessagesController {
  private static messageDao: MessagesDaoI = MessagesDao.getInstance();
  private static messageController: MessageController | null = null;
  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return MessageController
   */
  public static getInstance = (app: Express): MessageController => {
    if (MessageController.messageController === null) {
      MessageController.messageController = new MessageController();
      app.post(
        "/api/users/:userId/messages/:recepientId",
        MessageController.messageController.sendMessage
      );
      app.get(
        "/api/users/:userId/inbox",
        MessageController.messageController.getInbox
      );
      app.get(
        "/api/users/:userId/outbox",
        MessageController.messageController.getOutBox
      );
      app.delete(
        "/api/users/:uid/deletemessages/:messageid",
        MessageController.messageController.removeMessage
      );
    }
    return MessageController.messageController;
  };

  private constructor() {}

  /**
   * Creates a message record on the Database.
   * @param {Request} req Represents request from client, including the path
   * parameter userids of sender and receiver and message in the body.
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the Message objects
   */
  sendMessage = async (req: Request, res: Response): Promise<void> => {
    const data = new Message(
      req.params.userId,
      req.params.recepientId,
      req.body.message
    );
    const resp = await MessageController.messageDao.createMessage(data);
    res.send(resp);
  };

  /**
   * Deletes a message record on the Database.
   * @param {Request} req Represents request from client, including the path
   * parameter containing id of a Message record.
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the status.
   */
  removeMessage = async (req: Request, res: Response): Promise<void> => {
    const resp = await MessageController.messageDao.deleteMessage(
      req.params.messageid
    );
    res.send(resp);
  };

  /**
   * Retrieves all the incomming messages of a user.
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the list of inbox messages.
   */
  getInbox = async (req: Request, res: Response): Promise<void> => {
    const resp = await MessageController.messageDao.usersInbox(
      req.params.userId
    );
    res.send(resp);
  };

  /**
   * Retrieves all the outgoing messages of a user.
   * @param {Request} req Represents request from client, including the path
   * parameter uid representing the user
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the list of outbox messages.
   */
  getOutBox = async (req: Request, res: Response): Promise<void> => {
    const resp = await MessageController.messageDao.usersOutbox(
      req.params.userId
    );
    res.send(resp);
  };
}
