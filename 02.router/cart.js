const Router = require('express').Router()
const Controller = require('./../01.controller/cart')

Router.get('/:id', Controller.listDataCart)
Router.delete('/', Controller.deleteDataCart)
Router.post('/:id/checkout', Controller.checkOutButton)
Router.post('/:id/checkout3',Controller.checkout3)


module.exports=Router