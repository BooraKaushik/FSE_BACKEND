/**
 * @file This File Implements the model of Messages.
 */
/**
 * @typedef Message is a model that represents Message entity.
 *
 * @property {String} message Message text that has to be sent.
 * @property {Date} sentOn Time stamp of the message.
 * @property {String} to Id of the user Object whome the message must be sent to.
 * @property {String} from Id of the User who is sending the message.
 */
export default class Message {
  private message: string = "";
  private sentOn: Date = new Date();
  private to: String | null = null;
  private from: String | null = null;
  public constructor(from: string, to: string, message: string) {
    this.message = message;
    this.to = to;
    this.from = from;
  }
}
