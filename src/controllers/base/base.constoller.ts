import { Response } from "express";
import { Request } from "express";
import HttpStatus from "../../models/http.status";

export default abstract class BaseController {
  constructor(protected request: Request, protected response: Response) {}

  ok(data: any) {
    this.response.json({ success: true, data });
  }

  error(message?: string, status: HttpStatus = HttpStatus.ServerError) {
    this.response.status(status).json({ success: false, message });
  }

  missing(name: string = "Item") {
    this.error(`${name} is not found`, HttpStatus.NotFound);
  }

  bad(message: string) {
    this.error(message, HttpStatus.BadRequest);
  }

  query(param: string): string {
    const query = this.request.query;
    const values: any = query[param];

    if (typeof values === "object") {
      return <string>values[0];
    }

    return <string>values;
  }
}
