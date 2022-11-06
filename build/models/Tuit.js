"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file This File Implements the model of Tuit.
 */
/**
 * @typedef Tuit is a model that represents Tuit entity.
 *
 * @property {String} tuit Text of the Tuit.
 * @property {Date} postedOn Date on which the Tuit is posted.
 * @property {String} postedBy Id of the User who posted the Tuit.
 */
class Tuit {
    constructor() {
        this.tuit = "";
        this.postedOn = new Date();
        this.postedBy = null;
    }
}
exports.default = Tuit;
