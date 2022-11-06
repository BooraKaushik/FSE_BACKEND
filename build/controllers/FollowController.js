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
const FollowDao_1 = __importDefault(require("../daos/FollowDao"));
const Follow_1 = __importDefault(require("../models/Follow"));
/**
 * @class FollowController Implements RESTful Web service API for likes resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>GET /api/users/:uid/followers to retrieve following list of a user
 *     </li>
 *     <li>GET /api/users/:uid/follows to retrieve follower list a tuit
 *     </li>
 *     <li>GET /api/otherusers/:otherUid/followers to retrieve following list of another user
 *     </li>
 *     <li>GET /api/otherusers/:otherUid/follows to retrieve follower list another tuit
 *     </li>
 *     <li>POST /api/users/:uid/follows/:otherUid:tid to record that a user follows another user
 *     </li>
 *     <li>DELETE /api/users/:uid/follows/:followId to record that a user
 *     no londer follows another user</li>
 * </ul>
 * @property {FollowDao} followDao Singleton DAO implementing likes CRUD operations
 * @property {FollowController} followController Singleton controller implementing
 * RESTful Web service API
 */
class FollowController {
    constructor() { }
    /**
     * Creates a follow record on database
     * @param {Request} req Represents request from client, including the path
     * parameter both users ids.
     * @param {Response} res Represents response to client, including the
     * body formatted as JSON arrays containing the follow objects.
     */
    userFollowsOtherUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const data = new Follow_1.default(req.params.uid, req.params.otherUid);
            const resp = yield FollowController.followDao.createFollow(data);
            res.send(resp);
        });
    }
    /**
     * Deletes a follow record on database
     * @param {Request} req Represents request from client, including the path
     * parameter both users id and follow ID.
     * @param {Response} res Represents response to client, including the
     * status JSON object.
     */
    userUnfollowsOtherUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield FollowController.followDao.deleteFollow(req.params.followId);
            res.send(resp);
        });
    }
    /**
     * Returns a followers list of a user
     * @param {Request} req Represents request from client, including the path
     * parameter and users id.
     * @param {Response} res Represents response to client, including the
     * status JSON Array with follower list.
     */
    userViewsFollowerList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield FollowController.followDao.followerList(req.params.uid);
            res.send(resp);
        });
    }
    /**
     * Returns a following list of a user
     * @param {Request} req Represents request from client, including the path
     * parameter and users id.
     * @param {Response} res Represents response to client, including the
     * status JSON Array with following list.
     */
    userViewsFollowingList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield FollowController.followDao.followingList(req.params.uid);
            res.send(resp);
        });
    }
    /**
     * Returns a followers list of another user
     * @param {Request} req Represents request from client, including the path
     * parameter and another users id.
     * @param {Response} res Represents response to client, including the
     * status JSON Array with follower list of another user.
     */
    otherUsersFollowerList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield FollowController.followDao.followerList(req.params.otherUid);
            res.send(resp);
        });
    }
    /**
     * Returns a following list of of another user
     * @param {Request} req Represents request from client, including the path
     * parameter and another users id.
     * @param {Response} res Represents response to client, including the
     * status JSON Array with following list of another user.
     */
    otherUsersFollowingList(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const resp = yield FollowController.followDao.followingList(req.params.otherUid);
            res.send(resp);
        });
    }
}
exports.default = FollowController;
FollowController.followDao = FollowDao_1.default.getInstance();
FollowController.followController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return FollowController
 */
FollowController.getInstance = (app) => {
    if (FollowController.followController === null) {
        FollowController.followController = new FollowController();
        app.post("/api/users/:uid/follows/:otherUid", FollowController.followController.userFollowsOtherUser);
        app.delete("/api/users/:uid/follows/:followId", FollowController.followController.userUnfollowsOtherUser);
        app.get("/api/users/:uid/followers", FollowController.followController.userViewsFollowingList);
        app.get("/api/users/:uid/follows", FollowController.followController.userViewsFollowerList);
        app.get("/api/otherusers/:otherUid/followers", FollowController.followController.otherUsersFollowingList);
        app.get("/api/otherusers/:otherUid/follows", FollowController.followController.otherUsersFollowerList);
    }
    return FollowController.followController;
};
