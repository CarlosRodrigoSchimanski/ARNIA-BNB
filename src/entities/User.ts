import mongoose from "mongoose"

export interface Iuser{
    name: string
    email: string
    password: string
    cpf: number
    phone_number: string
    bookings:mongoose.Schema.Types.ObjectId[]
}

export interface IuserDTO{
    name: string
    email: string
    password: string
    cpf: number
    phone_number: string
}