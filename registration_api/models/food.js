const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
            name: {
                type: String,
                required: true
            },
            cost:{
                type: Number,
                required: true
            },
            image: String,
            discount: Number
});

module.exports = mongoose.model("food",foodSchema);