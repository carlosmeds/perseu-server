import "reflect-metadata";
import { DataSource, DataSourceOptions } from "typeorm";
import { SeederOptions } from "typeorm-extension";
import {
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_SYNCHRONIZE,
} from "../../main/config/env";
import { Athlete } from "./schema/Athlete.schema";
import { AthleteTraining } from "./schema/AthleteTraining.schema";
import { CheckIn } from "./schema/CheckIn.schema";
import { Coach } from "./schema/Coach.schema";
import { Exercise } from "./schema/Exercise.schema";
import { Group } from "./schema/Group.schema";
import { Request } from "./schema/Request.schema";
import { Session } from "./schema/Session.schema";
import { Team } from "./schema/Team.schema";
import { Training } from "./schema/Training.schema";
import { User } from "./schema/User.schema";
import { MainSeeder } from "./seeds/MainSeeder";

const options: DataSourceOptions & SeederOptions = {
  type: "postgres",
  host: TYPEORM_HOST,
  port: Number(TYPEORM_PORT),
  username: TYPEORM_USERNAME,
  password: TYPEORM_PASSWORD,
  database: TYPEORM_DATABASE,
  synchronize: Boolean(TYPEORM_SYNCHRONIZE),
  logging: false,
  entities: [
    Athlete,
    User,
    Coach,
    Team,
    Request,
    Exercise,
    Session,
    Training,
    CheckIn,
    AthleteTraining,
    Group,
  ],
  seeds: [MainSeeder],
};

export const AppDataSource = new DataSource(options);
