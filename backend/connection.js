import mysql from 'mysql2'

let mysqlConnection = mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'SH@zain1',
    database:'userdb'
})

 mysqlConnection.connect((err)=>{
    if(err){
        console.log(`failed to connect with db: ${err} ` )
    }else{
        console.log('db connected')
    }
})

export default mysqlConnection