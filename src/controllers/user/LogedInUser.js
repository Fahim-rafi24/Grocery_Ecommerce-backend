import { AsyncHandeler } from "../../utils/AsyncHandeler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js"
import { createStatusCode } from "../../env.js";
import { commonErrorMassage } from "../../env.js"
import { User } from "../../models/user.model.js"


const LogedInUser = AsyncHandeler(async (req, res) => {
    try {
        const { email } = req.body;

        // Validate required fields
        if (!email) {
            return res.status(400).send(new ApiError(400, { message: commonErrorMassage }));
        };

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        // send return
        res
            .status(createStatusCode)
            .json(new ApiResponse(createStatusCode, existingUser))
    }
    catch (error) {
        res
            .status(500)
            .json(new ApiError(500, { message: 'Internal Server Error', error: error.message }));
    }
})

export default LogedInUser