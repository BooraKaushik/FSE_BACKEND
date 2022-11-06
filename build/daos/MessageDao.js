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
const MessageModel_1 = __importDefault(require("../mongoose/Message/MessageModel"));
/**
 * @class MessagesDao Implements Data Access Object managing data storage
 * of Messages
 * @property {MessagesDao} userDao Private single instance of MessagesDao.
 */
class MessagesDao {
    constructor() { }
    /**
     * Creates a Message record on the Database.
     * @param data Message object of the User.
     * @returns Promise To be notified when the Message is created on
     * database
     */
    createMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield MessageModel_1.default.create(data);
            return resp;
        });
    }
    /**
     * Delete a Message record on the Database.
     * @param data ID of Message object of the User.
     * @returns Promise To be notified when the Message is deleted on
     * database
     */
    deleteMessage(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield MessageModel_1.default.deleteOne({ _id: data });
            return resp;
        });
    }
    /**
     * Inbox Message records on the Database are Extracted.
     * @param data ID of the User.
     * @returns Promise To be notified when the Messages are extracted from
     * database
     */
    usersInbox(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield MessageModel_1.default.find({ to: data });
            return resp;
        });
    }
    /**
     * Outbox Message records on the Database are Extracted.
     * @param data ID of the User.
     * @returns Promise To be notified when the Messages are extracted from
     * database
     */
    usersOutbox(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield MessageModel_1.default.find({ from: data });
            return resp;
        });
    }
}
exports.default = MessagesDao;
MessagesDao.messagesDao = null;
/**
 * Creates singleton DAO instance
 * @returns MessagesDao
 */
MessagesDao.getInstance = () => {
    if (MessagesDao.messagesDao == null) {
        MessagesDao.messagesDao = new MessagesDao();
    }
    return MessagesDao.messagesDao;
};
