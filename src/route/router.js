// call route
import {Router} from "express";


// call all route function path
import api from "../controllers/api.controller.js";
import userSignup from "../controllers/user/userSignup.js"
import LogedInUser from "../controllers/user/LogedInUser.js"
import {Jwt_LogedIn_Midd} from "../middlewares/Jwt_LogedIn.middleware.js"


// make a route
const router = Router();


// 
router.route("/check").get(api);  // just check API call - API IS OK.
// reguler route
// user route
router.route("/logedInUser").post(Jwt_LogedIn_Midd, LogedInUser);  // check firebase recheck sending email & send user data from API server
router.route("/userSignup").post(userSignup);
// admin route


export default router  // router use as  UserRouter in ( app.js )