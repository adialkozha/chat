import { compare } from 'bcrypt'
export const comparePassword = async (userPassword:string, currentPassword:string) => {
    return await compare(currentPassword,userPassword)
}