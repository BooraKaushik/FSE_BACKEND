/**
 * @file  Implements Schema for the dislikes collection.
 */
/**
 * @typedef  LikeSchema defines the way data is represented in likes collection.
 * @property {ObjectId} tuit Id of the Tuit Object.
 * @property {ObjectId} dislikedBy Id of the User who disliked the Tuit.
 */
import mongoose, { Schema } from "mongoose";
const DislikeSchema = new mongoose.Schema(
  {
    tuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
    dislikedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
  },
  { collection: "likes" }
);
export default DislikeSchema;
