"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
/**
 * @file Implements an Express Node HTTP server.
 */
const express_1 = __importDefault(require("express"));
const UserController_1 = __importDefault(require("./controllers/UserController"));
const UserDao_1 = __importDefault(require("./daos/UserDao"));
const TuitController_1 = __importDefault(require("./controllers/TuitController"));
const LikeController_1 = __importDefault(require("./controllers/LikeController"));
const FollowController_1 = __importDefault(require("./controllers/FollowController"));
const BookmarkController_1 = __importDefault(require("./controllers/BookmarkController"));
const MessageController_1 = __importDefault(require("./controllers/MessageController"));
// Pipline that an incomming request must go through to be parsed to JSON
const cors = require("cors");
const app = (0, express_1.default)();
app.use(cors());
app.use(express_1.default.json());
//Connecting to MongoDB
const options = {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    autoIndex: false,
    maxPoolSize: 10,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 45000,
    family: 4,
};
mongoose_1.default.connect("mongodb+srv://Kaushik:Boora@cluster0.sebdn.mongodb.net/?retryWrites=true&w=majority", options);
// Instansiating all the controllers.
const userDao = new UserDao_1.default();
const userController = new UserController_1.default(app, userDao);
const tuitController = TuitController_1.default.getInstance(app);
const likesController = LikeController_1.default.getInstance(app);
const followController = FollowController_1.default.getInstance(app);
const bookmarkController = BookmarkController_1.default.getInstance(app);
const messageCintroller = MessageController_1.default.getInstance(app);
// Testing APIs
app.get("/", (req, res) => res.send("Welcome to Foundation of Software Engineering!!!!"));
app.get("/hello", (req, res) => res.send("Welcome to Foundation of Software Engineering!"));
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
console.log("Running on Port " + (process.env.PORT || PORT));
