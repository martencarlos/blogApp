
import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local'
  )
}

const dbConnect = async () => {
  console.log("connecting")
  const connection = await mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  return connection
    
}
export default dbConnect



