import { AsyncHandeler } from "../../utils/AsyncHandeler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js"
import { createStatusCode, commonErrorMassage } from "../../env.js";
import { Product } from "../../models/product.model.js";

const SearchAPI = AsyncHandeler(async (req, res) => {
    try {
        const query = req.query || {};
        const dataString = query.data || "";
        const dataArray = dataString.split(",").map(item => item.trim().toLowerCase()).filter(item => item);

        if (dataArray.length === 0) {
            return res.status(400).send(new ApiError(400, { message: commonErrorMassage }));
        }

        const regexPatterns = dataArray.map(term => new RegExp(term, "i"));
        // Aggregation pipeline
        const products = await Product.aggregate([
            {
                $match: {
                    hastag: { $in: regexPatterns } // Match any product where hastag field contains any of the tags
                }
            },
            {
                $project: {
                    _id: 1,
                    name: 1,
                    Price: 1,
                    product_Volume: 1,
                    store_Volume: 1,
                    img: 1,
                }
            }
        ]);
        // send return
        res
            .status(createStatusCode)
            .json(new ApiResponse(createStatusCode, products))
    }
    catch (error) {
        res
            .status(500)
            .json(new ApiError(500, { message: 'Internal Server Error', error: error.message }));
    }
})
export default SearchAPI