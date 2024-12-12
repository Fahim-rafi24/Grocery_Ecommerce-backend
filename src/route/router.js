// call route
import {Router} from "express";

// call all route function path
import api from "../controllers/api.controller.js";
import userSignup from "../controllers/user/userSignup.js";
import LogedInUser from "../controllers/user/LogedInUser.js";
import {Jwt_LogedIn_Midd} from "../middlewares/Jwt_LogedIn.middleware.js";
import { Jwt_Can_Valid } from "../middlewares/Jwt_Can_Valid.js";
import {addNewProduct} from "../controllers/admin/addNewProduct.js";
import {User_Can_Admin} from "../middlewares/User_Can_Admin.js";
import SearchAPI from "../controllers/common/SearchAPI.js";
import TargetedSearchApi from "../controllers/common/TargetedSearchAPI.js";
import IsPopuler from "../controllers/common/IsPopuler.js";
import IsHome from "../controllers/common/IsHome.js";
import IsCard_IsFav from "../controllers/common/IsCard&IsFav.js";
import CalculateProductCost from "../controllers/common/CalculateProductCost.js";

// make a route
const router = Router();


// 
router.route("/check").get(api);  // just check API call - API IS OK.


// reguler route
router.route("/isHome").post(IsHome); // it's use for home random search
router.route("/search").get(SearchAPI); // it's use for search bar 
router.route("/targeted/search").post(TargetedSearchApi); // it's use for all sidebar industry, catagory, subcatagory data call
router.route("/isPopuler").get(IsPopuler);  // send all populer items as a arr
router.route("/IsCard_IsFav").post(IsCard_IsFav);
router.route("/calculate-total").post(CalculateProductCost);  // calculate all product cost total


// user route
router.route("/logedInUser").post(Jwt_LogedIn_Midd, LogedInUser);  // check firebase recheck sending email & send user data from API server
router.route("/userSignup").post(userSignup);  // new user account create route


// admin route
router.route("/product_add").post(Jwt_Can_Valid, User_Can_Admin, addNewProduct);


export default router  // router use as  UserRouter in ( app.js )