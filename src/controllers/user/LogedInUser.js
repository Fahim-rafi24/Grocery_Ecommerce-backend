import { AsyncHandeler } from "../../utils/AsyncHandeler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js"
import { createStatusCode, Options_For_Cookie } from "../../env.js";



const LogedInUser = AsyncHandeler(async (req, res) => {
    try {
        const user = req.user;
        const accessToken = req.accessToken;

        // send return
        res
            .cookie("accessToken", accessToken, Options_For_Cookie)
            .status(createStatusCode)
            .json(new ApiResponse(createStatusCode, user))
    }
    catch (error) {
        res
            .status(500)
            .json(new ApiError(500, { message: 'Internal Server Error', error: error.message }));
    }
})

export default LogedInUser