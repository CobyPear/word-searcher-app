import express from 'express'
import dotenv from 'dotenv'
import logger from 'morgan'

dotenv.config()

const PORT = process.env.PORT || 8080
const app = express()

mongoose.connect( process.env.MONGO_URI || "mongodb://localhost/worddb", {
  useNewUrlParser: true,
  useFindAndModify: false
});


app.listen(PORT, console.log(`Server running on port ${PORT}`))