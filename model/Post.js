const mongoose = require('mongoose');
const postSchema = new mongoose.Schema({
    title:{
        type: String,
        required: true,
        min: 6
    },
    description:{
        type: String,
        required: true,
        min: 6
    }
});
module.exports = mongoose.model('Post', postSchema);