import mongoose from 'mongoose'
import { IBedroom } from '../entities/Bedroom'

export class BedroomRepository {
    private bedroomModel: mongoose.Model<IBedroom>

    constructor(bedroomModel: mongoose.Model<IBedroom>) {
        this.bedroomModel = bedroomModel
    }

    async findRoomByNumber(number: number): Promise<IBedroom | null> {
        return this.bedroomModel.findOne({ number: number })
    }

    async createRoom(data: IBedroom): Promise<IBedroom> {
        return this.bedroomModel.create(data)
    }

    async updateRoomStatus(number: number, status: string): Promise<void> {
        await this.bedroomModel.updateOne({ number: number }, { status: status })
    }

    async getAllRoomsByStatus(status: string): Promise<IBedroom[]> {
        return this.bedroomModel.find({ status: status }).exec()
    }
}