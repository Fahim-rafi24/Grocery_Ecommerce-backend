import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
// import jwt from "jsonwebtoken";
// import { create_accessJwt } from "./function/create_accessJwt.js";
import { commonErrorMassage } from "../env.js";


// Middleware to check can user is Admin
const User_Can_Admin = async (req, res, next) => {
    try {
        const user = req.user;
        // check can user is Admin or not
        if (user.isAdmin) {
            next();
        }
        else {
            return res.status(404).send(new ApiError(404, { message: commonErrorMassage }));
        }
    } catch (error) {
        return res.status(404).send(new ApiError(404, { message: commonErrorMassage }));
    }
};
export { User_Can_Admin };