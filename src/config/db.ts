import mongoose from "mongoose"

export const connectDB = async () => {
    try {
        const connection = await mongoose.connect(process.env.MONGODB_URI)
        const url = `${connection.connection.host}:${connection.connection.port}`
        console.log(`MongoDB Conectado en :${url}`)
    } catch (error) {
        console.error(error)
    }
}