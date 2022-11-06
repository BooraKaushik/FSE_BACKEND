"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file  Implements Schema for the messgaes collection.
 */
/**
 * @typedef  MessageSchema defines the way data is represented in messages collection.
 *
 * @property {String} message Message text that has to be sent.
 * @property {Date} sentOn Time stamp of the message.
 * @property {ObjectId} to Id of the user Object whome the message must be sent to.
 * @property {ObjectId} from Id of the User who is sending the message.
 */
const mongoose_1 = __importStar(require("mongoose"));
const MessageSchema = new mongoose_1.default.Schema({
    message: { type: String, required: true },
    sentOn: { type: Date, required: true },
    to: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserModel" },
    from: { type: mongoose_1.Schema.Types.ObjectId, ref: "UserModel" },
}, { collection: "messages" });
exports.default = MessageSchema;
