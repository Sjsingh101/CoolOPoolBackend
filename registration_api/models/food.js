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
            discount:{
                type: Number
            },
            image: {
                type:String
            }
});

module.exports = mongoose.model("Food",foodSchema);