/**
 * @file This File Implements the model of Tuit.
 */
/**
 * @typedef Tuit is a model that represents Tuit entity.
 *
 * @property {String} tuit Text of the Tuit.
 * @property {Date} postedOn Date on which the Tuit is posted.
 * @property {String} postedBy Id of the User who posted the Tuit.
 */
export default class Tuit {
  private tuit: string = "";
  private postedOn: Date = new Date();
  private postedBy: String | null = null;
}
