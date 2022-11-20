/**
 * @file  Implements Schema for the likes collection.
 */
/**
 * @typedef  LikeSchema defines the way data is represented in likes collection.
 * @property {ObjectId} tuit Id of the Tuit Object.
 * @property {ObjectId} likedBy Id of the User who liked the Tuit.
 */
import mongoose, { Schema } from "mongoose";
const LikeSchema = new mongoose.Schema(
  {
    tuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
    likedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
    liked: { type: Boolean },
  },
  { collection: "likes" }
);
export default LikeSchema;
