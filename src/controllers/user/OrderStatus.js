import { AsyncHandeler } from "../../utils/AsyncHandeler.js";
import { ApiResponse } from "../../utils/ApiResponse.js";
import { ApiError } from "../../utils/ApiError.js"
import { createStatusCode } from "../../env.js";
// import { User } from "../../models/user.model.js";
import { Order } from "../../models/order.model.js";



const OrderStatus = AsyncHandeler(async (req, res) => {
    try {
        const _id = req.user._id;
        const obj = req.obj;

        const ordersList = await Order.aggregate([
            {
                $match: {
                    user_id: _id.toString(), // Match orders where user_id matches the provided _id
                },
            },
            {
                $lookup: {
                    from: 'users', // Collection name for the User model
                    localField: 'user_details',
                    foreignField: '_id',
                    as: 'userDetails', // Populate user details
                },
            },
            {
                $unwind: {
                    path: '$userDetails',
                    preserveNullAndEmptyArrays: true, // Handle cases where userDetails might not exist
                },
            },
            {
                $lookup: {
                    from: 'products', // Collection name for the Product model
                    localField: 'order_products.product',
                    foreignField: '_id',
                    as: 'productDetails', // Populate product details for each product
                },
            },
            {
                $addFields: {
                    order_products: {
                        $map: {
                            input: '$order_products',
                            as: 'orderProduct',
                            in: {
                                quantity: '$$orderProduct.quantity',
                                price: '$$orderProduct.price',
                                product: {
                                    $arrayElemAt: [
                                        {
                                            $filter: {
                                                input: '$productDetails',
                                                as: 'product',
                                                cond: { $eq: ['$$product._id', '$$orderProduct.product'] },
                                            },
                                        },
                                        0,
                                    ],
                                },
                            },
                        },
                    },
                },
            },
            {
                $project: {
                    userDetails: {
                        _id: 1,
                        name: 1,
                        email: 1,
                        // Mobile_NO: 1,
                        // Emerangcy_number: 1,
                        // Gender: 1,
                        // avater: 1,
                        // Permanent_location: 1,
                        // Current_location: 1,
                    },
                    order_products: {
                        quantity: 1,
                        price: 1,
                        product: {
                            _id: 1,
                            name: 1,
                            Price: 1,
                            img: 1,
                        },
                    },
                    payAmount: 1,
                    order_status: 1,
                    createdAt: 1,
                    updatedAt: 1,
                },
            },
        ]);

        // send return
        res
            .status(createStatusCode)
            .json(new ApiResponse(createStatusCode, ordersList))
    }
    catch (error) {
        res
            .status(500)
            .json(new ApiError(500, { message: 'Internal Server Error', error: error.message }));
    }
})

export default OrderStatus