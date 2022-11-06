"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file This File Implements the model of Follow.
 */
/**
 * @typedef Follow is a model that represents Follow entity.
 *
 * @property {ObjectId} userFollowed Id of the user who wants to follow.
 * @property {ObjectId} userFollowing Id of the User who is being followed.
 */
class Follow {
    constructor(userFollowed, userFollowing) {
        this.userFollowed = null;
        this.userFollowing = null;
        this.userFollowed = userFollowed;
        this.userFollowing = userFollowing;
    }
}
exports.default = Follow;
