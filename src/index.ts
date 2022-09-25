import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import dotenv from "dotenv";
import DatabaseType from "./models/db.type";
import DatabaseFactory from "./db/db.factory";
import UsersRouter from "./routers/users.router";
import UsersControllerFactory from "./controllers/factory/users.controller.factory";

dotenv.config();

const app = express();
const port = process.env.PORT || 8000;

const typeKey: string = process.env.DB_TYPE || "MsSql";
const type: DatabaseType = DatabaseType[typeKey as keyof typeof DatabaseType];

console.log("db type:", DatabaseType[type]);

const db = DatabaseFactory.create(type);
const usersControllerFactory = new UsersControllerFactory(db);

(async () => {
  await db.connect();
})();

const usersRouter = new UsersRouter(express.Router(), usersControllerFactory);

app.get("/ping", (req: Request, res: Response) => {
  res.send("pong");
});

app.use("/users", usersRouter.router);

app.use((err: any, req: Request, res: Response, next: NextFunction) => {
  console.error("Unhandled error: ", err);
  res
    .status(500)
    .json({ success: false, message: err.message || "Server error" });
});

app.listen(port, () => console.log(`Listening on ${port}`));
