import { AsyncHandeler } from "../../utils/AsyncHandeler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js"
import { createStatusCode } from "../../env.js";
import { User } from "../../models/user.model.js";
import { Product } from "../../models/product.model.js";
import { Order } from "../../models/order.model.js";

const Pay_add_product = AsyncHandeler(async (req, res) => {
    try {
        const id = req.user._id;
        const obj = req.obj;
        const { totalCost, Cart } = obj;

        if (!id) {
            return res.status(404).json(new ApiError(404, { message: 'User not found' }));
        }
        if (!totalCost) {
            return res.status(404).json(new ApiError(404, { message: 'User not found' }));
        }
        if (!Cart) {
            return res.status(404).json(new ApiError(404, { message: 'User not found' }));
        }

        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json(new ApiError(404, { message: 'User not found' }));
        }

        const products = await Product.find({ '_id': { $in: Cart } });
        // Prepare the order products array
        const orderProducts = products.map(product => {
            return {
                product: product._id,  // Reference to the product
                quantity: Cart.filter(id => id === product._id.toString()).length, // Count how many times the product appears in the cart
                price: product.Price, // Use the product price from the product model
            };
        });
        // Create the order
        const newOrder = new Order({
            user_id: id,
            user_details: user._id,
            payAmount: totalCost,
            order_products: orderProducts,
        });
        await newOrder.save();

        // send return
        res
            .status(createStatusCode)
            .json(new ApiResponse(createStatusCode, {}))
    }
    catch (error) {
        res.status(500).json(new ApiError(500, { message: 'Internal Server Error', error: error.message }));
    }
})

export default Pay_add_product