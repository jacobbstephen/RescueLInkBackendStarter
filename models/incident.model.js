const mongoose = require('mongoose');

const incidentSchema = mongoose.Schema({
    latitude: {
        type:String,
        trim: true,
        required: true,
    },

    longitude: {
        required: true,
        type:String,
        trim: true,
    },

    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'users',
        required: [true, 'User is required']
    },

    filePath: {
        type: String,
        required: [true, 'Path is required']
    },


})


const incidentModel = mongoose.model('incident-reporting', incidentSchema);
module.exports = incidentModel;