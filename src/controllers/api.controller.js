import { AsyncHandeler } from "../utils/AsyncHandeler.js"

const api = AsyncHandeler(async (req, res) => {
    res
    .status(200)
    // .send("API Server is Ready for Work")
    .json([{message:"API Server is Ready for Work"}]);
})

export default api