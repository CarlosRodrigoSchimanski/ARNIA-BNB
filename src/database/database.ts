import 'dotenv/config' // importando variavel de ambiente
import mongoose from "mongoose"

mongoose.connect(process.env.DATABASE_URL as string)

export {mongoose}