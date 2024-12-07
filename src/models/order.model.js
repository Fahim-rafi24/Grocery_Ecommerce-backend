import mongoose, { Schema } from "mongoose";



// subSchema
const subSchema = new Schema({
    item_id: {
        type: String,
        require: true
    },
    item_name: {
        type: String,
        require: true
    },
    item_volume: {
        type: Number,
        require: true
    },
    item_price: {
        type: Number,
        require: true
    },
    item_img: {
        type: String,  // take just link
        require: true
    },
    item_info: {
        type: String,
        require: true
    },
});


// main Schema
const orderSchema = new Schema({
    // order identifide with order auto create _id
    user_id: {
        type: String,
        require: true,
    },
    order_products: [subSchema]
}, { timestamps: true });

// make a Model & export
export const Order = mongoose.model("Order", orderSchema);