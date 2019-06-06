const mongoose = require('mongoose');

const restaurantSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    foods: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: "Food"
        }
],
    image: {
        type: String
    }
});

module.exports = mongoose.model("Restaurant",restaurantSchema);