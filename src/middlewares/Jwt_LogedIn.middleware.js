import { commonErrorMassage } from "../env.js";
import { User } from "../models/user.model.js";
import { ApiError } from "../utils/ApiError.js";
import { create_accessJwt } from "./function/create_accessJwt.js";

// Middleware to generate only an access token
const Jwt_LogedIn_Midd = async (req, res, next) => {
    try {
        // email
        const { email } = req.body;

        // Validate required fields
        if (!email) {
            return res.status(400).send(new ApiError(400, { message: commonErrorMassage }));
        };

        // Check if the user already exists
        const tergetedUser = await User.findOne({ email });

        if (!tergetedUser) {
            return res.status(400).send(new ApiError(400, { message: commonErrorMassage }));
        }

        // make access token
        const accessToken = await create_accessJwt(tergetedUser._id);

        req.user = tergetedUser;
        req.accessToken = accessToken;
        next();
    } catch (error) {
        return res.status(400).send(new ApiError(400, { message: commonErrorMassage }));
    }
}

export { Jwt_LogedIn_Midd } // it's a custome middleware