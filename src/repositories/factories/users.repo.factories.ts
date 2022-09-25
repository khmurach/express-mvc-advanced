import IDatabase from "../../db/interfaces/database";
import DatabaseType from "../../models/db.type";
import MsSqlUsersRepository from "../mssql/users.repo";
import MySqlUsersRepository from "../mysql/users.repo";

export default class UsersRepositoryFactory {
  static create(db: IDatabase) {
    switch (db.type) {
      case DatabaseType.MsSql:
        return new MsSqlUsersRepository(db);
      case DatabaseType.MySql:
        return new MySqlUsersRepository(db);
      default:
        throw new Error(`Unsupported db type ${db.type}`);
    }
  }
}
