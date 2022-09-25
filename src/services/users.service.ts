import User from "../models/user";
import IUsersRepository from "../repositories/interfaces/users.repo";
import IUsersService from "./interfaces/users.service";

export default class UsersService implements IUsersService {
  constructor(private repository: IUsersRepository) {}

  getAll(): Promise<User[]> {
    return this.repository.getAll();
  }
  getById(id: number): Promise<User> {
    return this.repository.getById(id);
  }
  findByName(username: string): Promise<User[]> {
    return this.repository.findByName(username);
  }
}
