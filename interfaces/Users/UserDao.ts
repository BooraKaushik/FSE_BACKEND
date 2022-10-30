import User from "../../models/User";

/**
 * @file Declares API for Users related Data Access Objects methods
 */
export default interface UserDao {
  findAllUsers(): Promise<User[]>;
  findUserById(uid: string): Promise<any>;
  createUser(user: User): Promise<User>;
  updateUser(uid: string, user: User): Promise<any>;
  deleteUser(uid: string): Promise<any>;
}
