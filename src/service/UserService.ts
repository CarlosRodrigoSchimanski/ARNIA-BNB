import { IUser, IUserDTO } from "../entities/User"
import { UserRepository } from "../repositories/UserRepository"
import { hash } from "bcrypt"

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
}