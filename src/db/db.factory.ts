import { config } from "mssql";
import { PoolOptions } from "mysql2";
import IDatabase from "../db/interfaces/database";
import DatabaseType from "../models/db.type";
import MsSqlDatabase from "./mssql/db";
import MySqlDatabase from "./mysql/db";

export default class DatabaseFactory {
  static create(type: DatabaseType): IDatabase {
    switch (type) {
      case DatabaseType.MsSql:
        return new MsSqlDatabase(DatabaseFactory.GetMsSqlConfig());
      case DatabaseType.MySql:
        return new MySqlDatabase(DatabaseFactory.GetMySqlConfig());
      default:
        throw new Error(`Unsupported db type ${type}`);
    }
  }

  private static GetMsSqlConfig(): config {
    const env = process.env;
    return {
      server: env.DB_SERVER!,
      database: env.DB_NAME,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000,
      },
      options: {
        encrypt: false, // true for azure
        trustServerCertificate: true, // change to true for local dev / self-signed certs
      },
    };
  }

  private static GetMySqlConfig(): PoolOptions {
    const env = process.env;
    return {
      host: env.DB_SERVER!,
      database: env.DB_NAME,
      user: env.DB_USER,
      password: env.DB_PASSWORD,
      connectionLimit: 10,
    };
  }
}
