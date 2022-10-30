/**
 * @file This File Implements the model of User.
 */

import AccountType from "./AccountType";
import MaritalStatus from "./MartialStatus";
import Location from "./Location";

/**
 * @typedef  User is a model that represents User entity.
 *
 * @property {String} username UserName of the User.
 * @property {String} password Password of the User.
 * @property {String} firstName First Name of the User.
 * @property {String} lastName Last Name of the User.
 * @property {String} email Email of the User.
 * @property {String} profilePhoto Profile Picture path of the User.
 * @property {String} headerImage Header Image path of the User.
 * @property {String} accountType Account Type of the User.
 * @property {String} maritalStatus Marital Status of the User.
 * @property {String} biography Biography of the User.
 * @property {Date} dateOfBirth Date of Birth of the User.
 * @property {Date} joined Date on which the User joined Tuiter.
 * @property {Object} location Location of the User (an object that contains properties as latitude and logitude).
 */

export default class User {
  private username: string = "";
  private password: string = "";
  private firstName: string | null = null;
  private lastName: string | null = null;
  private email: string = "";
  private profilePhoto: string | null = null;
  private headerImage: string | null = null;
  private accountType: AccountType = AccountType.Personal;
  private maritalStatus: MaritalStatus = MaritalStatus.Single;
  private biography: string | null = null;
  private dateOfBirth: Date | null = null;
  private joined: Date = new Date();
  private location: Location | null = null;
}
