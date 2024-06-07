import {NextFunction,Request,Response} from "express"
import jwt from "jsonwebtoken"

type JwtPayload = {
    id: string
}

export async function tokenValidateMiddlleware(request:Request, response:Response, next:NextFunction){
    const {authorization} = request.headers
    
    if(!authorization){
        return response.status(401).json({message:"Unauthorized"})
    }

    const [,token] = authorization.split(" ")
    
    
    
    try {
        const {id} = jwt.verify(token, process.env.SECRET as string) as JwtPayload
        request.body = {
            _id:id,
            ...request.body
        }
    } catch (error:any) {
        return response.status(401).json({error:error.message})
    }

    next()
}
