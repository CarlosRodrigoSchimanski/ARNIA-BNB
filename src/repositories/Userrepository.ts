import mongoose from 'mongoose'
import { IUser } from '../entities/User'

export class UserRepository{
    private userModel:mongoose.Model<IUser>
    constructor(userModel:mongoose.Model<IUser>){
        this.userModel = userModel
    }

    async findUserByEmail(email:string){
        return this.userModel.findOne({email:email})
    }

    async createUser(data:IUser): Promise<IUser>{
        return this.userModel.create(data)
    }
}