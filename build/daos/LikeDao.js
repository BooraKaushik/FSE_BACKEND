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
const LikeModel_1 = __importDefault(require("../mongoose/Like/LikeModel"));
/**
 * @class LikeDao Implements Data Access Object managing data storage
 * of Likes
 * @property {LikeDao} userDao Private single instance of LikeDao.
 */
class LikeDao {
    constructor() {
        /**
         * Extracts all the Users that liked a particular Tuit.
         * @param tid Id of the Tuit
         * @returns a list of Likes with the User Information Populated.
         */
        this.findAllUsersThatLikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.find({ tuit: tid, liked: true }).populate("likedBy").exec(); });
        /**
         * Extracts all the tuits liked by a particular User.
         * @param uid Id of the User
         * @returns a list of Tuit with the User Information Populated
         */
        this.findAllTuitsLikedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default.find({ likedBy: uid, liked: true })
                .populate({
                path: "tuit",
                populate: {
                    path: "postedBy",
                },
            })
                .exec();
        });
        /**
         * Extracts all the tuits disliked by a particular User.
         * @param uid Id of the User
         * @returns a list of Tuit with the User Information Populated
         */
        this.findAllTuitsDislikedByUser = (uid) => __awaiter(this, void 0, void 0, function* () {
            return LikeModel_1.default.find({ likedBy: uid, liked: false })
                .populate({
                path: "tuit",
                populate: {
                    path: "postedBy",
                },
            })
                .exec();
        });
        /**
         * Creates a Like of the User to a particular tuit on the Database.
         * @param uid Id of the User
         * @param tid ID of the Tuit
         * @returns a like object that is created on Database.
         */
        this.userLikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () {
            const data = yield LikeModel_1.default.findOne({ tuit: tid, likedBy: uid });
            if (data === null) {
                return yield LikeModel_1.default.create({ tuit: tid, likedBy: uid, liked: true });
            }
            else {
                yield LikeModel_1.default.updateOne({ _id: data._id }, { $set: { liked: true } });
                data.liked = true;
                return data;
            }
        });
        /**
         * Creates a Dislike of the User to a particular tuit on the Database.
         * @param uid Id of the User
         * @param tid ID of the Tuit
         * @returns a like object that is created on Database.
         */
        this.userDislikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () {
            const data = yield LikeModel_1.default.findOne({ tuit: tid, likedBy: uid });
            if (data === null) {
                return yield LikeModel_1.default.create({ tuit: tid, likedBy: uid, liked: false });
            }
            else {
                yield LikeModel_1.default.updateOne({ _id: data._id }, { $set: { liked: false } });
                data.liked = false;
                return data;
            }
        });
        /**
         * Deletes a Like of the User to a particular tuit on the Database.
         * @param uid Id of the User
         * @param tid ID of the Tuit
         * @returns Deletion status is returned.
         */
        this.userUnlikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.deleteOne({ tuit: tid, likedBy: uid }); });
        /**
         * QUeries the DB to check a user Liked a tuit
         * @param uid Id of the User
         * @param tid ID of the Tuit
         * @returns record if exists else null
         */
        this.findUserLikesTuit = (uid, tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.findOne({ tuit: tid, likedBy: uid }); });
        /**
         * Counts the clikes of a tuit.
         * @param tid ID of the Tuit
         * @returns Like count
         */
        this.countHowManyLikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.count({ tuit: tid, liked: true }); });
        /**
         * Counts the clikes of a tuit.
         * @param tid ID of the Tuit
         * @returns Like count
         */
        this.countHowManyLikedTuitToggle = (tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.count({ tuit: tid }); });
        /**
         * Counts the dislikes of a tuit.
         * @param tid ID of the Tuit
         * @returns Like count
         */
        this.countHowManyDislikedTuit = (tid) => __awaiter(this, void 0, void 0, function* () { return LikeModel_1.default.count({ tuit: tid, liked: false }); });
    }
}
exports.default = LikeDao;
LikeDao.likeDao = null;
/**
 * Creates singleton DAO instance
 * @returns LikeDao
 */
LikeDao.getInstance = () => {
    if (LikeDao.likeDao === null) {
        LikeDao.likeDao = new LikeDao();
    }
    return LikeDao.likeDao;
};
