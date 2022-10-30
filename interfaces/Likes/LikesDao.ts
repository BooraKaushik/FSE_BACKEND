import Like from "../../models/Like";

/**
 * @file Declares API for Likes related Data Access Objects methods
 */

export default interface LikeDao {
    findAllUsersThatLikedTuit (tid: string): Promise<Like[]>;
    findAllTuitsLikedByUser (uid: string): Promise<Like[]>;
    userUnlikesTuit (tid: string, uid: string): Promise<any>;
    userLikesTuit (tid: string, uid: string): Promise<Like>;
};