import mongoose, {Schema} from "mongoose";

const userSchema = new Schema({
    name:{
        type: String,  // require
        require: true,
        lowercase: true,
        trim: true,
    },
    email:{
        type: String,  // require
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    Mobile_NO:{
        type: String
    },
    Emerangcy_number:{
        type: String  // extra number
    },
    DOB:{
        type: String
    },
    Maritial_status:{
        type: String
    },
    Gender:{
        type: String
    },
    Ocopation:{
        type: String
    },
    isAdmin:{
        type: Boolean  // just true or false
    },
    avater:{
        type: String  // just take url
    },
    Permanent_location:{
        type: String
    },
    Current_location:{
        type: String
    },
    Montly_income:{
        type: String
    },
    refreshToken:{  //Jwt token can seved here
        type: String
    }
}, {timestamps: true});

// make a Model & export
export const User = mongoose.model("User", userSchema);