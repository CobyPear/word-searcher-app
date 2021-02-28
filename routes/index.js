import express from 'express'
const router = express.Router()
import { addUser, getAllUsers, searchWord } from '../controllers/index.js'
import  protect from '../middleware/authMiddleware.js'

// POST /api/user
// take a user name and add it to the database
// also going to send back a signed jwt

//GET /api/user
// get all users and associated words to display
router.route('/user')
    .get(getAllUsers)
    .post(addUser)


// GET /api/word
// check if the user has a singed and unexpired JWT
// if they do, proxy an api call to WordAPI 
// Otherwise, we'll tell them to login please.
router.route('/word')
    .post(protect, searchWord)




export default router