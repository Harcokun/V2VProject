import mongoose from "mongoose";

const uri: string = "mongodb+srv://adhoc:adhoc@wireless.iqywro9.mongodb.net/?retryWrites=true&w=majority";

const connectDB = async () => {
  const conn = await mongoose.connect(uri)
  console.log(`⚡️[database]: Mongo connected: ${conn.connection.host}`);
}

export { connectDB };