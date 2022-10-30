/**
 * @file  Implements Schema for the Follow collection.
 */
/**
 * @typedef  FollowSchema defines the way data is represented in Follow collection.
 *
 * @property {ObjectId} userFollowed Id of the user who wants to follow.
 * @property {ObjectId} userFollowing Id of the User who is being followed.
 */
import mongoose, { Schema } from "mongoose";
const FollowSchema = new mongoose.Schema(
  {
    userFollowed: { type: Schema.Types.ObjectId, ref: "UserModel" },
    userFollowing: { type: Schema.Types.ObjectId, ref: "UserModel" },
  },
  { collection: "follows" }
);
export default FollowSchema;
