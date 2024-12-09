import { AsyncHandeler } from "../../utils/AsyncHandeler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js"
import { createStatusCode } from "../../env.js";
import { Product } from "../../models/product.model.js";

const IsPopuler = AsyncHandeler(async (req, res) => {
    try {
        const popularProducts = await Product.find(
            { isPopular: true },  // search by
            {_id:1, name:1, Price:1, product_Volume:1, store_Volume:1, img:1}  // give those data of an obj
        );

        // return
        res
            .status(createStatusCode)
            .json(new ApiResponse(createStatusCode, popularProducts))
    }
    catch (error) {
        res
            .status(500)
            .json(new ApiError(500, { message: 'Internal Server Error', error: error.message }));
    }
})
export default IsPopuler;