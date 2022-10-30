/**
 * @file Implements DAO managing data storage of Messages. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import MessagesDaoI from "../interfaces/Messages/MessagesDao";
import Message from "../models/Message";
import MessageModel from "../mongoose/Message/MessageModel";

/**
 * @class MessagesDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessagesDao} userDao Private single instance of MessagesDao.
 */
export default class MessagesDao implements MessagesDaoI {
  private static messagesDao: MessagesDaoI | null = null;
  /**
   * Creates singleton DAO instance
   * @returns MessagesDao
   */
  public static getInstance = (): MessagesDao => {
    if (MessagesDao.messagesDao == null) {
      MessagesDao.messagesDao = new MessagesDao();
    }
    return MessagesDao.messagesDao;
  };
  private constructor() {}

  /**
   * Creates a Message record on the Database.
   * @param data Message object of the User.
   * @returns Promise To be notified when the Message is created on
   * database
   */
  async createMessage(data: Message): Promise<Message> {
    const resp = await MessageModel.create(data);
    return resp;
  }
  /**
   * Delete a Message record on the Database.
   * @param data ID of Message object of the User.
   * @returns Promise To be notified when the Message is deleted on
   * database
   */
  async deleteMessage(data: string): Promise<any> {
    const resp = await MessageModel.deleteOne({ _id: data });
    return resp;
  }
  /**
   * Inbox Message records on the Database are Extracted.
   * @param data ID of the User.
   * @returns Promise To be notified when the Messages are extracted from
   * database
   */
  async usersInbox(data: string): Promise<Message[]> {
    const resp = await MessageModel.find({ to: data });
    return resp;
  }
  /**
   * Outbox Message records on the Database are Extracted.
   * @param data ID of the User.
   * @returns Promise To be notified when the Messages are extracted from
   * database
   */
  async usersOutbox(data: string): Promise<Message[]> {
    const resp = await MessageModel.find({ from: data });
    return resp;
  }
}
