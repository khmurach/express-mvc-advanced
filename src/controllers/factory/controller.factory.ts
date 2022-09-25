import { Request, Response } from "express";

export default interface IContollerFactory<T> {
  create(req: Request, res: Response): T;
}
