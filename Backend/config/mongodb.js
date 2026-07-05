import mongoose from "mongoose"


const conectDb = async () => {
    if (!process.env.MONGODB) {
        console.warn("⚠️ Warning: MONGODB connection string is not defined in your .env file. Database connection skipped.");
        return;
    }
    mongoose.connection.on('connected', () => { console.log("mongodb connected") })
    await mongoose.connect(`${process.env.MONGODB}/srinu`)
}
export default conectDb