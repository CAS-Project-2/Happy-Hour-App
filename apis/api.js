const axios = require("axios");
class Api {
  constructor(baseURL, id) {
    (this.baseURL = baseURL || process.env.API_URL),
      (this.api = axios.create({
        baseURL: this.baseURL,
      }));
  }
  // CHANGE THE PATHS ACCORIDNG TO API DOCUEMNTATION
  getByLetter = (letter) => this.api.get(`/search.php?f=${letter}`)
  getRandom = ()=> this.api.get(`/random.php`)
  getById = (id)=> this.api.get(`/lookup.php?i=${id}`).then(response=> response.data.drinks[0])
  getByLiquor = (liquor)=> this.api.get(`/filter.php?i=${liquor}`)
  getGlassList =()=>this.api.get(`/list.php?g=list`)
  
  filterByGlass = (glass)=> this.api.get(`/filter.php?g=${glass}`)
  getByNonAlcoholic =()=>this.api.get(`/filter.php?a=Non_Alcoholic`)



}

module.exports = new Api();