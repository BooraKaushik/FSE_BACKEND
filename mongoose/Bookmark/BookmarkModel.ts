/**
 * @file Implements mongoose model to CRUD
 * documents in the Bookmarks collectionS
 */
import mongoose from "mongoose";
import BookmarkSchema from "./BookmarkSchema";
const BookmarkModel = mongoose.model("BookmarkModel", BookmarkSchema);
export default BookmarkModel;
