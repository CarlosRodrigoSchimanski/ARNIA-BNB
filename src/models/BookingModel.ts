import {mongoose} from "../database/database"
import { IBooking } from "../entities/Booking"


// Esquema do Mongoose para a reserva
const bookingSchema = new mongoose.Schema<IBooking>({
    checkin_date: { type: Date, required: true },
    checkout_date: { type: Date, required: true },
    guests: { type: Number, required: true },
    id_room: { type: mongoose.Types.ObjectId, ref: 'Room', required: true },
    id_guest: { type: mongoose.Types.ObjectId, ref: 'Guest', required: true },
    status: { type: String, enum: ["confirmada", "cancelada", "em andamento", "concluída"], default: "em andamento" },
  })
  
  // Exportando o modelo
  export const BookingModel = mongoose.model<IBooking>('bookings', bookingSchema)