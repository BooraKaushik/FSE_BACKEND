"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file  Implements Schema for the Tuits collection.
 */
/**
 * @typedef  TuitSchema defines the way data is represented in Tuits collection.
 * @property {String} tuit Text of the Tuit.
 * @property {Date} postedOn Date on which the Tuit is posted.
 * @property {ObjectId} postedBy Id of the User who posted the Tuit.
 */
const mongoose_1 = __importDefault(require("mongoose"));
const TuitSchema = new mongoose_1.default.Schema({
    tuit: { type: String, required: true },
    postedOn: { type: Date, required: true },
    postedBy: { type: mongoose_1.default.Schema.Types.ObjectId, ref: "UserModel" },
    stats: {
        replies: { type: Number, default: 0 },
        retuits: { type: Number, default: 0 },
        likes: { type: Number, default: 0 },
    },
}, { collection: "Tuits" });
exports.default = TuitSchema;
