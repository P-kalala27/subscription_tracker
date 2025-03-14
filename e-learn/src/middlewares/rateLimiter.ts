import rateLimit from "express-rate-limit";

export const apiLimit = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // limit each IP to 100 requests per windowMs
    message: "Too many requests, please try again later.",  // error message
    standardHeaders:true, // standard headers
    legacyHeaders:false
})