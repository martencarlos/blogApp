
import mongoose from 'mongoose'

const MONGO_URI = process.env.MONGO_URI

if (!MONGO_URI) {
  throw new Error(
    'Please define the MONGO_URI environment variable inside .env.local'
  )
}

const dbConnect = async () => {
  console.log("connecting")
  // mongoose.set('strictQuery', false)
  mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true }).then((res) => {
    console.log("connected")
    return res
  }).catch((err) => {
    console.log("error connecting")
    throw new Error(err)
  }
  )
    
}
export default dbConnect



