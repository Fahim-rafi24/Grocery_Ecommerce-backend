import { AsyncHandeler } from "../../utils/AsyncHandeler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js"
import { createStatusCode } from "../../env.js";
import { User } from "../../models/user.model.js";



const UpdateUserInfo = AsyncHandeler(async (req, res) => {
    try {
        const _id = req.user._id;
        const obj = req.obj;

        const updatedUser = await User.findByIdAndUpdate(
            _id, // Search criteria
            { $set: obj },   // Update fields or add new ones
            { new: true, upsert: true } // Options: return the updated document & create if not found
        );
        
        if (!updatedUser) {
            return res.status(404).json({ message: "User not found." });
        }

        // send return
        res
            .status(createStatusCode)
            .json(new ApiResponse(createStatusCode, updatedUser))
    }
    catch (error) {
        res
            .status(500)
            .json(new ApiError(500, { message: 'Internal Server Error', error: error.message }));
    }
})

export default UpdateUserInfo