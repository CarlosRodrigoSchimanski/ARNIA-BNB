import mongoose from 'mongoose'
import { IBoss } from '../entities/Boss'

export class BossRepository{
    private userModel:mongoose.Model<IBoss>
    constructor(userModel:mongoose.Model<IBoss>){
        this.userModel = userModel
    }

    async findBossByEmail(email:string){
        return this.userModel.findOne({email:email})
    }

    async createBoss(data:IBoss): Promise<IBoss>{
        return this.userModel.create(data)
    }

    async findById(id:string){
        return this.userModel.findById(id)
    }
}