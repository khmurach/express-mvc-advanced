import IDatabase from "../../db/interfaces/database";
import User from "../../models/user";
import IUsersRepository from "../interfaces/users.repo";

export default class MsSqlUsersRepository implements IUsersRepository {
  constructor(private db: IDatabase) {}

  getAll(): Promise<User[]> {
    return this.db.list<User>("select [id], [username] from [dbo].[users]");
  }

  getById(id: number): Promise<User> {
    return this.db.single<User>("select [id], [username] from [dbo].[users] where [id] = @id", { id });
  }

  findByName(username: string): Promise<User[]> {
    username = `%${username}%`;
    return this.db.list<User>(
      "select top 10 [id], [username] from [dbo].[users] where [username] like @username",
      { username }
    );
  }
}
