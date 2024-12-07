import { AsyncHandeler } from "../../utils/AsyncHandeler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js"
import { createStatusCode } from "../../env.js";
import { commonErrorMassage } from "../../env.js"
import {User} from "../../models/user.model.js"


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

        console.log("existingUser",existingUser);
        // Create a new user instance
        const newUser = new User({ name, email });
        console.log("newUser",newUser);

        // Save the user to the database
        await newUser.save();

        // send return
        res
            .status(createStatusCode)
            .json(new ApiResponse(createStatusCode, {}))
    }
    catch (error) {
        console.log(error)
        res
            .status(500)
        // .json(new ApiError(500, { message: 'Internal Server Error', error: error.message }));
    }
})

export default userSignup