"use strict";

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(source, true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(source).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

var express = require('express');

var bodyParser = require('body-parser');

var mongoose = require('mongoose');

var Product = require('./models/Product');

mongoose.connect('mongodb+srv://zitoune05:zitoune05@cluster0.ocrqz.gcp.mongodb.net/<dbname>?retryWrites=true&w=majority', {
  useNewUrlParser: true,
  useUnifiedTopology: true
}).then(function () {
  return console.log('Connexion à MongoDB réussie !');
})["catch"](function () {
  return console.log('Connexion à MongoDB échouée !');
});
var app = express();
app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content, Accept, Content-Type, Authorization');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, PATCH, OPTIONS');
  next();
});
app.use(bodyParser.json());
app.post('/api/products', function (req, res, next) {
  var product = new Product(_objectSpread({}, req.body));
  product.save().then(function () {
    return res.status(201).json({
      product: product
    });
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
});
app.get('/api/products/:id', function (req, res, next) {
  Product.findOne({
    _id: req.params.id
  }).then(function (product) {
    return res.status(200).json({
      product: product
    });
  })["catch"](function (error) {
    return res.status(404).json({
      error: error
    });
  });
});
app.put('/api/products/:id', function (req, res, next) {
  Product.updateOne({
    _id: req.params.id
  }, _objectSpread({}, req.body, {
    _id: req.params.id
  })).then(function () {
    return res.status(200).json({
      message: 'Modified!'
    });
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
});
app["delete"]('/api/products/:id', function (req, res, next) {
  Product.deleteOne({
    _id: req.params.id
  }).then(function () {
    return res.status(200).json({
      message: 'Deleted !'
    });
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
});
app.get('/api/products', function (req, res, next) {
  Product.find().then(function (products) {
    return res.status(200).json({
      products: products
    });
  })["catch"](function (error) {
    return res.status(400).json({
      error: error
    });
  });
});
module.exports = app;