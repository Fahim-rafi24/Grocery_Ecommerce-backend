import { AsyncHandeler } from "../../utils/AsyncHandeler.js";
// import {AsyncHandeler} from "../../utils/"
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Product } from "../../models/product.model.js";
import { createStatusCode } from "../../env.js";

const IsCard_IsFav = AsyncHandeler(async (req, res) => {
    try {
        const count = req.body.arr || [];

        const products = await Product.find({ _id: { $in: count } }).select({_id:1, name:1, Price:1, product_Volume:1, store_Volume:1, img:1});;

        if (products.length === 0) {
            return res
                .status(createStatusCode)
                .json(new ApiResponse(createStatusCode, []))
        }

        // return
        res
            .status(createStatusCode)
            .json(new ApiResponse(createStatusCode, products))
    }
    catch (error) {
        console.log(error)
        res
            .status(500)
            .json(new ApiError(500, { message: 'Internal Server Error', error: error.message }));
    }
})
export default IsCard_IsFav;