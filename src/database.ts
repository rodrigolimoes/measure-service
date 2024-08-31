import dotenv from "dotenv";
import { DataSource } from "typeorm";
import { Measure } from "@src/measures/entity/measure.entity";

dotenv.config();

export const dataSource = new DataSource({
  type: "mysql",
  host: "database",
  username: "rodrigo",
  port: 3306,
  password: "test",
  synchronize: true,
  database: "measure",
  entities: [Measure],
});

export const connectDatabase = async () => {
  try {
    await dataSource.initialize();
  } catch (e) {
    console.error("Error during Data Source initialization", e);
  }
};
