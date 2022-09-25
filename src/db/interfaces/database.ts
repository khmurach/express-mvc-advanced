import DatabaseType from "../../models/db.type";

export default interface IDatabase {
  readonly type: DatabaseType;
  connect(): Promise<boolean>;
  list<T>(query: string, params?: any): Promise<T[]>;
  single<T>(query: string, params?: any): Promise<T>;
}
