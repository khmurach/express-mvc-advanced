import User from "../../models/user";

export default interface IUsersService {
  getAll(): Promise<User[]>;
  getById(id: number): Promise<User>;
  findByName(username: string): Promise<User[]>;
}
