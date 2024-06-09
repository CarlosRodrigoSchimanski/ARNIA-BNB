import mongoose from 'mongoose'
import { IBoss } from '../entities/Boss'


export class BossRepository {
    private model: mongoose.Model<IBoss>;

    constructor(model: mongoose.Model<IBoss>) {
        this.model = model;
    }

    async findByEmail(email: string){
        try {
            return await this.model.findOne({ email }).exec();
        } catch (error) {
            throw new Error(`Error finding boss by email: ${error}`);
        }
    }

    async create(data: IBoss): Promise<IBoss> {
        try {
            return await this.model.create(data);
        } catch (error) {
            throw new Error(`Error creating boss: ${error}`);
        }
    }

    async findById(id: string): Promise<IBoss | null> {
        try {
            return await this.model.findById(id).exec();
        } catch (error) {
            throw new Error(`Error finding boss by ID: ${error}`);
        }
    }
}
