const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    price: {
        type: String,
        required: true
    },
    image: {
        type: String
    }
})

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    food: {
        type: [foodSchema]
    },
    image: {
        type: String
    }
});

module.exports = mongoose.model("restaurant",restaurantSchema);