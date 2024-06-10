import mongoose from 'mongoose'
import { IUser } from '../entities/User'

export class UserRepository {
    private userModel: mongoose.Model<IUser>

    constructor(userModel: mongoose.Model<IUser>) {
        this.userModel = userModel
    }

    async getUserByEmail(email: string): Promise<IUser | null> {
        try {
            return await this.userModel.findOne({ email }).exec()
        } catch (error) {
            throw new Error(`Error finding user by email: ${error}`)
        }
    }

    async createUser(userData: IUser): Promise<IUser> {
        try {
            return await this.userModel.create(userData)
        } catch (error) {
            throw new Error(`Error creating user: ${error}`)
        }
    }

    async findById(id: mongoose.Types.ObjectId): Promise<IUser | null> {
        try {
            return await this.userModel.findById(id).exec()
        } catch (error) {
            throw new Error(`Error finding user by ID: ${error}`)
        }
    }

    async addBookingToUser(userId: mongoose.Types.ObjectId, bookingId: mongoose.Types.ObjectId): Promise<void> {
        try {
            await this.userModel.updateOne(
                { _id: userId },
                { $push: { bookings: bookingId } }
            ).exec()
        } catch (error) {
            throw new Error(`Error adding booking to user: ${error}`)
        }
    }

    async listUserBookings(userId: mongoose.Types.ObjectId): Promise<IUser | null> {
        try {
            return await this.userModel.findById(userId).populate('bookings').exec()
        } catch (error) {
            throw new Error(`Error listing user bookings: ${error}`)
        }
    }

    async removeBookingFromUser(userId: mongoose.Types.ObjectId, bookingId: mongoose.Types.ObjectId): Promise<void> {
        try {
            await this.userModel.updateOne(
                { _id: userId },
                { $pull: { bookings: bookingId } }
            ).exec()
        } catch (error) {
            throw new Error(`Error removing booking from user: ${error}`)
        }
    }
}
