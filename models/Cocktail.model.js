const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const cocktailSchema = new Schema({
	name: {
		type: String,
		required: true
// maybe add a unique name requirement here
	},
	alcholic: {
		type: Boolean, 
        required: true
	},
	glass: {
		type: String,
	},
    ingredients: {
        type: [{type: String}],
        required: true,
    },
    owner: {type: Schema.Types.ObjectId, ref: 'User'},
    
    //image:
    
});

module.exports = model('User', cocktailSchema);


