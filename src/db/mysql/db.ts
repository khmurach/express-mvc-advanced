import IDatabase from "../interfaces/database";
import * as sql from "mysql2";
import DatabaseType from "../../models/db.type";

export default class MySqlDatabase implements IDatabase {
  type: DatabaseType = DatabaseType.MySql;
  private pool: sql.Pool;

  constructor(options: sql.PoolOptions) {
    this.pool = sql.createPool(options);
  }

  connect(): Promise<boolean> {
    return new Promise((resolve, reject) => {
      resolve(true);
    });
  }

  query<T>(query: string, params?: any): Promise<T[]> {
    console.log("sql query: ", query);
    console.log("sql params: ", params || "none");

    return new Promise((resolve, reject) => {
      this.pool.query(query, Object.values(params ?? {}), (err, rs) => {
        if (err) reject(err);
        else resolve(<T[]>rs);
      });
    });
  }

  list<T>(query: string, params?: any): Promise<T[]> {
    return this.query<T>(query, params).then((rs) => rs);
  }

  single<T>(query: string, params?: any): Promise<T> {
    return this.query<T>(query, params).then((rs) => rs[0]);
  }
}
