import { NextFunction, Request, Response } from "express"

export async function consoleLog(request: Request, response: Response, next: NextFunction) {
    console.log("=== Incoming Request ===")
    console.log("URL:", request.originalUrl)
    console.log("Method:", request.method)

    if (Object.keys(request.body).length > 0) {
        console.log("Body:", request.body)
    }

    if (Object.keys(request.params).length > 0) {
        console.log("Params:", request.params)
    }

    if (Object.keys(request.query).length > 0) {
        console.log("Query:", request.query)
    }

    console.log("Headers:", request.headers)
    console.log("========================")
    next()
}