const db = require('./../03.database/mysql')



const getallproduct = (req,res) => {
    let sql = `select p.id as id, p.store_id as store_id, u.id as users_id, name, price, image_url, stock, description, store_name, location, username from products p 
                join store s on p.store_id = s.id
                join users u on s.users_id = u.id;`

    db.query(sql, (err, result)=>{
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
    })
}


const productDetail = (req,res) => {
    const id = req.params.id
    let sql = `select p.id as id, p.store_id as store_id, u.id as users_id, name, price, image_url, stock, description, store_name, location, username from products p 
                join store s on p.store_id = s.id
                join users u on s.users_id = u.id
                where p.id = ?;`

    db.query(sql, id, (err,result) => {
        try{
            if(err) throw err
            res.json({
                error :false,
                data : result
            })
        }catch(err){
            res.json({
                error : true,
                message: err.message
            })
        }
    })
}



module.exports = {
    getallproduct,
    productDetail,

}