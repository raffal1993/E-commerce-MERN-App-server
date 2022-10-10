import { NextFunction, Request, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";

export const verifyToken = (
      req: Request,
      res: Response,
      next: NextFunction
) => {
      const authHeader = req.headers.token as string | undefined;

      if (!authHeader)
            return res.status(401).json("You are not authenticated!");

      const token = authHeader.replace("Bearer ", "");
      jwt.verify(token, process.env.JWT_SECRET_KEY!, (err, user) => {
            if (err) return res.status(403).json("Token is not valid!");
            if (user) {
                  (req.user as string | JwtPayload) = user;
                  next();
            }
      });
};

export const verifyTokenAndAuthorization = (
      req: Request,
      res: Response,
      next: NextFunction
) => {
      verifyToken(req, res, () => {
            const { user } = req;

            if (!user) return res.status(404).json("user not found");

            if (user.id === req.params.id || user.isAdmin) {
                  next();
            } else {
                  res.status(403).json("You are not allowed to do that!");
            }
      });
};

export const verifyTokenAndAdmin = (
      req: Request,
      res: Response,
      next: NextFunction
) => {
      verifyToken(req, res, () => {
            const { user } = req;

            if (!user) return res.status(404).json("user not found");

            if (user.isAdmin) {
                  next();
            } else {
                  res.status(403).json("You are not allowed to do that!");
            }
      });
};
