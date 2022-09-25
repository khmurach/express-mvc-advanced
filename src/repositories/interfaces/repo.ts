export default interface IRepository<T, TK> {
  getAll(): Promise<T[]>;
  getById(id: TK): Promise<T>;
}
