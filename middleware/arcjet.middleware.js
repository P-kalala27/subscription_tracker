import aj from "../config/arcjet.js";

const arcjetMiddleware = async (req, res, next) => {
    try {
        const decision = await aj.protect(req);

        if(decision.isDenied) {
            if(decision.reason.isRateLimit()) {
                return res.status(429).json({
                    success: false,
                    error: "Too many requests, please try again later"
                })
            }

            if(decision.reason.isBot()) {
                return res.status(403).json({
                    success: false,
                    error: "Access denied, bot detected"
                })
            }
            return res.status(403).json({
                success: false,
                error: "Access denied"
            })
        }

        next();
    } catch (error) {
        console.log(`Error during arcjet middleware: ${error}`);
        next(error);
    }
}

export default arcjetMiddleware;
