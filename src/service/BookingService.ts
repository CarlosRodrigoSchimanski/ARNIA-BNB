import { BookingRepository } from "../repositories/BookingRepository"
import { IBooking } from "../entities/Booking"
import { BossService } from "./BossService"
import { rm} from "fs/promises"
import { join } from "path"

export class BookingService {
    private repository: BookingRepository
    constructor(repository: BookingRepository) {
        this.repository = repository
    }

    async destroyImage(id:string){
        const imagePath = join(__dirname,"..","..", "uploads", id)
        await rm(imagePath)
    }

    async createBooking(data:IBooking,boss:BossService,id:string){
        const isBooking = await this.repository.findBookingByNumber(data.number)
        if(isBooking) {
            this.destroyImage(data.photo)
            throw new Error("booking already exists") 
        }
        const isboss = await boss.findById(id)
        if(!isboss) {
            this.destroyImage(data.photo)
            throw new Error("user Unauthorized")
        }
        const booking = this.repository.createBooking({...data})
        return booking
    }

}