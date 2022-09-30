import IDatabase from "../interfaces/database";
import * as sql from "mysql2/promise";
import DatabaseType from "../../models/db.type";

export default class MySqlDatabase implements IDatabase {
  type: DatabaseType = DatabaseType.MySql;
  private pool: sql.Pool;

  constructor(options: sql.PoolOptions) {
    this.pool = sql.createPool(options);
  }

  connect(): Promise<boolean> {
    return this.pool
      .getConnection()
      .then((c) => {
        console.log("db connected");
        c.release();
        return true;
      })
      .catch((err) => {
        console.error(`db failed to connect: ${err.message}`);
        return false;
      });
  }

  query<T>(query: string, params?: any): Promise<any> {
    console.log("sql query: ", query);
    console.log("sql params: ", params || "none");

    return this.pool
      .query(query, Object.values(params ?? {}))
      .then(([rs]) => rs);
  }

  list<T>(query: string, params?: any): Promise<T[]> {
    return this.query<T>(query, params).then((rs) => rs);
  }

  single<T>(query: string, params?: any): Promise<T> {
    return this.query<T>(query, params).then((rs) => rs[0]);
  }
}
