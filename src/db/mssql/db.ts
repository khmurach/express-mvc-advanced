import IDatabase from "../interfaces/database";
import * as sql from "mssql";
import DatabaseType from "../../models/db.type";

export default class MsSqlDatabase implements IDatabase {
  type: DatabaseType = DatabaseType.MsSql;
  private pool: sql.ConnectionPool;

  constructor(config: sql.config) {
    this.pool = new sql.ConnectionPool(config);
  }

  connect(): Promise<boolean> {
    return this.pool
      .connect()
      .then((x) => true)
      .catch((x) => false);
  }

  private query<T>(query: string, params?: any): Promise<sql.IResult<T>> {
    const request = this.pool.request();

    console.log("sql query: ", query);
    console.log("sql params: ", params || "none");

    for (let p in params ?? {}) request.input(p, params[p]);
    return request.query<T>(query);
  }

  list<T>(query: string, params?: any): Promise<T[]> {
    return this.query<T>(query, params).then((rs) => rs.recordset);
  }

  single<T>(query: string, params?: any): Promise<T> {
    return this.query<T>(query, params).then((rs) => rs.recordset[0]);
  }
}
