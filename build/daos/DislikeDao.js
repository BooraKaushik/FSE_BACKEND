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
const DislikeModel_1 = __importDefault(require("../mongoose/Dislike/DislikeModel"));
/**
 * @class DislikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {DislikeDao} userDao Private single instance of DislikeDao.
 */
class DislikeDao {
    constructor() {
        /**
         * Creates a Like of the User to a particular tuit on the Database.
         * @param uid Id of the User
         * @param tid ID of the Tuit
         * @returns a like object that is created on Database.
         */
        this.userDislikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return DislikeModel_1.default.create({ tuit: tid, dislikedBy: uid }); });
        /**
         * Deletes a Like of the User to a particular tuit on the Database.
         * @param uid Id of the User
         * @param tid ID of the Tuit
         * @returns Deletion status is returned.
         */
        this.userUndislikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return DislikeModel_1.default.deleteOne({ tuit: tid, likedBy: uid }); });
    }
}
exports.default = DislikeDao;
DislikeDao.dislikeDao = null;
/**
 * Creates singleton DAO instance
 * @returns DisLikeDao
 */
DislikeDao.getInstance = () => {
    if (DislikeDao.dislikeDao === null) {
        DislikeDao.dislikeDao = new DislikeDao();
    }
    return DislikeDao.dislikeDao;
};
