import User from '../models/index.js'

//GET /api/user
const getAllUsers = (req, res) => {
    // get all users and associated words to display
    res.json('hello')
}

// POST /api/user
const addUser = (req, res) => {
    // take a user name and add it to the database
    // also going to send back a signed jwt

}
// GET /api/word
const searchWord = (req, res) => {
    // check if the user has a singed and unexpired JWT
    // if they do, proxy an api call to WordAPI 
    // Otherwise, we'll tell them to login please.

}



export {
    addUser,
    getAllUsers,
    searchWord
}