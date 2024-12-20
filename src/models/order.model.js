import mongoose, { Schema } from "mongoose";

// subSchema
const subSchema = new Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId, // Reference to the Product model
        ref: "Product", // Reference to the 'Product' model
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    },
    price: {
        type: String,
        required: true,
    },
});

// main Schema
const orderSchema = new Schema({
    // order identifide with order auto create _id
    user_id: {
        type: String,
        require: true,
    },
    user_details: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    order_status: {
        type: String,
        enum: ['Pending', 'Delivery', 'Cancel'],
        default: 'Pending',
        required: true,
    },
    payAmount: {
        type: String,
        require: true
    },
    order_products: [subSchema]
}, { timestamps: true });

// make a Model & export
export const Order = mongoose.model("Order", orderSchema);