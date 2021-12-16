import { Sequelize } from "sequelize";

const db = new Sequelize('crud_nodejs', 'root', '',{
    host: "localhost",
    dialect: "mysql"
});

export default db;