/**
 * @file  Implements Schema for the bookmarks collection.
 */
/**
 * @typedef  BookmarkSchema defines the way data is represented in bookmarks collection.
 * @property {ObjectId} bookmarkedTuit Id of the Tuit Object.
 * @property {ObjectId} bookmarkedBy Id of the User who Bookmarked the Tuit.
 */
import mongoose, { Schema } from "mongoose";
const BookmarkSchema = new mongoose.Schema(
  {
    bookmarkedTuit: { type: Schema.Types.ObjectId, ref: "TuitModel" },
    bookmarkedBy: { type: Schema.Types.ObjectId, ref: "UserModel" },
  },
  { collection: "bookmarks" }
);
export default BookmarkSchema;
