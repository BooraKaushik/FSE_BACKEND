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
 * @file Controller RESTful Web service API for tuits resource
 */
const TuitDao_1 = __importDefault(require("../daos/TuitDao"));
/**
 * @class TuitController Implements RESTful Web service API for tuits resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users/:uid/tuits to create a new tuit instance for
 *     a given user</li>
 *     <li>GET /api/tuits to retrieve all the tuit instances</li>
 *     <li>GET /api/tuits/:tid to retrieve a particular tuit instances</li>
 *     <li>GET /api/users/:uid/tuits to retrieve tuits for a given user </li>
 *     <li>PUT /api/tuits/:tid to modify an individual tuit instance </li>
 *     <li>DELETE /api/tuits/:tid to remove a particular tuit instance</li>
 * </ul>
 * @property {TuitDao} tuitDao Singleton DAO implementing tuit CRUD operations
 * @property {TuitController} tuitController Singleton controller implementing
 * RESTful Web service API
 */
class TuitController {
    constructor() {
        /**
         * Retrieves all tuits from the database and returns an array of tuits.
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects
         */
        this.findAllTuits = (req, res) => TuitController.tuitDao.findAllTuits().then((tuits) => {
            res.json(tuits);
            console.log(tuits);
        });
        /**
         * Retrieves all tuits from the database for a particular user and returns
         * an array of tuits.
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the tuit objects
         */
        this.findAllTuitsByUser = (req, res) => {
            let userId = req.params.uid === "me" && req.session["profile"]
                ? req.session["profile"]._id
                : req.params.uid;
            TuitController.tuitDao.findAllTuitsByUser(userId).then((tuits) => {
                res.json(tuits);
            });
        };
        /**
         * Retreive all the tuits bt id
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the tuit that matches the user ID
         */
        this.findTuitById = (req, res) => {
            TuitController.tuitDao.findTuitById(req.params.uid).then((tuit) => {
                res.json(tuit);
            });
        };
        /**
         * Creates a Tuit on the database.
         * @param {Request} req Represents request from client, including body
         * containing the JSON object for the new tuit to be inserted in the
         * database
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new tuit that was inserted in the
         * database
         */
        this.createTuit = (req, res) => __awaiter(this, void 0, void 0, function* () {
            let userId = req.params.uid === "me" && req.session["profile"]
                ? req.session["profile"]._id
                : req.params.uid;
            TuitController.tuitDao
                .createTuitByUser(userId, req.body)
                .then((tuit) => {
                res.json(tuit);
            });
        });
        /**
         * Update a Tuit Record.
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be modified
         * @param {Response} res Represents response to client, including status
         * on whether updating a tuit was successful or not
         */
        this.updateTuit = (req, res) => TuitController.tuitDao
            .updateTuit(req.params.uid, req.body)
            .then((status) => res.send(status));
        /**
         * Remove a Tuit Record.
         * @param {Request} req Represents request from client, including path
         * parameter tid identifying the primary key of the tuit to be removed
         * @param {Response} res Represents response to client, including status
         * on whether deleting a user was successful or not
         */
        this.deleteTuit = (req, res) => {
            TuitController.tuitDao
                .deleteTuit(req.params.uid)
                .then((status) => res.send(status));
        };
    }
}
exports.default = TuitController;
TuitController.tuitDao = TuitDao_1.default.getInstance();
TuitController.tuitController = null;
/**
 * Creates singleton controller instance
 * @param {Express} app Express instance to declare the RESTful Web service
 * API
 * @return TuitController
 */
TuitController.getInstance = (app) => {
    if (TuitController.tuitController === null) {
        TuitController.tuitController = new TuitController();
        app.get("/api/tuits", TuitController.tuitController.findAllTuits);
        app.get("/api/users/:uid/tuits", TuitController.tuitController.findAllTuitsByUser);
        app.get("/api/tuits/:uid", TuitController.tuitController.findTuitById);
        app.post("/api/users/:uid/tuits", TuitController.tuitController.createTuit);
        app.put("/api/tuits/:uid", TuitController.tuitController.updateTuit);
        app.delete("/api/tuits/:uid", TuitController.tuitController.deleteTuit);
    }
    return TuitController.tuitController;
};
