// call route
import {Router} from "express";


// call all route function path
import api from "../controllers/api.controller.js";
import userSignup from "../controllers/user/userSignup.js"


// make a route
const router = Router();


// 
router.route("/check").get(api);  // just check API call - API IS OK.
// reguler route
// user route
// router.route("/userSignup").post(userAutoCall)
router.route("/userSignup").post(userSignup)
// router.route("/userSignup").post(userLogin)
// admin route


export default router  // router use as  UserRouter in ( app.js )