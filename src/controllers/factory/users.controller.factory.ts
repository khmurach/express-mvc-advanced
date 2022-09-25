import { Response } from "express";
import { Request } from "express";
import IDatabase from "../../db/interfaces/database";
import UsersRepositoryFactory from "../../repositories/factories/users.repo.factories";
import UsersService from "../../services/users.service";
import UsersController from "../users.controller";
import IContollerFactory from "./controller.factory";

export default class UsersControllerFactory
  implements IContollerFactory<UsersController>
{
  constructor(private db: IDatabase) {}

  create(req: Request, res: Response) {
    return new UsersController(
      req,
      res,
      new UsersService(UsersRepositoryFactory.create(this.db))
    );
  }
}
