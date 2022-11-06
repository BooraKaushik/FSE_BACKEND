"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file  Implements Schema for the Users collection.
 */
/**
 * @typedef  UserSchema defines the way data is represented in Users collection.
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
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    username: { type: String, required: true },
    password: { type: String, required: true },
    firstName: String,
    lastName: String,
    email: String,
    profilePhoto: String,
    headerImage: String,
    accountType: {
        type: String,
        default: "PERSONAL",
        enum: ["PERSONAL", "ACADEMIC", "PROFESSIONAL"],
    },
    maritalStatus: {
        type: String,
        default: "SINGLE",
        enum: ["MARRIED", "SINGLE", "WIDOWED"],
    },
    biography: String,
    dateOfBirth: Date,
    joined: { type: Date, default: Date.now },
    location: {
        latitude: { type: Number, default: 0.0 },
        longitude: { type: Number, default: 0.0 },
    },
}, { collection: "users" });
exports.default = UserSchema;
