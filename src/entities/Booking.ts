import mongoose from "mongoose"

export interface IBooking {
  _id: mongoose.Types.ObjectId
  checkin_date: Date
  checkout_date: Date
  guests: number
  id_room: mongoose.Schema.Types.ObjectId
  id_guest: mongoose.Schema.Types.ObjectId
  status: "confirmada" | "cancelada" | "em andamento" | "concluída"
}