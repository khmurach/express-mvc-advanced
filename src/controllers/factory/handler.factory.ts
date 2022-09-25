import { RequestHandler, ErrorRequestHandler } from "express";
import IContollerFactory from "./controller.factory";

export type RequestHandlerSelector<T> = (controller: T) => RequestHandler;
export type ErrorHandlerSelector<T> = (controller: T) => ErrorRequestHandler;

export class HandlerFactory {
  public static handler<T>(
    controllerFactory: IContollerFactory<T>,
    selector: RequestHandlerSelector<T>
  ): RequestHandler {
    return (req, res, next) => {
      let instance = controllerFactory.create(req, res);
      let handler = selector(instance);
      return handler.bind(instance)(req, res, next);
    };
  }

  public static error<T>(
    controllerFactory: IContollerFactory<T>,
    selector: ErrorHandlerSelector<T>
  ): ErrorRequestHandler {
    return (err, req, res, next) => {
      let instance = controllerFactory.create(req, res);
      let handler = selector(instance);
      return handler.bind(instance)(err, req, res, next);
    };
  }
}
