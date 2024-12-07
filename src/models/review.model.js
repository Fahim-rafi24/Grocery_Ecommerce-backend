import mongoose, {Schema} from "mongoose";

const reviewSchema = new Schema({
    user_id :{
        type: String,
        require: true,
    },
    product_id:{
        type: String,
        require: true
    },
    message:{
        type: String,
        require: true
    }
}, {timestamps: true});

// make a Model & export
export const Review = mongoose.model("Review", reviewSchema);