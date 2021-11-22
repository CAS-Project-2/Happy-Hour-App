const axios = require("axios");
class Api {
  constructor(baseURL, id) { //baseUrl could be overwritten in the route that uses the API
    this.baseURL = baseURL || process.env.API_URL,
    

    this.api = axios.create(
      {
        baseURL: this.baseURL
      }
    )
  }
  // CHANGE THE PATHS ACCORIDNG TO API DOCUEMNTATION
  getByLetter = (letter) => this.api.get(`/search.php?f=${letter}`)
  getRandom = ()=> this.api.get(`/random.php`)
  getById = (id)=> this.api.get(`/lookup.php?i=${id}`)
  getByLiquor = (liquor)=> this.api.get(`/filter.php?i=${liquor}`)
  getGlassList =(glass)=>this.api.get(`/list.php?g=list`)
  filterByGlass = (glass)=> this.api.get(`/filter.php?g=${glass}`)
  getByNonAlcoholic =()=>this.api.get(`/filter.php?a=Non_Alcoholic`)


  //createOne = (newEntityValues)=>this.api.post("/", newEntityValues)
  //deleteOne = (id)=> this.api.delete(`/${id}`)
  //updateOne = (id)=> this.api.put(`/${id}`)
  // etc...
}

module.exports = new Api;

//const liquors = Set() // An array that does not repeat elements

