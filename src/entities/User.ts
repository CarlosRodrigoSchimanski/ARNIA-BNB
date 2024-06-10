import mongoose from "mongoose"

export interface IUser{
    _id?: mongoose.Types.ObjectId
    name: string
    email: string
    password: string
    cpf: number
    phone_number: string
    bookings:mongoose.Schema.Types.ObjectId[]
}

export interface IUserDTO{
    name: string
    email: string
    password: string
    cpf: number
    phone_number: string
}

export interface IUserLogin{
    email: string
    password: string
}