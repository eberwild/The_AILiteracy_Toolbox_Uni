import dotenv from 'dotenv';
dotenv.config({ path: path.resolve('../.env.local') });
import knex from "knex";
import path from "path";


const DBPath = path.resolve("./data/mydb_uni.sqlite");

// configure knex -> sql-data
const database = knex({
  client: "sqlite3",
  connection: {
    filename: DBPath// path to db-file
  },
  useNullAsDefault: true // no errors for value Null
});

export default database;