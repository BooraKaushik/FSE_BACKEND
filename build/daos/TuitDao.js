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
/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
const TuitModel_1 = __importDefault(require("../mongoose/Tuit/TuitModel"));
/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} userDao Private single instance of TuitDao
 */
class TuitDao {
    constructor() {
        /**
         * Uses TuitModel to retrieve all tuits documents from tuit collection
         * @returns Promise To be notified when the tuits are retrieved from
         * database
         */
        this.findAllTuits = () => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.find().populate("postedBy").exec(); });
        /**
         * Uses TuitModel to retrieve tuit documents from tuit collection using user id.
         * @param uid id of the user whose tuits are to be extracted.
         * @returns Promise To be notified when the tuit is retrieved from
         * database
         */
        this.findAllTuitsByUser = (uid) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.find({ postedBy: uid }).populate("postedBy").exec(); });
        /**
         * Uses TuitModel to retrieve all documents from tuit collection using tuit id.
         * @param uid id of the tuits to be extracted.
         * @returns Promise To be notified when the tuits are retrieved from
         * database
         */
        this.findTuitById = (uid) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.findById(uid).populate("postedBy").exec(); });
        /**
         * Creates a Tuit record on the Database.
         * @param uid id of the user whose tuits are to be extracted.
         * @param tuit Tuit object that is to be created.
         * @returns Promise To be notified when the tuit is created on
         * database
         */
        this.createTuitByUser = (uid, tuit) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.create(Object.assign(Object.assign({}, tuit), { postedBy: uid })); });
        /**
         * Updates a Tuit record on the Database.
         * @param uid id of the user whose tuits are to be extracted.
         * @param tuit Tuit object that is to be updated.
         * @returns Promise To be notified when the tuit is updated on
         * database
         */
        this.updateTuit = (uid, tuit) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.updateOne({ _id: uid }, { $set: tuit }); });
        /**
         * Delets a Tuit record on the Database.
         * @param uid id of the user whose tuits are to be extracted.
         * @returns Promise To be notified when the tuit is deleted on
         * database
         */
        this.deleteTuit = (uid) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.deleteOne({ _id: uid }); });
        this.updateLikes = (tid, newStats) => __awaiter(this, void 0, void 0, function* () { return TuitModel_1.default.updateOne({ _id: tid }, { $set: { stats: newStats } }); });
    }
}
exports.default = TuitDao;
TuitDao.tuitDao = null;
/**
 * Creates singleton DAO instance
 * @returns TuitDao
 */
TuitDao.getInstance = () => {
    if (TuitDao.tuitDao === null) {
        TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
};
