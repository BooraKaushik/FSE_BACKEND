"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file implements an enumuration that represents Account Type.
 */
/**
 * @typedef AccountType Respresents the Type of account of a user.
 * @property {String} Personal Represents Personal account type.
 * @property {String} Academic Represents Academic account type.
 * @property {String} Professional Represents Professional account type.
 */
var AccountType;
(function (AccountType) {
    AccountType["Personal"] = "PERSONAL";
    AccountType["Academic"] = "ACADEMIC";
    AccountType["Professional"] = "PROFESSIONAL";
})(AccountType || (AccountType = {}));
exports.default = AccountType;
