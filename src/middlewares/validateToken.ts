import { NextFunction, Request, Response } from "express"
import jwt, { JwtPayload } from "jsonwebtoken"

type TokenPayload = {
    id: string;
};

export async function tokenValidateMiddleware(request: Request, response: Response, next: NextFunction) {
    try {
        const { authorization } = request.headers

        if (!authorization) {
            return response.status(401).json({ error: "Authorization header is missing" })
        }

        const [, token] = authorization.split(" ")

        if (!token) {
            return response.status(401).json({ error: "Token is missing" })
        }

        const decodedToken = jwt.verify(token, process.env.SECRET as string) as TokenPayload

        request.body = {
            _id: decodedToken.id,
            ...request.body,
        };

        next()
    } catch (error) {
        console.error("Error validating token:", error)
        return response.status(401).json({ error: "Invalid token" })
    }
}
