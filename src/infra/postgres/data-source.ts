import "reflect-metadata";
import { DataSource } from "typeorm";
import { TYPEORM_HOST, TYPEORM_PORT, TYPEORM_USERNAME, TYPEORM_PASSWORD, TYPEORM_DATABASE, TYPEORM_SYNCHRONIZE } from "../../main/config/env";
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
  host: TYPEORM_HOST,
  port: Number(TYPEORM_PORT),
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database: TYPEORM_DATABASE,
  synchronize: Boolean(TYPEORM_SYNCHRONIZE),
  logging: false,
  entities: [Athlete, User, Coach, Team, Request, Exercise, Session, Training],
  migrations: [],
  subscribers: [],
});
