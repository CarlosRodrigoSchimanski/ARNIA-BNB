import mongoose from "mongoose"

export interface IReservas{
    checkin_date: number,
    checkout_date: number,
    gests:number,
    id_room: mongoose.Types.ObjectId,
    id_guest: mongoose.Types.ObjectId
    status: "confirmada" | "cancelada" | "em andamento" | "concluída"
}