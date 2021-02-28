import User from '../models/index.js'
import generateToken from '../utils/generateToken.js'

// POST /api/user
const addUser = async (req, res) => {
    // take a user name and add it to the database
    // also going to send back a signed jwt
    const { name } = req.body

    try {
        const user = await User.create({ name: name })
    
        if (user) {
            res.status(201).json({
                _id: user._id,
                name: user.name,
                token: generateToken(user._id)
            })
        } else {
            res.status(400).json('User Not Created')
        }


    } catch (error) {
        res.status(400).json(error)
    }

}

//GET /api/user
const getAllUsers = (req, res) => {
    // get all users and associated words to display
    res.json('hello')
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