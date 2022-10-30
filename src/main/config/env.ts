import * as dotenv from "dotenv";
import { env } from "process";

dotenv.config();

dotenv.config({ path: `${__dirname}/../../.env` });

export const { JWT_SECRET } = env;
export const {
  TYPEORM_HOST,
  TYPEORM_PORT,
  TYPEORM_USERNAME,
  TYPEORM_PASSWORD,
  TYPEORM_DATABASE,
  TYPEORM_SYNCHRONIZE,
} = env;
export const {
  ADMIN_PASSWORD
} = env;
