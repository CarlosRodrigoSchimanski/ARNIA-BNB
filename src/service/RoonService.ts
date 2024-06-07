import { IReservas } from "../entities/roon"
import { RoonRepository } from "../repositories/roonRepository"

export class RoonService {
    private repository: RoonRepository
    constructor(repository: RoonRepository) {
        this.repository = repository
    }

    async createReserva(data:IReservas){
        const a_reserva = await this.repository.findReservasByRoomId(data)
        if(a_reserva.length > 0){
            throw new Error("Room already booked")
        }
        return this.repository.createReserva(data)
    }

}