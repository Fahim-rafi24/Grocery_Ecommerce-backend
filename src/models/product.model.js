import mongoose, {Schema} from "mongoose"

const productSchema = new Schema({
    name:{
        type: String,
        require: true,
        trim: true
    },
    product_Volume:{
        type: String,
        require: true,
        trim: true
    },
    store_Volume:{
        type: Number,
        require: true,
    },
    isPopular:{
        type: Boolean,
        require: true,
    },
    img:{
        type: String,  // take url
        require: true,
    },
    Industry:{
        type: String,
        require: true,
    },
    Catagory:{
        type: String,
        require: true,
    },
    SubCatagory:{
        type: String,
        require: true,
    },
    hastag: {
        type: [String], // Correct syntax for an array of strings
        lowercase: true,
        require: true
    }
}, {timestamps: true});

// make a Model & export
export const Product = mongoose.model("Product", productSchema);