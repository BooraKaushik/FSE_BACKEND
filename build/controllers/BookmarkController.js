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
const BookmarkDao_1 = __importDefault(require("../daos/BookmarkDao"));
const Bookmark_1 = __importDefault(require("../models/Bookmark"));
/**
 * @class BookmarkController Implements RESTful Web service API for Bookmark resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:userId/bookmarks to retrieve all the Bookmarks of a user
 *     </li>
 *     <li>GET /api/otherusers/:userId/bookmarks to retrieve all the Bookmarks of another user
 *     </li>
 *     <li>POST /api/users/:uid/bookmarks/:tid to record that a user bookmarked a tuit
 *     </li>
 *     <li>DELETE /api/unbookmarks/:bookmarkId to record that a user
 *     no londer bookmarked a tuit</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing likes CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
class BookmarkController {
    constructor() { }
    /**
     * Creates a Bookmark record on database
     * @param {Request} req Represents request from client, including the path
     * parameter both tuit id and users id.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the bookmark objects.
     */
    bookmarkTuit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new Bookmark_1.default(req.params.tid, req.params.uid);
            const resp = yield BookmarkController.bookmarkDao.createBookmark(data);
            res.send(resp);
        });
    }
    /**
     * Deletes a bookmark record on database
     * @param {Request} req Represents request from client, including the path
     * parameter bookmark ID.
     * @param {Response} res Represents response to client, including the
     * status JSON object.
     */
    unbookmarkTuit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield BookmarkController.bookmarkDao.deleteBookmark(req.params.bookmarkId);
            res.send(resp);
        });
    }
    /**
     * Returns a Bookmarks list of a user.
     * @param {Request} req Represents request from client, including the path
     * parameter and users id.
     * @param {Response} res Represents response to client, including the
     * status JSON Array with bookmarks list.
     */
    bookmarkedTuitList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield BookmarkController.bookmarkDao.usersBookmarks(req.params.userId);
            res.send(resp);
        });
    }
    /**
     * Returns a Bookmarks list of another user.
     * @param {Request} req Represents request from client, including the path
     * parameter and another users id.
     * @param {Response} res Represents response to client, including the
     * status JSON Array with Bookmarks list.
     */
    otherUsersBookmarkedTuitLists(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield BookmarkController.bookmarkDao.usersBookmarks(req.params.userId);
            res.send(resp);
        });
    }
}
exports.default = BookmarkController;
BookmarkController.bookmarkDao = BookmarkDao_1.default.getInstance();
BookmarkController.bookmarkController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return BookmarkController
 */
BookmarkController.getInstance = (app) => {
    if (BookmarkController.bookmarkController === null) {
        BookmarkController.bookmarkController = new BookmarkController();
        app.post("/api/users/:uid/bookmarks/:tid", BookmarkController.bookmarkController.bookmarkTuit);
        app.delete("/api/unbookmarks/:bookmarkId", BookmarkController.bookmarkController.unbookmarkTuit);
        app.get("/api/users/:userId/bookmarks", BookmarkController.bookmarkController.bookmarkedTuitList);
        app.get("/api/otherusers/:userId/bookmarks", BookmarkController.bookmarkController.otherUsersBookmarkedTuitLists);
    }
    return BookmarkController.bookmarkController;
};
