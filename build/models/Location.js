"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
/**
 * @file implements a model that represents Location.
 */
/**
 * @typedef Location Respresents the Location of a user.
 * @property {Number} latitude Represents latitude value of location.
 * @property {Number} longitude Represents longitude value of location.
 */
class Location {
    constructor() {
        this.latitude = 0.0;
        this.longitude = 0.0;
    }
}
exports.default = Location;
