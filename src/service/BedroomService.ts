import { IBedroom } from "../entities/Bedroom"
import { BedroomRepository } from "../repositories/BedroonRepository"
import { BookingService } from "./BookingService"
import { BossService } from "./BossService"
import { rm } from "fs/promises"
import { join } from "path"

export class BedroomService {
    private repository: BedroomRepository
    constructor(repository: BedroomRepository) {
        this.repository = repository
    }

    async deleteImage(id: string) {
        try {
            const imagePath = join(__dirname, "..", "uploads", id)
            await rm(imagePath)
        } catch (error) {
            console.error("Error deleting image:", error)
            throw new Error("Failed to delete image")
        }
    }

    async addRoom(data: IBedroom, boss: BossService, bossId: string) {
        const existingRoom = await this.repository.findRoomByNumber(data.number)
        if (existingRoom) {
            throw new Error("Room already exists")
        }

        const isBossAuthorized = await boss.findById(bossId)
        if (!isBossAuthorized) {
            throw new Error("User Unauthorized")
        }

        const newRoom = await this.repository.createRoom(data)
        return newRoom
    }

    async updateRoomStatus(roomNumber: number, status: string, boss: BossService, bossId: string) {
        const existingRoom = await this.repository.findRoomByNumber(roomNumber)
        if (!existingRoom) {
            throw new Error("Room not found")
        }

        const isBossAuthorized = await boss.findById(bossId)
        if (!isBossAuthorized) {
            throw new Error("User Unauthorized")
        }

        await this.repository.updateRoomStatus(roomNumber, status)
    }

    async getFreeRooms() {
        return this.repository.getAllRoomsByStatus("disponível")
    }

    async getFreeRoomsByDate(date: Date, bookingService: BookingService) {
        const occupiedRoomIds = await bookingService.occupiedRoomIdsByDate(date)
        return this.repository.findRoomsNotInList(occupiedRoomIds)
    }
}
