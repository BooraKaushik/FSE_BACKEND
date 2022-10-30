/**
 * @file  Implements Schema for the messgaes collection.
 */
/**
 * @typedef  MessageSchema defines the way data is represented in messages collection.
 *
 * @property {String} message Message text that has to be sent.
 * @property {Date} sentOn Time stamp of the message.
 * @property {ObjectId} to Id of the user Object whome the message must be sent to.
 * @property {ObjectId} from Id of the User who is sending the message.
 */
import mongoose, { Schema } from "mongoose";
const MessageSchema = new mongoose.Schema(
  {
    message: { type: String, required: true },
    sentOn: { type: Date, required: true },
    to: { type: Schema.Types.ObjectId, ref: "UserModel" },
    from: { type: Schema.Types.ObjectId, ref: "UserModel" },
  },
  { collection: "messages" }
);
export default MessageSchema;
