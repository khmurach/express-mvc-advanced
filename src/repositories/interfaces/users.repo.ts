import User from "../../models/user";
import IRepository from "./repo";

export default interface IUsersRepository extends IRepository<User, number> {
  findByName(username: string): Promise<User[]>;
}
