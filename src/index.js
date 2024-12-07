import dotenv from "dotenv"
dotenv.config({ path: "./.env" });
import { ConnectDB } from "./db/db.js";
import { app } from "./app.js";
import { Local_PORT } from "./env.js";



app.get('/', (req, res) => {
    res.send('Chaldal : API SERVER RUN')
})



// call Data Base
ConnectDB()
    .then(() => {
        const port = process.env.PORT || Local_PORT;
        app.listen(port, () => {
            console.log("Api server run by : ", port)
        })
    })
    .catch(err => {
        console.log("DB connection error", err);
    })