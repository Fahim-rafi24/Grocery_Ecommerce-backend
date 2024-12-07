// call route
import {Router} from "express";


// call all route function path
import api from "../controllers/api.controller.js";
import userSignup from "../controllers/user/userSignup.js"
import LogedInUser from "../controllers/user/LogedInUser.js"


// make a route
const router = Router();


// 
router.route("/check").get(api);  // just check API call - API IS OK.
// reguler route
// user route
router.route("/LogedInUser").post(LogedInUser)  // check firebase recheck sending email & send user data from API server
router.route("/userSignup").post(userSignup)
// router.route("/userLogin").post(userLogin)
// router.route("/userSignup").post(userLogin)
// admin route


export default router  // router use as  UserRouter in ( app.js )