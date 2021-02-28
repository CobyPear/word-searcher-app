import jwt from 'jsonwebtoken'
import User from '../models/index.js'

const protect = async(req, res, next) => {
    let token

    if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
        try {
            token = req.headers.authorization.split(' ')[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)

            const foundUser = await User.findById(decoded.id)
            if (foundUser) {
                next()
            }

                // if you want to use express sessions, you can use this line
                // req.user = await User.findById(decoded.id)

        } catch (error) {
            console.log(error)
            res.status(res.statusCode).json({
                message: 'Not authorized, token failed',
                error: error
            })
        }
    }

    if (!token) {
        res.status(401).json('Not authorized, no token')
    }
}

export default protect