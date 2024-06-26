import {mongoose} from "../database/database"
import { IBoss } from "../entities/Boss"

const BossSchema = new mongoose.Schema<IBoss>({
    email:{
        type:String,
        required:true
    },
    password:{
        type:String,
        required:true
    }
})

export const BossModel = mongoose.model<IBoss>("boss",BossSchema)