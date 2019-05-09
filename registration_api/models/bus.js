const mongoose = require('mongoose');

const busSchema = new mongoose.Schema({
    src: {
        type: String,
        required: true
    },
     
    dest: {
        type: String,
        required: true
    },

    price: {
        type: Number,
        required: true
    },

    company: {
        type: String
    },

    // image: {
    //     type: String
    // }

});

module.exports = mongoose.model("Bus",busSchema);