// call route
import {Router} from "express";
// call all route function path
import api from "../controllers/api.controller.js";


// make a route
const router = Router();
// 
router.route("/").get(api);  // just check API call - API IS OK.
// reguler route
// user route
// admin route


export default router  // router use as  UserRouter in ( app.js )