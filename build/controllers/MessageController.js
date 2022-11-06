"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const MessageDao_1 = __importDefault(require("../daos/MessageDao"));
const Message_1 = __importDefault(require("../models/Message"));
/**
 * @class MessageController Implements RESTful Web service API for Message resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:userId/inbox to retrieve all the incomming messages to a user
 *     </li>
 *     <li>GET /api/users/:userId/outbox to retrieve all the outgoing messages of a user
 *     </li>
 *     <li>POST /api/users/:userId/messages/:recepientId to record that a user message to another user
 *     </li>
 *     <li>DELETE /api/users/:uid/deletemessages/:messageid to record that a user
 *     removed a message</li>
 * </ul>
 * @property {MessageDao} messageDao Singleton DAO implementing messages CRUD operations
 * @property {MessageController} messageController Singleton controller implementing
 * RESTful Web service API
 */
class MessageController {
    constructor() {
        /**
         * Creates a message record on the Database.
         * @param {Request} req Represents request from client, including the path
         * parameter userids of sender and receiver and message in the body.
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the Message objects
         */
        this.sendMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = new Message_1.default(req.params.userId, req.params.recepientId, req.body.message);
            const resp = yield MessageController.messageDao.createMessage(data);
            res.send(resp);
        });
        /**
         * Deletes a message record on the Database.
         * @param {Request} req Represents request from client, including the path
         * parameter containing id of a Message record.
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the status.
         */
        this.removeMessage = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const resp = yield MessageController.messageDao.deleteMessage(req.params.messageid);
            res.send(resp);
        });
        /**
         * Retrieves all the incomming messages of a user.
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the list of inbox messages.
         */
        this.getInbox = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const resp = yield MessageController.messageDao.usersInbox(req.params.userId);
            res.send(resp);
        });
        /**
         * Retrieves all the outgoing messages of a user.
         * @param {Request} req Represents request from client, including the path
         * parameter uid representing the user
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the list of outbox messages.
         */
        this.getOutBox = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const resp = yield MessageController.messageDao.usersOutbox(req.params.userId);
            res.send(resp);
        });
    }
}
exports.default = MessageController;
MessageController.messageDao = MessageDao_1.default.getInstance();
MessageController.messageController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return MessageController
 */
MessageController.getInstance = (app) => {
    if (MessageController.messageController === null) {
        MessageController.messageController = new MessageController();
        app.post("/api/users/:userId/messages/:recepientId", MessageController.messageController.sendMessage);
        app.get("/api/users/:userId/inbox", MessageController.messageController.getInbox);
        app.get("/api/users/:userId/outbox", MessageController.messageController.getOutBox);
        app.delete("/api/users/:uid/deletemessages/:messageid", MessageController.messageController.removeMessage);
    }
    return MessageController.messageController;
};
