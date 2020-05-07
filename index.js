const express = require('express')
const app = express()
const port = 4000
const productPageRouter = require('./02.router/product_page')
const productDetailRouter = require('./02.router/product_detail')
const cartRouter = require('./02.router/cart')

app.use(express.json())

app.use('/product-page', productPageRouter)
app.use('/product-detail', productDetailRouter)
app.use('/cart', cartRouter)



app.get('/',(req,res)=>{
    res.send('<h1>Welcome 2020</h1>')
})



app.listen(port, ()=>console.log('server run on port '+ port))


// product page
    // get all product
    // add product
    // edit product
    // delete product

// product detail
    // get product where role penjual = a

