"use strict";
// import {model, Model, Schema} from 'mongoose'
// import {compare, hash} from 'bcrypt'
// interface IUser {
//     // customId: string
//     username: string
//     email: string
//     password: string
//     sets: any[]
//     sessions: string[]
// }
// interface UserMethods {
//     isValidPassword: (password: string) => Promise<boolean>
// }
// type UserModel = Model<IUser, {}, UserMethods>
// const userSchema = new Schema<IUser, UserModel, UserMethods>({
//     _id:{
//         type: String,
//         unique: true,
//         required: true,
//         default: () => uuidv4()
//     },
//     username: {
//         type: String,
//         unique: true,
//     },
//     email: {
//         type: String,
//         required: true,
//         unique: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     sets: {
//         type: [Schema.Types.ObjectId],
//         ref: 'sets'
//     },
//     sessions: {
//         type: [String],
//     }
// })
// userSchema.pre("save", async function (next) {
//     this.password = await hash(this.password, 10)
//     // this.customId = uuidv4()
//     next()
// })
// userSchema.method("isValidPassword", async function (password: string): Promise<boolean> {
//     return await compare(password, this.password);
// })
// export const User = model<IUser, UserModel>('users', userSchema)
