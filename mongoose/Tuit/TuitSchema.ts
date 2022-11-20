/**
 * @file  Implements Schema for the Tuits collection.
 */
/**
 * @typedef  TuitSchema defines the way data is represented in Tuits collection.
 * @property {String} tuit Text of the Tuit.
 * @property {Date} postedOn Date on which the Tuit is posted.
 * @property {ObjectId} postedBy Id of the User who posted the Tuit.
 */
import mongoose from "mongoose";

const TuitSchema = new mongoose.Schema(
  {
    tuit: { type: String, required: true },
    postedOn: { type: Date, required: true },
    postedBy: { type: mongoose.Schema.Types.ObjectId, ref: "UserModel" },
    stats: {
      replies: { type: Number, default: 0 },
      retuits: { type: Number, default: 0 },
      likes: { type: Number, default: 0 },
    },
  },
  { collection: "Tuits" }
);
export default TuitSchema;
