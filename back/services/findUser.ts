import prisma from "../config/prisma"

const findUser = async (user:any) => {
    if (await prisma.users.findUnique({ where: { email: user.email } }) || await prisma.users.findUnique({ where: { username: user.username } })) {
        
    }
}

export { findUser }