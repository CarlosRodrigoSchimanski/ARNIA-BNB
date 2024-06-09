import { IUser, IUserDTO, IUserLogin } from "../entities/User"
import { UserRepository } from "../repositories/UserRepository"
import { hash, compare } from "bcrypt"
import jwt from "jsonwebtoken"
import 'dotenv/config'

export class UserService {
    private repository: UserRepository
    constructor(repository: UserRepository) {
        this.repository = repository
    }

    async createUser(userData: IUserDTO): Promise<IUser> {
        try {
            const existingUser = await this.repository.getUserByEmail(userData.email)
            if (existingUser) {
                throw new Error("User already exists")
            }

            const hashedPassword = await hash(userData.password, 6)
            const user = await this.repository.createUser({ ...userData, password: hashedPassword, bookings: [] })
            return user
        } catch (error:any) {
            throw new Error(`Error creating user: ${error.message}`)
        }
    }

    async loginUser(loginData: IUserLogin): Promise<string> {
        try {
            const user = await this.repository.getUserByEmail(loginData.email)
            if (!user) {
                throw new Error("User not found")
            }

            const passwordMatch = await compare(loginData.password, user.password)
            if (!passwordMatch) {
                throw new Error("Invalid password")
            }
            
            const token = jwt.sign({id:user._id},process.env.SECRET as string,{ expiresIn: "10m" })
            return token
        } catch (error:any) {
            throw new Error(`Error logging in: ${error.message}`)
        }
    }
}