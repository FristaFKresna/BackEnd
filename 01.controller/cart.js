const db = require('./../03.database/mysql')

const listDataCart = (req,res) => {
    let user_id = req.params.id
    let sql = `select c.id as id, p.id as product_id, p.name as name, p.image_url as image, p.stock as stock, p.price as price, c.qty as qty, c.users_id as users_id from carts c 
                join products p on c.products_id = p.id where c.users_id = ?;`

    db.query(sql, user_id, (err, result) => {
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

const deleteDataCart = (req,res) => {
    const id = req.body

    let sql = 'delete from carts where id = ?'
    db.query(sql, id, (err,result) => {
        try{
            if(err) throw err
            res.json({
                error : false,
                message : 'delete success'
            })
        }catch(err){
            res.json({
                error : true,
                message : err.message
            })
        }
    })
}





const checkOutButton = (req,res) => {
    //insert to transaction table and detail table lalu delete cart item
    db.beginTransaction(function(err) {
        if (err) { throw err; }
        let users_id = req.params.id
        let getCartSql = `select c.id as id, p.name as name, p.image_url as image, p.stock as stock, p.price as price, c.qty as qty, c.users_id as users_id, u.username as username from carts c 
                            join products p on c.products_id = p.id
                            join users u on c.users_id = u.id where c.users_id = ?;`
        db.query(getCartSql, users_id, function (error, results, fields) {
          if (error) {
            return db.rollback(function() {
              throw error;
            });
          }
      
        let sqlInsert = 'insert into transaction_status set ?'
        let data = {id : users_id, name : results[0].username }
        db.query(sqlInsert, data, function (error, result_trans_status, fields) {
        if (error) {
            return db.rollback(function() {
            throw error;
            });
        }

        let sqlInsert = 'insert into transaction set ?'
        let data = {transaction_status_id : 1, users_id : results[0].users_id }
        db.query(sqlInsert, data, function (error, resutl_trans, fields) {
        if (error) {
            return db.rollback(function() {
                throw error;
            });
            }

        let sqlInsert = 'insert into detail_transaction set ?'
        let data = {product_name : results.name , product_price : results.price , qty : results.qty , transaction_id : resutl_trans.insertId }
        db.query(sqlInsert, data, function (error, resutl_trans_detail, fields) {
        if (error) {
            return db.rollback(function() {
                throw error;
            }); 
        }

            db.commit(function(err) {
              if (err) {
                return db.rollback(function() {
                  throw err;
                });
              }
              console.log('success!')
              res.json({
                  error : false,
                  message : 'checkout success !'
              });
            });
          });
        });
      });
    });
    });
}


// const checkout = (req,res) => {
//     const id = req.params.id
    
//     let getCartSql = `select c.id as id, p.name as name, p.image_url as image, p.stock as stock, p.price as price, c.qty as qty, c.users_id as users_id, u.username as username from carts c 
//                     join products p on c.products_id = p.id
//                     join users u on c.users_id = u.id where c.users_id = ?;`
//     db.query(getCartSql, (err,result)=>{
//         try{
//             if(err) throw err

//             let sqlinsert = 'insert into transaction_status set ?'
//             db.query(sqlinsert, {id : resulst[0].user_id ,name : result[0].name}, (err,resultStatus)=>{
//                 if(err) throw err

//                 let sqlTrans = 'insert into transaction set ?'
//                 db.query(sqlTrans, {transaction_status_id : resultStatus.insertId, user_id : result[0].user_id}, (err,resultTrans)=>{
//                     if(err) throw err

//                     let sqlDetail = `insert into detail_transaction (product_name, product_price, qty, transaction_id) values `
//                     for(var i = 0; i<result.length; i++){
//                         if(i === result.length - 1){
//                             sqlDetail += `(${result[i].name}, ${result[i].price}, ${result[i].qty}, ${resultTrans.insertId});`
//                         }else{
//                             sqlDetail += `(${result[i].name}, ${result[i].price}, ${result[i].qty}, ${resultTrans.insertId}),`
//                         }
//                     }
//                     db.query(sqlDetail, (err,result) => {
//                         if(err) throw err
                        
//                         let sqlDelete = 'delete from carts where '
//                         for(var i = 0; i<result.length; i++){
//                             if(i === result.length - 1){
//                                 sqlDelete += `id=${result[i].id};`
//                             }else{
//                                 sqlDelete += `id=${result[i].id} & `
//                             }
//                         }
//                         db.query(sqlDelete, (err,resutlDel)=>{
//                             if(err)throw err
//                             res.json({
//                                 error : false,
//                                 message : 'checkout success'
//                             })
//                         })

//                     })
//                 })
//             })

//         }catch(err){
//             res.json({
//                 error : true,
//                 message : err.message
//             })
//         }
//     })
// }







const checkout3 = (req,res)=>{
let users_id = req.params.id
let getCartSql = `select c.id as id, p.name as name, p.image_url as image, p.stock as stock, p.price as price, c.qty as qty, c.users_id as users_id, u.username as username from carts c 
                    join products p on c.products_id = p.id
                    join users u on c.users_id = u.id where c.users_id = ?;`
db.query(getCartSql, users_id,(err,result)=>{
    try{
        if(err) throw err

            db.beginTransaction(function(err) {
                if (err) { throw err; }
                db.query('INSERT INTO transaction_status ?', {id : users_id, name : result[0].username}, function (error, results, fields) {
                if (err) throw err
                console.log('masuk')
                    
                
            
                // var log = 'Post ' + results.insertId + ' added';
            
                // connection.query('INSERT INTO log SET data=?', log, function (error, results, fields) {
                //     if (error) {
                //     return connection.rollback(function() {
                //         throw error;
                //     });
                //     }
                //     connection.commit(function(err) {
                //     if (err) {
                //         return connection.rollback(function() {
                //         throw err;
                //         });
                //     }
                //     console.log('success!');
                //     });
                // });
                });
            });


    }catch(err){
        res.json({
            error : true,
            message : err.message
        })
    }
})
}




module.exports = {
    listDataCart,
    deleteDataCart,
    checkOutButton,
    // checkout
    checkout3
}


