import "reflect-metadata";
import { DataSource } from "typeorm";
import { Athlete } from "./schema/Athlete.schema";
import { Coach } from "./schema/Coach.schema";
import { Team } from "./schema/Team.schema";
import { User } from "./schema/User.schema";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "test",
  synchronize: true,
  logging: false,
  entities: [Athlete, User, Coach, Team],
  migrations: [],
  subscribers: [],
});
