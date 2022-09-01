import { AppDataSource } from "../infra/postgres/data-source";
import { App } from "./app";

new App().server.listen(3000);

AppDataSource.initialize()

console.log("Server is running on port 3000");
