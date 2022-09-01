import "reflect-metadata"
import { DataSource } from "typeorm"
import { Athlete } from "./Athlete.schema"

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",        
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [Athlete],
  migrations: [],
  subscribers: [],
});
