"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @class UserController Implements RESTful Web service API for users resource.
 * Defines the following HTTP endpoints:
 * <ul>
 *     <li>POST /api/users to create a new user instance</li>
 *     <li>GET /api/users to retrieve all the user instances</li>
 *     <li>GET /api/users/:uid to retrieve an individual user instance </li>
 *     <li>PUT /api/users to modify an individual user instance </li>
 *     <li>DELETE /api/users/:uid to remove a particular user instance</li>
 * </ul>
 * @property {UserDao} userDao Singleton DAO implementing user CRUD operations
 * @property {UserController} userController Singleton controller implementing
 * RESTful Web service API
 */
class UserController {
    /**
     * Creates User controller instance.
     * @param {Express} app Express instance to declare the RESTful Web service
     * API
     * @param {UserDao} userDao Data Access Object that enables communication with the Database.
     * @returns UserController
     */
    constructor(app, userDao) {
        /**
         * Retrieves all users from the database and returns an array of users.
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON arrays containing the user objects
         */
        this.findAllUsers = (req, res) => this.userDao.findAllUsers().then((users) => res.json(users));
        /**
         * Retrieves the user by their primary key
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user to be retrieved
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the user that matches the user ID
         */
        this.findUserById = (req, res) => this.userDao.findUserById(req.params.userid).then((user) => res.json(user));
        /**
         * Creates a new user instance
         * @param {Request} req Represents request from client, including body
         * containing the JSON object for the new user to be inserted in the
         * database
         * @param {Response} res Represents response to client, including the
         * body formatted as JSON containing the new user that was inserted in the
         * database
         */
        this.createUser = (req, res) => this.userDao.createUser(req.body).then((user) => res.json(user));
        /**
         * Removes a user instance from the database
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user to be removed
         * @param {Response} res Represents response to client, including status
         * on whether deleting a user was successful or not
         */
        this.deleteUser = (req, res) => this.userDao
            .deleteUser(req.params.userid)
            .then((status) => res.json(status));
        /**
         * Modifies an existing user instance
         * @param {Request} req Represents request from client, including path
         * parameter uid identifying the primary key of the user to be modified
         * @param {Response} res Represents response to client, including status
         * on whether updating a user was successful or not
         */
        this.updateUser = (req, res) => this.userDao
            .updateUser(req.params.userid, req.body)
            .then((status) => res.json(status));
        /**
         * Removes all user instances from the database. Useful for testing
         * @param {Request} req Represents request from client
         * @param {Response} res Represents response to client, including status
         * on whether deleting all users was successful or not
         */
        this.deleteAllUsers = (req, res) => this.userDao.deleteAllUsers().then((status) => res.send(status));
        this.deleteUsersByUsername = (req, res) => this.userDao
            .deleteUsersByUsername(req.params.username)
            .then((status) => res.send(status));
        this.login = (req, res) => this.userDao
            .findUserByCredentials(req.body.username, req.body.password)
            .then((user) => {
            res.json(user);
        });
        this.register = (req, res) => this.userDao.findUserByUsername(req.body.username).then((user) => { });
        this.app = app;
        this.userDao = userDao;
        this.app.get("/api/users", this.findAllUsers);
        this.app.get("/api/users/:userid", this.findUserById);
        this.app.post("/api/users", this.createUser);
        this.app.delete("/api/users/:userid", this.deleteUser);
        this.app.put("/api/users/:userid", this.updateUser);
    }
}
exports.default = UserController;
