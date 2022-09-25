import { HandlerFactory } from "./../controllers/factory/handler.factory";
import { Router } from "express";
import UsersController from "../controllers/users.controller";
import IContollerFactory from "../controllers/factory/controller.factory";

export default class UsersRouter {
  constructor(
    public router: Router,
    controllerFactory: IContollerFactory<UsersController>
  ) {
    router.get(
      "/",
      HandlerFactory.handler(controllerFactory, (c) => c.index)
    );
    router.get(
      "/search",
      HandlerFactory.handler(controllerFactory, (c) => c.findByName)
    );
    router.get(
      "/:id",
      HandlerFactory.handler(controllerFactory, (c) => c.details)
    );
  }
}
