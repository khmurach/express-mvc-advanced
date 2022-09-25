import { Response } from "express";
import { Request } from "express";
import UsersService from "../services/users.service";
import BaseController from "./base/base.constoller";

export default class UsersController extends BaseController {
  constructor(req: Request, res: Response, private usersService: UsersService) {
    super(req, res);
  }

  async index() {
    const users = await this.usersService.getAll();
    return this.ok(users);
  }

  async details() {
    const id = parseInt(this.request.params.id) || 0;
    const user = await this.usersService.getById(id);
    return user ? this.ok(user) : this.missing("User");
  }

  async findByName() {
    const username = this.query("username");
    if (username.length < 2) return this.bad("Min search term length is 2");
    const users = await this.usersService.findByName(username);
    return this.ok(users);
  }
}
