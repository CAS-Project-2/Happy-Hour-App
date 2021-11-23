const { Schema, model } = require('mongoose');

const favoritesSchema = new Schema({
    favourites: [{
        favId: {type: String},
       // mediaType: {type: String}
    }]
})

module.exports = model('Favorites', userSchema);