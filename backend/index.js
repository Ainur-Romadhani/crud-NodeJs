import Express from "express";
import db from "./config/database.js";
import router from "./routes/index.js";

const app = Express();

try{
    db.authenticate();
    console.log('Database Conected');
}catch(error){
    console.log('Database Error');
}

app.use(Express.json());
app.use('/products', router);

app.listen(5000, () => console.log('Server running at port 5000'));