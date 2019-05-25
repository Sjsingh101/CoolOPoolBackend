const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const busSchema = new mongoose.Schema({
    src: {
        type: String,
        required: true
    },
     
    dest: {
        type: String,
        required: true
    },
    imageUrl: {
        type: String,
        //required: true
      },
    price: {
        type: Number,
        required: true
    },

    company: {
        type: String
    },
    fileID: {
        type: Schema.Types.ObjectId // There is no need to create references here
      }
});

module.exports = mongoose.model("Bus",busSchema);