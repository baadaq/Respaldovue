import db from "../config/database.js";


export const getUserAuth = (Email,Password,result) =>{
    db.query("SELECT * From users WHERE Email=? AND Password=? ",[Email,Password],(err,results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });
}

export const getUserById = (Id, result) => {
        db.query("SELECT * FROM users WHERE Id = ?", [Id], (err, results) => {         
         
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results[0]);
            }
        });   
    }

export const getUsersAll = (result) =>{
    db.query("SELECT * FROM users",(err,results)=>{
        if(err){
            console.log(err);
            result(err,null);
            
        } else {
            result(null, results);
        }
    })
}