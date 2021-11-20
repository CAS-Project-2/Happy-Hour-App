var express = require('express');
var router = express.Router();

const User = require("../models/User.model")
const Api = require("../apis/api")

/* GET home page. */
router.get('/', (req, res)=> {
  User.find().then((users)=>
  res.render('index', { title: 'Express', users})
  )
});

/* GET from API */
router.get('/api', (req, res)=> {
  Api.getAll().then((entity)=>
  res.render('index', { title: 'Express', users: entity})
);
});

/* GET login page */
router.get('/login', (req, res)=> {
  User.getAll().then((users)=>
  res.render('login-form', { title: 'Log In', users})
  )});

module.exports = router;
