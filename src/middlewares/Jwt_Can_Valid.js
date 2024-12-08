import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import jwt from "jsonwebtoken";
// import { create_accessJwt } from "./function/create_accessJwt.js";
import { commonErrorMassage } from "../env.js";


// inline function
const decode = (token, tokenName, secretKey) => {
    try {
        const decoded = jwt.verify(token, secretKey);
        return decoded;
    } catch (err) {
        return res.status(400).send(new ApiError(400, { message: commonErrorMassage }));
    }
};

// Middleware to check both access and refresh tokens is valid
const Jwt_Can_Valid = async (req, res, next) => {
    try {

        const data = req.body;  // this data can take = {id , obj};
        const accessToken = req.cookies.accessToken;
        if (!accessToken) {
            return res.status(400).send(new ApiError(400, { message: commonErrorMassage }));
        }
        if (!data || !data.id) {
            return res.status(400).send(new ApiError(400, { message: commonErrorMassage }));
        }
        const _id = data.id;
        const user = await User.findById({ _id });
        if (!user) {
            return res.status(404).send(new ApiError(404, { message: commonErrorMassage }));
        }
        const refreshToken = user.refreshToken;

        // Decode refresh token
        try {
            const decodedRefreshToken = decode(refreshToken, "refresh", process.env.JWT_REFRESH_TOKEN_KEY);
            const decodedAccessToken = decode(accessToken, "access", process.env.JWT_ACCESS_TOKEN_KEY);

            if (decodedAccessToken._id === decodedRefreshToken._id) {

                // return & pass in next
                req.user = user;
                req.obj = data.obj;
                next();
            } else {
                return res.status(404).send(new ApiError(404, { message: commonErrorMassage }));
            }
        } catch (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).send(new ApiError(401, { message: 'Token has expired' }));
            } else if (err.name === 'JsonWebTokenError') {
                return res.status(401).send(new ApiError(401, { message: 'Invalid token' }));
            } else {
                return res.status(500).send(new ApiError(500, { message: 'Internal server error' }));
            }
        }
    } catch (error) {
        return res.status(400).send(new ApiError(400, { message: commonErrorMassage }));
    }
}

export { Jwt_Can_Valid } // it's a custome middleware