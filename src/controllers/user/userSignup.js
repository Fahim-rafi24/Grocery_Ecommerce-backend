import { AsyncHandeler } from "../../utils/AsyncHandeler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js"
import { createStatusCode } from "../../env.js";
import { commonErrorMassage } from "../../env.js";
import { User } from "../../models/user.model.js";
import { create_accessJwt } from "../../middlewares/function/create_accessJwt.js";
import { create_refreshJwt } from "../../middlewares/function/create_refreshJwt.js";
import { Options_For_Cookie } from "../../env.js";

// infile middleware for access & refress Token
const genarateAccessAndRefressToken = async (userID) => {
    try {
        // serch user from DB
        const user = await User.findById(userID);
        if (!user) {
            throw new ApiError(404, 'User not found');
        }

        // genarete token
        const accessToken = await create_accessJwt(user._id, user.email);
        const refreshToken = await create_refreshJwt(user._id, user.email);

        // save refreshToken in DB
        user.refreshToken = refreshToken;
        await user.save({ validateBeforeSave: false });  // validateBeforeSave can off validation mongoose

        // return token
        return { accessToken, refreshToken };

    } catch (error) {
        throw new ApiError(500, "Something went worng to genarate Jwt tokens...");
    }
};

// add new user
const userSignup = AsyncHandeler(async (req, res) => {
    try {
        const { name, email } = req.body;

        // Validate required fields
        if (!name || !email) {
            return res.status(400).send(new ApiError(400, { message: commonErrorMassage }));
        };

        // Check if the user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).send(new ApiError(400, { message: 'User already exists' }));
        }
        // Create a new user instance
        const newUser = new User({ name, email });

        // Save the user to the database
        await newUser.save();

        // create Jwt token
        const { accessToken, refreshToken } = await genarateAccessAndRefressToken(newUser._id);  // genarateAccessAndRefressToken

        // await newUser.save();

        // send return
        res
            .cookie("accessToken", accessToken, Options_For_Cookie)
            .cookie("refreshToken", refreshToken, Options_For_Cookie)
            .status(createStatusCode)
            .json(new ApiResponse(createStatusCode, {}))
    }
    catch (error) {
        res
            .status(500)
            .json(new ApiError(500, { message: 'Internal Server Error', error: error.message }));
    }
})

export default userSignup