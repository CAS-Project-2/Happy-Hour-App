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
    owner: {
		type: Schema.Types.ObjectId, ref: 'User'
	},
    
	imgUrl: {
		type: String,
		default:
			'https://images.unsplash.com/photo-1513694203232-719a280e022f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=749&q=80'
	},
    
});

module.exports = model('User', cocktailSchema);


