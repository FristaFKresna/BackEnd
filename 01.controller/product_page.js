const db = require('./../03.database/mysql')


const getStoreProducts = (req,res) => {
    const id = req.params.id
    let sql = 'select * from products where store_id = ?;'

    db.query(sql, id, (err,result) => {
        try{
            if(err) throw err
            res.json({
                error : false,
                data : result
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    } )
}


const postNewProduct = (req,res) => {
    const data = req.body

    let sql = 'insert products set ?'
    if(data){
        db.query(sql, data, (err,result)=>{
            try{
                if(err) throw err
                res.json({
                    error : false,
                    message : 'Add New Data Success',
                    data : result
                })
            }catch(err){
                res.json({
                    error : true,
                    message : err.message
                })
            }
        })

    }else{
        res.json({
            error : true,
            message : 'incorrect format'
        })
    }
}


const editProduct = (req,res) => {
    const data = req.body

    let sql = 'update products set ? where id = ?'

    db.query(sql,[data,data.id], (err,result)=>{
        try{
            if(err) throw err
            res.json({
                error : false,
                message : 'Edit Data Success'
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
}


const deleteProduct = (req,res) => {
    const data = req.body

    if(data){
        let sql = ' update products set is_deleted = 1 where id = ?'
        db.query(sql, data.id, (err,result)=>{
            try{
                if(err) throw err
                res.json({
                    error : false,
                    message : 'Delete Success'
                })
            }catch(err){
                res.json({
                    error : true,
                    message : err.message
                })
            }
        })
    }else{
        res.json({
            error : true,
            message : 'incorrect format'
        })
    }
    
}


module.exports = {
    getStoreProducts,
    postNewProduct,
    editProduct,
    deleteProduct
}