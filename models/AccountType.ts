/**
 * @file implements an enumuration that represents Account Type.
 */
/**
 * @typedef AccountType Respresents the Type of account of a user.
 * @property {String} Personal Represents Personal account type.
 * @property {String} Academic Represents Academic account type.
 * @property {String} Professional Represents Professional account type.
 */
enum AccountType {
  Personal = "PERSONAL",
  Academic = "ACADEMIC",
  Professional = "PROFESSIONAL",
}
export default AccountType;
