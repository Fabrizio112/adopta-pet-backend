import { compare, genSalt, hash } from "bcrypt"

export const hashPassword = async (pass: string) => {
    const salt = await genSalt()
    const passwordHashed = await hash(pass, salt)
    return passwordHashed
}

export const checkPassword = async (passwordEntered: string, passwordHash: string) => {
    return await compare(passwordEntered, passwordHash)
}