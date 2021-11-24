const { Schema, model } = require('mongoose');

// TODO: Please make sure you edit the user model to whatever makes sense in this case
const cocktailSchema = new Schema({
	name: {
		type: String,
		required: true
	},
	alcoholic: {
		type: String
 
	},
	glass: {
		type: String,
	},
    ingredients: {
        type: String,
        required: true,
    },
	instructions:{type:String, required:true},
	
    owner: {type: Schema.Types.ObjectId, ref: "User"},
    
	imgUrl: {
		type: String,
		default:
			'https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg'
	},
    
});

module.exports = model('Cocktail', cocktailSchema);
