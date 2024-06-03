import { BossRepository } from "../repositories/BossRepository"
import { hash,compare } from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config'
import { IBoss } from "../entities/Boss"

export class BossService {
    private repository: BossRepository
    constructor(repository: BossRepository) {
        this.repository = repository
    }

    async createBoss(data:IBoss):Promise<IBoss>{
        const isUser = await this.repository.findBossByEmail(data.email)
        if(isUser) throw new Error("User already exists")
        
        const boss = this.repository.createBoss({
            ...data,
            password: await hash(data.password, 6)
        })
        return boss
    }

    async loginBoss(data:IBoss){
        const boss = await this.repository.findBossByEmail(data.email)
        if(!boss) throw new Error("User not found")

        const sucsess = await compare(data.password,boss.password)
        if(!sucsess) throw new Error("Invalid password")
        
        const token = jwt.sign(
            {id:boss._id},
            process.env.SECRET as string,
            {expiresIn:"10m"}
        )
        return token
    }
}