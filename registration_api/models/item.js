const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
    item_id: {
        type: String,
        required: true
    },
     
    name: {
        type: String,
        required: true
    },

    desc: {
        type: String
    },

    price: {
        type: Number,
        required: true
    },

    discount: {
        type: Number
    },

    image: {
        type: String
    }

});

module.exports = mongoose.model("Item",itemSchema);