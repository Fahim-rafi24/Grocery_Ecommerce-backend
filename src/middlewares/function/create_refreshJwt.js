import jwt from "jsonwebtoken";

const create_refreshJwt = async(id, email) => {
    const refreshToken = jwt.sign(
        // payload
        {
            _id: id,
            email: email
        },
        // secret
        process.env.JWT_REFRESH_TOKEN_KEY,
        // token expiry date
        {expiresIn: process.env.JWT_REFRESH_TOKEN_TIME}
    );
    return refreshToken;
}
export { create_refreshJwt }