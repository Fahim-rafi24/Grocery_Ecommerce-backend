import { AsyncHandeler } from "../../utils/AsyncHandeler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js"
import { createStatusCode } from "../../env.js";
import { Product } from "../../models/product.model.js";
import mongoose from "mongoose";

const IsHome = AsyncHandeler(async (req, res) => {
    try {
        const count = req.body || []; // here give filtered product _id

        // Convert strings to ObjectId (if your IDs are stored as ObjectIds in the database)
        const excludedIds = count?.filtered_product?.length
            ? count?.filtered_product?.map((id) => new mongoose.Types.ObjectId(id))  // convert _id string to full product obj
            : []  // if any data can't exisit

        const randomProducts = await Product.aggregate([
            {
                $match: { _id: { $nin: excludedIds } } // Exclude products with IDs in excludedIds
            },
            {
                $sample: { size: 12 } // Randomly select 10 products
            },
            {
                $project: { _id:1, name:1, Price:1, product_Volume:1, store_Volume:1, img:1}
            }
        ]);

        if (randomProducts.length === 0) {
            return res
                .status(createStatusCode)
                .json(new ApiResponse(createStatusCode, []))
        }

        // return
        res
            .status(createStatusCode)
            .json(new ApiResponse(createStatusCode, randomProducts))
    }
    catch (error) {
        console.log(error)
        res
            .status(500)
            .json(new ApiError(500, { message: 'Internal Server Error', error: error.message }));
    }
})
export default IsHome;