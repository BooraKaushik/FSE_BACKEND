import mongoose from "mongoose";
/**
 * @file Implements an Express Node HTTP server.
 */
import express, { Request, Response } from "express";
import UserControllerI from "./interfaces/Users/UserController";
import UserController from "./controllers/UserController";
import UserDaoI from "./interfaces/Users/UserDao";
import UserDao from "./daos/UserDao";
import TuitControllerI from "./interfaces/Tuits/TuitController";
import TuitController from "./controllers/TuitController";
import LikeController from "./controllers/LikeController";
import FollowController from "./controllers/FollowController";

const cors = require("cors");
const app = express();
app.use(cors());
app.use(express.json());
const options = {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  autoIndex: false,
  maxPoolSize: 10,
  serverSelectionTimeoutMS: 5000,
  socketTimeoutMS: 45000,
  family: 4,
};
mongoose.connect(
  "mongodb+srv://Kaushik:Boora@cluster0.sebdn.mongodb.net/?retryWrites=true&w=majority",
  options
);

const userDao: UserDaoI = new UserDao();
const userController: UserControllerI = new UserController(app, userDao);
const tuitController: TuitControllerI = TuitController.getInstance(app);
const likesController = LikeController.getInstance(app);
const followController = FollowController.getInstance(app);

app.get("/", (req: Request, res: Response) =>
  res.send("Welcome to Foundation of Software Engineering!!!!")
);

app.get("/hello", (req: Request, res: Response) =>
  res.send("Welcome to Foundation of Software Engineering!")
);
/**
 * Start a server listening at port 4000 locally
 * but use environment variable PORT on Heroku if available.
 */
const PORT = 4000;
app.listen(process.env.PORT || PORT);
