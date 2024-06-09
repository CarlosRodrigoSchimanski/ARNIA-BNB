import mongoose from 'mongoose'
import { IUser } from '../entities/User'

export class UserRepository {
    private userModel: mongoose.Model<IUser>

    constructor(userModel: mongoose.Model<IUser>) {
        this.userModel = userModel
    }

    async getUserByEmail(email: string){
        try {
            return await this.userModel.findOne({ email: email }).exec()
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

    // Adicione métodos adicionais conforme necessário, como updateUser, deleteUser, etc.
}
