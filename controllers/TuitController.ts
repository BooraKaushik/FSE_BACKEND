import { Request, Response, Express } from "express";
import TuitDao from "../interfaces/TuitDao";
import TuitControllerI from "../interfaces/TuitController";

export default class TuitController implements TuitControllerI {
  app: Express;
  tuitDao: TuitDao;

  constructor(app: Express, tuitDao: TuitDao) {
    this.app = app;
    this.tuitDao = tuitDao;
    this.app.get("/tuits", this.findAllTuits);
    this.app.get("/tuits/:tid", this.findTuitById);
    this.app.get("/users/:uid/tuits", this.findTuitsByUser);
    this.app.post("/tuits", this.createTuit);
    this.app.put("/tuits/:tid", this.updateTuit);
    this.app.delete("/tuits/:tid", this.deleteTuit);
  }

  findAllTuits = async (req: Request, res: Response) => {
    const tuits = await this.tuitDao.findAllTuits();
    res.json(tuits);
  };
  findTuitsByUser = async (req: Request, res: Response) => {
    const tuits = await this.tuitDao.findTuitsByUser(req.body?.name);
    res.json(tuits);
  };
  findTuitById = async (req: Request, res: Response) => {
    const tuit = await this.tuitDao.findTuitById(req.params.tid);
    res.json(tuit);
  };
  createTuit = async (req: Request, res: Response) => {
    const tuit = await this.tuitDao.createTuit(req.body);
    res.json(tuit);
  };
  updateTuit = async (req: Request, res: Response) => {
    const status = await this.tuitDao.updateTuit(req.params.tid, req.body);
    res.json(status);
  };
  deleteTuit = async (req: Request, res: Response) => {
    const status = await this.tuitDao.deleteTuit(req.params.tid);
    res.json(status);
  };
}
