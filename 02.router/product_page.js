const Router = require('express').Router()
const Controller = require('./../01.controller/product_page')

Router.get('/:id',Controller.getStoreProducts)
Router.post('/',Controller.postNewProduct)
Router.patch('/', Controller.editProduct)
Router.delete('/',Controller.deleteProduct)


module.exports = Router