import { IUser, IUserDTO, IUserLogin } from "../entities/User"
import { UserRepository } from "../repositories/UserRepository"
import { hash,compare } from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config'

export class UserService {
    private repository: UserRepository
    constructor(repository: UserRepository) {
        this.repository = repository
    }

    async createUser(data:IUserDTO):Promise<IUser>{
        const isUser = await this.repository.findUserByEmail(data.email)
        if(isUser) throw new Error("User already exists")
        
        const user = this.repository.createUser({
            ...data,
            password: await hash(data.password, 6),
            bookings:[]
        })
        return user
    }

    async loginUser(data:IUserLogin){
        const user = await this.repository.findUserByEmail(data.email)
        if(!user) throw new Error("User not found")

        const sucsess = await compare(data.password,user.password)
        if(!sucsess) throw new Error("Invalid password")
        
        const token = jwt.sign(
            {id:user._id},
            process.env.SECRET as string,
            {expiresIn:"10m"}
        )
        return token
    }
}