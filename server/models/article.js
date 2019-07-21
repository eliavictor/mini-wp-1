const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const articleSchema = new Schema({
    img: {
        type: String,
        required: [true, 'Please input article\'s image']
    },
    title: {
        type: String,
        required: [true, 'Please input article\'s title']
    },
    body: {
        type: String,
        required: [true, 'Please input article\'s body']
    },
    tags: [{
        type: String,
        required: [true, 'Please input article\'s tag']
    }],
    userId: {
        type: Schema.Types.ObjectId,
        ref : "Users"
    }
}, {timestamps : true});

const Articles = mongoose.model('Articles', articleSchema);
module.exports = Articles