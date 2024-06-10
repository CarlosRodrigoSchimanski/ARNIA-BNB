import mongoose from "mongoose"

export interface IBedroom{
  _id?: mongoose.Types.ObjectId
  number:number
  type:string
  guest_capacity:number
  daily_rate:number
  photo:string
  status:string
}