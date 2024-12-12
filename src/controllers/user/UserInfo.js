import { AsyncHandeler } from "../../utils/AsyncHandeler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js"
import { createStatusCode } from "../../env.js";



const UserInfo = AsyncHandeler(async (req, res) => {
    try {
        const user = req.user;
        const obj = req.obj;

        // send return
        res
            .status(createStatusCode)
            .json(new ApiResponse(createStatusCode, user))
    }
    catch (error) {
        res
            .status(500)
            .json(new ApiError(500, { message: 'Internal Server Error', error: error.message }));
    }
})

export default UserInfo