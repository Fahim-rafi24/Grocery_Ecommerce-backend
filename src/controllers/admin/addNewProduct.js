import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js"
import { commonErrorMassage } from "../../env.js";
import { createStatusCode } from "../../env.js";
import { Product } from "../../models/product.model.js";


const addNewProduct = (req, res) => {
    try {
        const data = req.obj;
        const user = req.user;
        const whoAdded = user._id.toString();
        data.whoAdded = whoAdded;

        // check
        if (!data || !user._id) {
            return res.status(404).send(new ApiError(404, { message: commonErrorMassage }));
        }

        // Create a new product instance
        const newProduct = new Product(data);
        if (!newProduct) {
            return res.status(404).send(new ApiError(404, { message: commonErrorMassage }));
        }
        newProduct.save();
        // send return
        res
            .status(createStatusCode)
            .json(new ApiResponse(createStatusCode, {}))
    } catch (error) {
        res
            .status(500)
            .json(new ApiError(500, { message: 'Internal Server Error', error: error.message }));
    }
}
export { addNewProduct }