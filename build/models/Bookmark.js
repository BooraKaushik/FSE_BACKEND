"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file This File Implements the model of Bookmark.
 */
/**
 * @typedef Bookmark is a model that represents bookmark entity.
 *
 * @property {String} bookmarkedTuit Id of the Tuit Object.
 * @property {String} bookmarkedBy Id of the User who Bookmarked the Tuit.
 */
class Bookmark {
    constructor(bookmarkedTuit, bookmarkedBy) {
        this.bookmarkedTuit = null;
        this.bookmarkedBy = null;
        this.bookmarkedBy = bookmarkedBy;
        this.bookmarkedTuit = bookmarkedTuit;
    }
}
exports.default = Bookmark;
