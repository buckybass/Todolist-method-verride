const mongoose = require('mongoose')

const schema = new mongoose.Schema({
    text: {
        type: String,
        required: true
    },
    done: {
        type: Boolean,
        default: false
    }
})

module.exports = mongoose.model('List', schema)