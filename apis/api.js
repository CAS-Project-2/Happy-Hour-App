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
  getAll = () => this.api.get(`/search.php?f=a`)
  getRandom = ()=> this.api.get(`/random.php`)
  getById = (id)=> this.api.get(`/lookup.php?i=${id}`)
  getByIngredient = (ingredient)=> this.api.get(`/filter.php?i=${ingredient}`)

 // getOne = (id)=> this.api.get(`/${id}`)
  //createOne = (newEntityValues)=>this.api.post("/", newEntityValues)
  //deleteOne = (id)=> this.api.delete(`/${id}`)
  //updateOne = (id)=> this.api.put(`/${id}`)
  // etc...
}

module.exports = new Api;


