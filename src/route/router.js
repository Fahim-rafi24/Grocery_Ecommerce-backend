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
import UserInfo from "../controllers/user/UserInfo.js";
import UpdateUserInfo from "../controllers/user/UpdateUserInfo.js";
import Pay_add_product from "../controllers/user/Pay_add_product.js";
import OrderStatus from "../controllers/user/OrderStatus.js";
import OrderAdminStatus from "../controllers/admin/OrderAdminStatus.js";
import OrderStatusChanged from "../controllers/admin/OrderStatusChanged.js";

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
router.route("/UserInfo").post(Jwt_Can_Valid, UserInfo)  //call user information
router.route("/UpdateUserInfo").post(Jwt_Can_Valid, UpdateUserInfo)  //update user information
router.route("/Pay_add_product").post(Jwt_Can_Valid, Pay_add_product)  //update user information
router.route("/order_status").post(Jwt_Can_Valid, OrderStatus)  //show all Order List of user


// admin route
router.route("/product_add").post(Jwt_Can_Valid, User_Can_Admin, addNewProduct);
router.route("/Order_admin_status").post(Jwt_Can_Valid, User_Can_Admin, OrderAdminStatus);
router.route("/OrderStatusChanged").post(Jwt_Can_Valid, User_Can_Admin, OrderStatusChanged);


export default router  // router use as  UserRouter in ( app.js )