const mongoose= require('mongoose');

const contactSchema= new mongoose.Schema({
    name: {
        type: String,
        required: [true, "Name is required."]
    },
    email: {
        type: String,
        required: [true, "Email is required."]
    },
    text: {
        type: String   
    }
})

const contactModel= mongoose.model('contacts', contactSchema);

module.exports= contactModel;