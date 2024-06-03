import mongoose from "mongoose"

export interface IUser{
    name: string
    email: string
    password: string
    cpf: number
    phone_number: string
    bookings:string[]
}

export interface IUserDTO{
    name: string
    email: string
    password: string
    cpf: number
    phone_number: string
}