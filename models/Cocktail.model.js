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
			'https://images.unsplash.com/photo-151369420https://cdn11.bigcommerce.com/s-cznxq08r7/images/stencil/1280x1280/products/2624/6412/recipe-cocktail-shaker__06069.1590770492.jpg?c=13232-719a280e022f?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=749&q=80'
	}
    
});

module.exports = model('Cocktail', cocktailSchema);


