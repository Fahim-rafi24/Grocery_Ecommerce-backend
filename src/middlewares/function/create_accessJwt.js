import jwt from "jsonwebtoken";

const create_accessJwt = async(id) => {
    const accessToken = jwt.sign(
        // payload
        {
            _id: id,
        },
        // secret
        process.env.JWT_ACCESS_TOKEN_KEY,
        // token expiry date
        {expiresIn: process.env.JWT_REFRESH_TOKEN_TIME}
    );
    return accessToken;
}
export { create_accessJwt }