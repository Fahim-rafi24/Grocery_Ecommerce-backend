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
        type: mongoose.Schema.Types.ObjectId, // This will store the ObjectId of the user
        ref: 'User', // Reference to the 'User' model
        required: true, // Ensure user details are populated
    },
    payAmount: {
        type: String,
        require: true
    },
    order_products: [subSchema]
}, { timestamps: true });

// make a Model & export
export const Order = mongoose.model("Order", orderSchema);