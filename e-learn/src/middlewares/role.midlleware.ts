import { Request, Response, NextFunction } from "express";


export const restrictToRoles = (...allowedRoles: string[]) => {
    return (req: Request & { user?: { role: string } }, res: Response, next: NextFunction) => {
        const userRole = req.user?.role;
        if (!userRole || !allowedRoles.includes(userRole)) {
            return res.status(403).json({ error: "Role not allowed" });
        }
        next();
    }
}





