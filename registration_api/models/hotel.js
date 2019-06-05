const mongoose = require('mongoose');

const hotelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    transport: [
        {
            dest: String
        }
    ]
});

module.exports = mongoose.model("hotel",hotelSchema);
