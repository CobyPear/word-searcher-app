# WORD SEARCHER | Full-stack app with MongoDB

## MVP

```pseudocode
WHEN a user loads our application, THEN we ask for their name
WHEN a user submits their name, THEN they are presented with a field in which they can search for a word.
WHEN a user submits their name, their name is added to the database and the backend passes a singed JWT to the frontend.
WHEN the frontend recieves the signed JWT, THEN we can store the JWT in session storage with the user's name and the user's name is displayed on the screen.
WHEN the user has a JWT, they are able to submit a word.
WHEN a user submits a word, THEN the word is associated with their name in the database.
WHEN a user submits a word, THEN our we proxy an API call to a 3rd party api, and the user gets back information about that word.
WHEN a user submits a word and their JWT is expired or missing, THEN we ask for their name again.
```

## SCHEMA

``` javascript
WordSchema: {
    word: string
}

UserSchema {
    name: string,
	words: [WordSchema]
}
```

## API

### WordsAPI

We can test endpoints with cURL!

```curl
curl -X GET \
'https://wordsapiv1.p.rapidapi.com/words/test' \
-H 'x-rapiapi-host: wordsapiv1.p.rapidapi.com' \
-H 'x-rapidapi-key: ****************************************'
```

`GET https://wordsapiv1.p.rapidapi.com/words/{WORD}`

get all fields from a word search

### JWT

stands for JSON Web Token

```javascript
const jwt = require('jsonwebtoken')

const generateToken = id => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: '30d'
    })
}

export default generateToken
```

### Authentication Middleware

```javascript
const jwt = require('jsonwebtoken')
const user = require('../models/userModel.js')


const protect = async (req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            req.user = await User.findById(decoded.id)

            next()
        } catch (error) {
            console.log(error)
            res.status(401)
            throw new Error('Not authorized, token failed')
        }
    }

    if (!token) {
        res.status(401)
        throw new Error('Not authorized, no token')
    }
}
```

```javascript
// @desc     Register new user
// @route    POST /api/users/
// @access   Public
const registerUser = async (req, res) => {
    const { name, email, password } = req.body

    const userExists = await User.findOne({ email })

    if (userExists) {
        res.status(400)
        throw new Error('User already exists')
    }

    const user = await User.create({
        name,
        email,
    })

    if (user) {
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
    } else {
        res.status(400)
        throw new Error('Invalid email or password')
    }
}
```

