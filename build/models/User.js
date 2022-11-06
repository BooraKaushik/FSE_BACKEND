"use strict";
/**
 * @file This File Implements the model of User.
 */
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const AccountType_1 = __importDefault(require("./AccountType"));
const MartialStatus_1 = __importDefault(require("./MartialStatus"));
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
class User {
    constructor() {
        this.username = "";
        this.password = "";
        this.firstName = null;
        this.lastName = null;
        this.email = "";
        this.profilePhoto = null;
        this.headerImage = null;
        this.accountType = AccountType_1.default.Personal;
        this.maritalStatus = MartialStatus_1.default.Single;
        this.biography = null;
        this.dateOfBirth = null;
        this.joined = new Date();
        this.location = null;
    }
}
exports.default = User;
