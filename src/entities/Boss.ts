import mongoose from "mongoose"

export interface IBoss{
    _id?: mongoose.Types.ObjectId
    email:string
    password:string
}