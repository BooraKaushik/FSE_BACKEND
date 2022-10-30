/**
 * @file implements an enumuration that represents Marital Status of a user.
 */
/**
 * @typedef MaritalStatus Respresents the MaritalStatus of a user.
 * @property {String} Married Represents a user is married.
 * @property {String} Single Represents  a user is Single.
 * @property {String} Widowed Represents  a user is Widowed.
 */
enum MaritalStatus {
  Married = "MARRIED",
  Single = "SINGLE",
  Widowed = "WIDOWED",
}
export default MaritalStatus;
