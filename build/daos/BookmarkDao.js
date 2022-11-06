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
const BookmarkModel_1 = __importDefault(require("../mongoose/Bookmark/BookmarkModel"));
/**
 * @class BookmarkDao Implements Data Access Object managing data storage
 * of Bookmark
 * @property {BookmarkDao} userDao Private single instance of BookmarkDao
 */
class BookmarkDao {
    constructor() { }
    /**
     * Creates a Bookmark record on the Database.
     * @param data bookmark data that is to be put on the Database.
     * @returns Promise To be notified when the record is created on
     * database
     */
    createBookmark(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield BookmarkModel_1.default.create(data);
            return res;
        });
    }
    /**
     * Deletes a Bookmark record on the Database.
     * @param data ID of the Bookmark record.
     * @returns Promise To be notified when the record is Deleted on
     * database
     */
    deleteBookmark(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield BookmarkModel_1.default.deleteOne({ _id: data });
            return res;
        });
    }
    /**
     * Extracts all the Bookmarks by a user on the Database.
     * @param data ID of the user whsose bookmark records must be extracted.
     * @returns Promise To be notified when the records are extracted from
     * database
     */
    usersBookmarks(data) {
        return __awaiter(this, void 0, void 0, function* () {
            const res = yield BookmarkModel_1.default.find({ bookmarkedBy: data });
            return res;
        });
    }
}
exports.default = BookmarkDao;
BookmarkDao.bookmarkDao = null;
/**
 * Creates singleton DAO instance
 * @returns BookmarkDao
 */
BookmarkDao.getInstance = () => {
    if (BookmarkDao.bookmarkDao == null) {
        BookmarkDao.bookmarkDao = new BookmarkDao();
    }
    return BookmarkDao.bookmarkDao;
};
