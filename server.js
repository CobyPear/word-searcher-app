import express from 'express'
import dotenv from 'dotenv'
import logger from 'morgan'
import mongoose from 'mongoose'

dotenv.config()

const PORT = process.env.PORT || 8080
const app = express()

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('client'));

mongoose.connect('mongodb://localhost/worddb', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useFindAndModify: false
});



import routes from './routes/index.js'

app.use('/api', routes)


app.listen(PORT, console.log(`Server running on port ${PORT}`))