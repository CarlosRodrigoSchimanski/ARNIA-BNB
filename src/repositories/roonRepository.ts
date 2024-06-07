import mongoose from 'mongoose'
import { IReservas } from '../entities/roon'

export class RoonRepository{
    private roonModel:mongoose.Model<IReservas>
    constructor(roonModel:mongoose.Model<IReservas>){
        this.roonModel = roonModel
    }

    async findById(id:string){
        return this.roonModel.findById(id)
    }

    async findAll(){
        return this.roonModel.find().exec()
    }
    // procurar se alguma reserva tem o id_room igual e se tiver ver se a data de inicio maior que a de inicio e menor que a de termino e a de termino maior que a de inicio e menos que a de termino
    async findReservasByRoomId(reserva:IReservas){
        return this.roonModel.find({
            id_room:reserva.id_room,
            status:{$in:['confirmada', 'em andamento']},
            $or: [
                { checkin_date: { $lt: reserva.checkout_date }, checkout_date: { $gt:reserva.checkin_date}}
            ]
        })
    }

    async createReserva(data:IReservas): Promise<IReservas>{
        return this.roonModel.create(data)
    }
}