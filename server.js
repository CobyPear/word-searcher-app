import express from 'express'
import dotenv from 'dotenv'
import logger from 'morgan'

dotenv.config()

const PORT = process.env.PORT || 8080
const app = express()


app.listen(PORT, console.log(`Server running on port ${PORT}`))