import express from "express";
import { router } from "./router";
const cors = require("cors");

export class App {
  public server: express.Application;

  constructor() {
    this.server = express();
    this.middleware();
    this.router();
  }

  private middleware() {
    this.server.use(express.json());
  }

  private router() {
    router.options("*", cors());
    this.server.use(router);
  }
}
