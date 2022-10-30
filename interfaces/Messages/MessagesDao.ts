import Message from "../../models/Message";

/**
 * @file Declares API for Messages related Data Access Objects methods
 */

export default interface MessagesDao {
  createMessage(data: Message): Promise<Message>;
  deleteMessage(data: string): Promise<any>;
  usersInbox(data: string): Promise<Message[]>;
  usersOutbox(data: string): Promise<Message[]>;
}
