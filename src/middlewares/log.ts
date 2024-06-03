import {NextFunction,Request,Response} from "express"

export async function consolLog(request:Request, response:Response, next:NextFunction){
    console.log("url:", request.originalUrl)
    console.log("method:", request.method)
    console.log("body:", request.body)
    console.log("params:",request.params)
    console.log("query:",request.query)
    console.log("header:", request.headers)
    console.log("##########################")
    next()
}