import { mongoose } from "../database/database"
import { IBedroom } from "../entities/Bedroom"

const BedroomSchema = new mongoose.Schema<IBedroom>({
    number: { type: Number, required: true },
    type: { type: String, required: true },
    guest_capacity: { type: Number, required: true, min: 1 },
    daily_rate: { type: Number, required: true, min: 0 },
    photo: { type: String, required: true },
    status: {
        type: String,
        required: true,
        enum: ['disponível', 'ocupado', 'em manutenção'],
        default: 'disponível'
    }
})

export const BedroomModel = mongoose.model("bedRoom", BedroomSchema)
