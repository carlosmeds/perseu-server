import { AppDataSource } from "../infra/postgres/data-source";
import { App } from "./app";

new App().server.listen(3000, () => {
  console.log(`express is listening on port 3000`);
});

AppDataSource.initialize();
