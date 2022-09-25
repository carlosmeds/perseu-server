import "reflect-metadata";
import { DataSource } from "typeorm";
import { Athlete } from "./schema/Athlete.schema";
import { Coach } from "./schema/Coach.schema";
import { Exercise } from "./schema/Exercise.schema";
import { Request } from "./schema/Request.schema";
import { Session } from "./schema/Session.schema";
import { Team } from "./schema/Team.schema";
import { Training } from "./schema/Training.schema";
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
  entities: [Athlete, User, Coach, Team, Request, Exercise, Session, Training],
  migrations: [],
  subscribers: [],
});
