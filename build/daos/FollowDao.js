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
const FollowModel_1 = __importDefault(require("../mongoose/Follow/FollowModel"));
/**
 * @class FollowDao Implements Data Access Object managing data storage
 * of Follow
 * @property {FollowDao} userDao Private single instance of FollowDao
 */
class FollowDao {
    constructor() { }
    /**
     * Creates a Follow record on the Database.
     * @param data Follow object containing UserFollowing and UserFollowed.
     * @returns Promise To be notified when the Follow is created on
     * database
     */
    createFollow(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield FollowModel_1.default.create(data);
            return response;
        });
    }
    /**
     * Delets a Follow record on the Database.
     * @param data ID of the follow record.
     * @returns Promise To be notified when the Follow is deleted on
     * database
     */
    deleteFollow(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield FollowModel_1.default.deleteOne({ _id: data });
            return response;
        });
    }
    /**
     * Extracts a List of Followers of a particular User.
     * @param userId ID of the User whose followers must be extracted.
     * @returns Promise To be notified when the data is extracted on
     * database
     */
    followerList(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield FollowModel_1.default.find({ userFollowed: userId })
                .populate("userFollowing")
                .exec();
            return response;
        });
    }
    /**
     * Extracts a List of Following Users of a particular User.
     * @param userId ID of the User whose following list must be extracted.
     * @returns Promise To be notified when the data is extracted on
     * database
     */
    followingList(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield FollowModel_1.default.find({ userFollowing: userId })
                .populate("userFollowed")
                .exec();
            return response;
        });
    }
}
exports.default = FollowDao;
FollowDao.followDao = null;
/**
 * Creates singleton DAO instance
 * @returns FollowDao
 */
FollowDao.getInstance = () => {
    if (FollowDao.followDao === null) {
        FollowDao.followDao = new FollowDao();
    }
    return FollowDao.followDao;
};
