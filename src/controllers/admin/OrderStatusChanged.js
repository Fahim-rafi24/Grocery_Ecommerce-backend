import { AsyncHandeler } from "../../utils/AsyncHandeler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js"
import { createStatusCode } from "../../env.js";
// import { User } from "../../models/user.model.js";
import { Order } from "../../models/order.model.js";
import mongoose from "mongoose";


const OrderStatusChanged = AsyncHandeler(async (req, res) => {
    try {
        const { state, _id } = req.obj;

        const validStates = ['Pending', 'Delivery', 'Cancel'];
        if (!validStates.includes(state)) {
            return res.status(400).json({ message: "Invalid order status value" });
        }

        const updatedOrder = await Order.findByIdAndUpdate(
            _id,
            { $set: { "order_status": state } },
            { new: true }
        );
        console.log(updatedOrder);

        if (!updatedOrder) {
            return res.status(404).json({ message: "Order not found" });
        }

        // send return
        res
            .status(createStatusCode)
            .json(new ApiResponse(createStatusCode, {status: "success"}))
    }
    catch (error) {
        res
            .status(500)
            .json(new ApiError(500, { message: 'Internal Server Error', error: error.message }));
    }
})

export default OrderStatusChanged