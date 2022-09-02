import * as dotenv from "dotenv";
import { env } from "process";

dotenv.config();

dotenv.config({ path: `${__dirname}/../../.env` });

export const { JWT_SECRET } = env;
