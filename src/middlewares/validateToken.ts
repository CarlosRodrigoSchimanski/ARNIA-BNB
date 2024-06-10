import { NextFunction, Request, Response } from "express"
import jwt from "jsonwebtoken"

type TokenPayload = {
    id: string;
}

export async function tokenValidateMiddleware(request: Request, response: Response, next: NextFunction) {
    try {
        const { authorization } = request.headers;

        if (!authorization) {
            return response.status(401).json({ error: "Authorization header is missing" })
        }

        const [, token] = authorization.split(" ")

        if (!token) {
            return response.status(401).json({ error: "Token is missing" })
        }

        const decodedToken = jwt.verify(token, process.env.SECRET as string) as TokenPayload

        // Adicionar o ID decodificado ao corpo da requisição
        //request.body.id = id       não ta funcionando esta merda
        request.user = decodedToken

        next()
    } catch (error) {
        console.error("Error validating token:", error)
        return response.status(401).json({ error: "Invalid token" })
    }
}

