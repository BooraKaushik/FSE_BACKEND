/**
 * @file Implements DAO managing data storage of tuits. Uses mongoose TuitModel
 * to integrate with MongoDB
 */
import TuitModel from "../mongoose/Tuit/TuitModel";
import Tuit from "../models/Tuit";
import TuitDaoI from "../interfaces/Tuits/TuitDao";

/**
 * @class TuitDao Implements Data Access Object managing data storage
 * of Tuits
 * @property {TuitDao} userDao Private single instance of TuitDao
 */
export default class TuitDao implements TuitDaoI {
  private static tuitDao: TuitDao | null = null;
  /**
   * Creates singleton DAO instance
   * @returns TuitDao
   */
  public static getInstance = (): TuitDao => {
    if (TuitDao.tuitDao === null) {
      TuitDao.tuitDao = new TuitDao();
    }
    return TuitDao.tuitDao;
  };
  private constructor() {}
  /**
   * Uses TuitModel to retrieve all tuits documents from tuit collection
   * @returns Promise To be notified when the tuits are retrieved from
   * database
   */
  findAllTuits = async (): Promise<Tuit[]> =>
    TuitModel.find().populate("postedBy").exec();
  /**
   * Uses TuitModel to retrieve tuit documents from tuit collection using user id.
   * @param uid id of the user whose tuits are to be extracted.
   * @returns Promise To be notified when the tuit is retrieved from
   * database
   */
  findAllTuitsByUser = async (uid: string): Promise<Tuit[]> =>
    TuitModel.find({ postedBy: uid }).populate("postedBy").exec();

  /**
   * Uses TuitModel to retrieve all documents from tuit collection using tuit id.
   * @param uid id of the tuits to be extracted.
   * @returns Promise To be notified when the tuits are retrieved from
   * database
   */
  findTuitById = async (uid: string): Promise<any> =>
    TuitModel.findById(uid).populate("postedBy").exec();

  /**
   * Creates a Tuit record on the Database.
   * @param uid id of the user whose tuits are to be extracted.
   * @param tuit Tuit object that is to be created.
   * @returns Promise To be notified when the tuit is created on
   * database
   */
  createTuitByUser = async (uid: string, tuit: Tuit): Promise<Tuit> =>
    TuitModel.create({ ...tuit, postedBy: uid });

  /**
   * Updates a Tuit record on the Database.
   * @param uid id of the user whose tuits are to be extracted.
   * @param tuit Tuit object that is to be updated.
   * @returns Promise To be notified when the tuit is updated on
   * database
   */
  updateTuit = async (uid: string, tuit: Tuit): Promise<any> =>
    TuitModel.updateOne({ _id: uid }, { $set: tuit });

  /**
   * Delets a Tuit record on the Database.
   * @param uid id of the user whose tuits are to be extracted.
   * @returns Promise To be notified when the tuit is deleted on
   * database
   */
  deleteTuit = async (uid: string): Promise<any> =>
    TuitModel.deleteOne({ _id: uid });

  updateLikes = async (tid: any, newStats: any) =>
    TuitModel.updateOne({ _id: tid }, { $set: { stats: newStats } });
}
