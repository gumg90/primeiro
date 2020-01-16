const mongoose = require('mongoose');
const pointSchema = require('./utils/pointSchema');
const DevSchema = new mongoose.Schema({
    github_user: String,
    name: String,
    bio: String,
    avatar_url: String,
    techs: [String],
    location: {
        type: pointSchema,
        index: '2dsphere'
    }

});

module.exports = mongoose.model('dev', DevSchema);