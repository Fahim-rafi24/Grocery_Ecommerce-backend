import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";
import { DataMax } from "./env.js";

// make app
const app = express();


// Express middleware

app.use(cookieParser());
app.use(morgan('dev'));
// app.use(express.static('public'));  // use public folder for temp store file
app.use(express.json({ limit: DataMax }));  // request data limit added
app.use(express.urlencoded({ extended: true, limit: DataMax }));  // uncoded API params url with limited data access
app.use(cors({
    origin: [process.env.CORS_ORIGIN, 'http://localhost:5173'],  // TODO : when app deploy then remove localhost
    credentials: true,  // access cookies
}));  // cros origin plateform setting
// methods: ["GET", "POST", "PUT", "PATCH", "DELETE"]  //TODO : if need



// routes import
import RouterPath from "./route/router.js"


// routes declaration
app.use('/api/v1/chaldal', RouterPath);



// export app
export { app }