import Express from "express";
import db from "./config/database.js";
import router from "./routes/index.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import Users from "./models/usersModel.js";

dotenv.config();
const app = Express();

try{
    db.authenticate();
    // Users.sync(); // create tabel users
    console.log('Database Conected');
}catch(error){
    console.log('Database Error');
}

app.use(cookieParser());
app.use(Express.json());
app.use('/', router);

app.listen(5000, () => console.log('Server running at port 5000'));