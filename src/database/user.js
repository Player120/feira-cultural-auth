const { Schema, model } = require('mongoose')

const userSchema = new Schema({
    email: String,
    password: String,
    role: { type: Number, default: 1 }
}, { timestamps: true })

module.exports = model('usuarios', userSchema)