import { BookingRepository } from "../repositories/BookingRepository"
import { IBooking } from "../entities/Booking"
import { BossService } from "./BossService"

export class BookingService {
    private repository: BookingRepository
    constructor(repository: BookingRepository) {
        this.repository = repository
    }

    async createBooking(data:IBooking,boss:BossService,id:string):Promise<IBooking>{
        const isBooking = await this.repository.findBookingByNumber(data.number)
        if(isBooking) throw new Error("Booking already exists")
        const isboss = await boss.findById(id)
        if(!isboss) throw new Error("user Unauthorized")
            console.log(isboss)
        const booking = this.repository.createBooking({...data})
        return booking
    }

}