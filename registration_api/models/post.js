const mongoose = require('mongoose'),
      Schema = mongoose.Schema;
    
const postSchema = Schema({
    days: [
            {
                description: {
                    type: String,
                },
                images: {
                    type: Buffer,
                }
            }
    ],
    tripDate: {
        type: Date,
    },
    tripDescription: {
        type: String,
    },
    tripTitle:{
        type: String
    }
});

module.exports = mongoose.model('Post',postSchema);