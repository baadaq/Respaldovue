// import connection
import db from "../config/database.js";
import nodemailer from "nodemailer";
 
// Get All Inventory with added empty field to push

export const getRequest = (result) => {
    db.query("SELECT CODIGO, MATERIAL, STOCK, 0 Cantidad  FROM `inventory`"
, (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}



// Not implemented yet
/*
export const getRequestbyUser = (Usuario, result) => {
        db.query("SELECT * FROM request r, requestItems WHERE Codigo = ?", [Usuario], (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results[0]);
            }
        });   
    }
*/
    // get the id of last inserted
export const lastInsertId = (result)=>{
     db.query("SELECT Max(id) from `request`"
, (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
// Create request 

export const createRequest = (data, result) => {
    



    db.query("INSERT INTO `request` SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
                const msg ={
                    from:"virginiosiia@gmail.com",
                    to:"javmunozm@gmail.com",
                    subject: "Solicitud",
                    text:"Usuario :"+data.Usuario+" Realizo Solicitud con Fecha: "+data.Fecha_Solicitud+" con Id:"+results.insertId
                }
                const transporter =()=> nodemailer.createTransport({
                    service:'gmail',
                    auth:{
                        user:"virginiosiia@gmail.com",
                        pass:"ngnbhncnasvihecv",
                    },
                    port: 465,
                    host:'smtp.gmail.com'
                })
                .sendMail(msg, (err)=>{
                    if(err){
                        return console.log('Error',err);
                    }
                    else{
                        return console.log('Email enviado');
                    }
                })
                console.log(results.insertId);
                transporter();
        }
    });   
}


// Create Request Items 
export const createRequestItems = (data, result) =>{
    db.query("INSERT INTO requestItems SET ?",[data],(err, results)=>{
        if(err){
            console.log(err);
            result(err,null);
        } else {
            result(null, results);
        }
    })
}

 // SOlO tabla request
export const getRequestList = (result) => {
    db.query("SELECT * FROM `request` where Estado= ?",0,(err, results)=>{
        if(err){
            console.log(err);
            result(err,null);
        } else {
            result(null, results);
        }
    })
}

export const getRequestListAlmost = (result) => {
    db.query("SELECT Id,Usuario,Fecha_Solicitud,Fecha_Entrega,UserDelivery,Signature,CommentDelivery   FROM `request`  WHERE Estado= ?",1,(err, results)=>{
        if(err){
            console.log(err);
            result(err,null);
        } else {
            result(null, results);
        }
    })
}
export const getRequestListComplete = (result) => {
    db.query("SELECT Id,Usuario,Fecha_Solicitud,Fecha_Entrega,UserDelivery,Signature,CommentDelivery   FROM `request`  WHERE Estado= ?",2,(err, results)=>{
        if(err){
            console.log(err);
            result(err,null);
        } else {
            result(null, results);
        }
    })
}

export const getRequestItems = (Id,result) => {
     db.query("SELECT r.*, i.MATERIAL FROM `requestItems` r, inventory i WHERE r.Codigo_Item=i.CODIGO AND r.Id_Request = ?", [Id], (err, results) => {             
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                }
            });   
}

export const getRequestItemsDefault = (result) => {
     db.query("SELECT r.*, i.MATERIAL FROM `requestItems` r, inventory i WHERE r.Codigo_Item=i.CODIGO ", (err, results) => {             
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                }
            });   
}

export const getAllItems = (Id_Request, result) => {
        db.query("SELECT ri.*,(i.STOCK-i.STOCKMINIMO) as Disponible FROM requestItems ri, inventory i WHERE ri.Codigo_Item=i.CODIGO  AND ri.Id_Request = ?", [Id_Request], (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });   
    }
 

    export const updateRequest = (data, Id, result) => {
            db.query("UPDATE `request` SET Fecha_Entrega = ?,CommentDelivery = ?, Estado = ? WHERE Id=?", 
            [data.Fecha_Entrega,data.CommentDelivery, data.Estado, Id], (err, results) => {             
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                }
            });   
        }
    export const updateRequestSignature = (data, Id, result) => {
            db.query("UPDATE `request` SET Signature = ?,Estado = ? WHERE Id=?", 
            [data.Signature,data.Estado, Id], (err, results) => {             
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
        const msg ={
            from:"virginiosiia@gmail.com",
            to:"javmunozm@gmail.com",
            subject: "Solicitud",
            text:"Usuario :"+data.Usuario+" Confirmo Recibo con Fecha: "+data.Fecha_Solicitud+" e Id:"+results.insertId
        }
        const transporter =()=> nodemailer.createTransport({
            service:'gmail',
            auth:{
                user:"virginiosiia@gmail.com",
                pass:"ngnbhncnasvihecv",
            },
            port: 465,
            host:'smtp.gmail.com'
        })
        .sendMail(msg, (err)=>{
            if(err){
                return console.log('Error',err);
            }
            else{
                return console.log('Email enviado');
            }
        })
        console.log(results.insertId);
        transporter();
                }
            });   
        }

 export const updateRequestItems = (data, Id, result) => {
        db.query("UPDATE `requestItems` SET Cantidad_Entregada = ? WHERE Id=?", 
        [data.Cantidad_Entregada, Id], (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });   
    }


