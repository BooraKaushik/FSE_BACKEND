"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file This File Implements the model of Messages.
 */
/**
 * @typedef Message is a model that represents Message entity.
 *
 * @property {String} message Message text that has to be sent.
 * @property {Date} sentOn Time stamp of the message.
 * @property {String} to Id of the user Object whome the message must be sent to.
 * @property {String} from Id of the User who is sending the message.
 */
class Message {
    constructor(from, to, message) {
        this.message = "";
        this.sentOn = new Date();
        this.to = null;
        this.from = null;
        this.message = message;
        this.to = to;
        this.from = from;
    }
}
exports.default = Message;
