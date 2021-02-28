import User from '../models/index.js'
import generateToken from '../utils/generateToken.js'
import axios from 'axios'

// POST /api/user
const addUser = async (req, res) => {
    // take a user name and add it to the database
    // also going to send back a signed jwt
    // const { name } = req.body

    console.log(req.body)

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
const getAllUsers = async (req, res) => {
    // get all users and associated words to display
    try {
        const allUsers = await User.find({})
    
        if (allUsers) {
            res.status(200).json(allUsers)
        }
    } catch (error) {
        res.status(400).json(error)
    }
}

// GET /api/word
const searchWord = async (req, res) => {
    // check if the user has a singed and unexpired JWT
    // if they do, proxy an api call to WordAPI 
    // Otherwise, we'll tell them to login please.

    const { word } = req.body

    try {
        // proxy api call to this route: GET /https://wordsapiv1.p.rapidapi.com/words/{WORD}
        const options = {
            method: 'GET',
            url: `https://wordsapiv1.p.rapidapi.com/words/${word}`,
            headers: {
                'x-rapidapi-key': process.env.WORDSAPI_KEY,
                'x-rapidapi-host': 'wordsapiv1.p.rapidapi.com',
            }
        }

        const { data } = await axios.request(options)

        if (data) {
            res.status(200).json(data)
        }
        
    } catch (error) {
        res.status(400).json(error)
    }



}



export {
    addUser,
    getAllUsers,
    searchWord
}