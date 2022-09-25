import IDatabase from "../../db/interfaces/database";
import User from "../../models/user";
import IUsersRepository from "../interfaces/users.repo";

export default class MySqlUsersRepository implements IUsersRepository {
  constructor(private db: IDatabase) {}

  getAll(): Promise<User[]> {
    return this.db.list<User>("select `id`, `username` from `users`");
  }

  getById(id: number): Promise<User> {
    return this.db.single<User>("select `id`, `username` from `users` where `id` = ?", { id });
  }

  findByName(username: string): Promise<User[]> {
    username = `%${username}%`;
    return this.db.list<User>(
      "select `id`, `username` from `users` where `username` like ? limit 10",
      { username }
    );
  }
}
