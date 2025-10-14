const mongoose = require('mongoose')

async function startConnection () {
    await mongoose.connect(process.env.DATABASE_URI)
}

async function closeConnection () {
    await mongoose.disconnect()
}

module.exports = {
    startConnection, closeConnection
}