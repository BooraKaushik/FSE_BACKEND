"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file implements an enumuration that represents Marital Status of a user.
 */
/**
 * @typedef MaritalStatus Respresents the MaritalStatus of a user.
 * @property {String} Married Represents a user is married.
 * @property {String} Single Represents  a user is Single.
 * @property {String} Widowed Represents  a user is Widowed.
 */
var MaritalStatus;
(function (MaritalStatus) {
    MaritalStatus["Married"] = "MARRIED";
    MaritalStatus["Single"] = "SINGLE";
    MaritalStatus["Widowed"] = "WIDOWED";
})(MaritalStatus || (MaritalStatus = {}));
exports.default = MaritalStatus;
