/**
 * @file Controller RESTful Web service API for Follow resource
 */
import { Express, Request, Response } from "express";
import FollowDao from "../daos/FollowDao";
import FollowsControllerI from "../interfaces/Follows/FollowsController";
import Follow from "../models/Follow";

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
export default class FollowController implements FollowsControllerI {
  private static followDao: FollowDao = FollowDao.getInstance();
  private static followController: FollowController | null = null;
  /**
   * Creates singleton controller instance
   * @param {Express} app Express instance to declare the RESTful Web service
   * API
   * @return FollowController
   */
  public static getInstance = (app: Express): FollowController => {
    if (FollowController.followController === null) {
      FollowController.followController = new FollowController();
      app.post(
        "/api/users/:uid/follows/:otherUid",
        FollowController.followController.userFollowsOtherUser
      );
      app.delete(
        "/api/users/:uid/follows/:followId",
        FollowController.followController.userUnfollowsOtherUser
      );
      app.get(
        "/api/users/:uid/followers",
        FollowController.followController.userViewsFollowingList
      );
      app.get(
        "/api/users/:uid/follows",
        FollowController.followController.userViewsFollowerList
      );
      app.get(
        "/api/otherusers/:otherUid/followers",
        FollowController.followController.otherUsersFollowingList
      );
      app.get(
        "/api/otherusers/:otherUid/follows",
        FollowController.followController.otherUsersFollowerList
      );
    }
    return FollowController.followController;
  };

  private constructor() {}

  /**
   * Creates a follow record on database
   * @param {Request} req Represents request from client, including the path
   * parameter both users ids.
   * @param {Response} res Represents response to client, including the
   * body formatted as JSON arrays containing the follow objects.
   */
  async userFollowsOtherUser(req: Request, res: Response): Promise<void> {
    const data = new Follow(req.params.uid, req.params.otherUid);
    const resp = await FollowController.followDao.createFollow(data);
    res.send(resp);
  }

  /**
   * Deletes a follow record on database
   * @param {Request} req Represents request from client, including the path
   * parameter both users id and follow ID.
   * @param {Response} res Represents response to client, including the
   * status JSON object.
   */
  async userUnfollowsOtherUser(req: Request, res: Response): Promise<void> {
    const resp = await FollowController.followDao.deleteFollow(
      req.params.followId
    );
    res.send(resp);
  }

  /**
   * Returns a followers list of a user
   * @param {Request} req Represents request from client, including the path
   * parameter and users id.
   * @param {Response} res Represents response to client, including the
   * status JSON Array with follower list.
   */
  async userViewsFollowerList(req: Request, res: Response): Promise<void> {
    const resp = await FollowController.followDao.followerList(req.params.uid);
    res.send(resp);
  }

  /**
   * Returns a following list of a user
   * @param {Request} req Represents request from client, including the path
   * parameter and users id.
   * @param {Response} res Represents response to client, including the
   * status JSON Array with following list.
   */
  async userViewsFollowingList(req: Request, res: Response): Promise<void> {
    const resp = await FollowController.followDao.followingList(req.params.uid);
    res.send(resp);
  }

  /**
   * Returns a followers list of another user
   * @param {Request} req Represents request from client, including the path
   * parameter and another users id.
   * @param {Response} res Represents response to client, including the
   * status JSON Array with follower list of another user.
   */
  async otherUsersFollowerList(req: Request, res: Response): Promise<void> {
    const resp = await FollowController.followDao.followerList(
      req.params.otherUid
    );
    res.send(resp);
  }

  /**
   * Returns a following list of of another user
   * @param {Request} req Represents request from client, including the path
   * parameter and another users id.
   * @param {Response} res Represents response to client, including the
   * status JSON Array with following list of another user.
   */
  async otherUsersFollowingList(req: Request, res: Response): Promise<void> {
    const resp = await FollowController.followDao.followingList(
      req.params.otherUid
    );
    res.send(resp);
  }
}
