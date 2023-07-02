import { config } from 'dotenv';

export let PORT, DB_URL, JWT_SECRET;

export function loadConfig() {
  config();
  PORT = process.env.PORT;
  DB_URL = process.env.DB_URL;
  JWT_SECRET = process.env.JWT_SECRET;
}
