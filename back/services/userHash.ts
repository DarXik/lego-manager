import { compare, hash } from 'bcrypt'


const hashPassword = async (userPassword: string) => {
    const password = await hash(userPassword, 4)

    return password
}

const verifyPassword = async (userPassword: string, hashedPassword: string) => {
    const isValid = await compare(userPassword, hashedPassword)
    console.log("password: ",isValid)
    return isValid
}


export { hashPassword, verifyPassword }