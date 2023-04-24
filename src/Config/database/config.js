import dotenv from 'dotenv';
dotenv.config({path: './src/Config/env/.env'})
export const DBCONFIG = {
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_DATABASE
  }