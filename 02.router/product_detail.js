const Router = require('express').Router()
const Controller = require('./../01.controller/product_detail')

Router.get('/',Controller.getallproduct)
Router.get('/:id', Controller.productDetail)


module.exports = Router