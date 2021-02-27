import mongoose from 'mongoose'


const wordSchema = mongoose.Schema({
    word: String
}, {
    timestamps: true
})

const userSchema = mongoose.Schema({
    name: {
        type: String,
        unique: "Name Already Exists"
    },
    words: [wordSchema]
}, {
    timestamps: true
})

const User = mongoose.model('User', userSchema)

export default User