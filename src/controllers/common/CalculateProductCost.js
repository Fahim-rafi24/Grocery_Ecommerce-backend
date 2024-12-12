import { AsyncHandeler } from "../../utils/AsyncHandeler.js";
import { ApiError } from "../../utils/ApiError.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import mongoose from "mongoose";
import { Product } from "../../models/product.model.js";
import { createStatusCode, commonErrorMassage } from "../../env.js";

const CalculateProductCost = AsyncHandeler(async (req, res) => {
    try {
        const productIds = req.body.productIds || [];

        if (!Array.isArray(productIds)) {
            return res.status(400).send(new ApiError(400, { message: commonErrorMassage }));
        }

        const uniqueIds = [...new Set(productIds)];
        const products = await Product.find({ _id: { $in: uniqueIds } });

        const idCountMap = productIds.reduce((acc, id) => {
            acc[id] = (acc[id] || 0) + 1;
            return acc;
        }, {});

        // Calculate total cost based on occurrences
        const totalCost = products.reduce((total, product) => {
            const count = idCountMap[product._id.toString()] || 0;
            return total + product.Price * count;
        }, 0);

        // return
        res
            .status(createStatusCode)
            .json(new ApiResponse(createStatusCode, totalCost))
    }
    catch (error) {
        console.log(error)
        res
            .status(500)
            .json(new ApiError(500, { message: 'Internal Server Error', error: error.message }));
    }
})
export default CalculateProductCost;