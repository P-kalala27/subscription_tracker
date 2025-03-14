import { Request, Response, NextFunction } from "express";

export const restrictToAdmin = (req: Request, res: Response, next: NextFunction) => {
    if (!req.user?.isAdmin) {
        return res.status(403).json({ error: "Unauthorized access" });
    }
    next();
 
}