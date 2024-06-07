import {mongoose} from "../database/database"
import { IReservas } from "../entities/roon"

const ReservaSchema = new mongoose.Schema<IReservas>({
    checkin_date:Number,
    checkout_date:Number,
    gests:Number,
    id_guest:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    },
    id_room:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Booking"
    },
    status:{
        type:String,
        enum:["confirmada", "cancelada", "em andamento", "concluída"],
        default:"confirmada"
    }
})

export const RoonModel = mongoose.model("reservas",ReservaSchema)