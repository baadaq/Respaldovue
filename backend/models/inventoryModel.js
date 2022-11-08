// import connection
import db from "../config/database.js";
import nodemailer from "nodemailer";
// Users
export const getUser = (result) =>{
    db.query("SELECT * From users",(err,results) => {
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    })
}

export const insertUser = (data, result) => {
        db.query("INSERT INTO users SET ?", [data], (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });   
    }


export const updateUser = (data, Id, result) => {
            db.query("UPDATE users SET Nombre = ?, Email = ?, Apellido = ?, Rut = ?, TipoUser = ? WHERE Id = ?", 
            [data.Nombre, data.Email, data.Apellido, data.Rut,data.TipoUser, Id ], (err, results) => {             
                if(err) {
                    console.log(err);
                    result(err, null);
                } else {
                    result(null, results);
                }
            });   
        }

export const deleteUser = (Id, result) => {
                db.query("DELETE FROM users WHERE Id = ?", [Id], (err, results) => {             
                    if(err) {
                        console.log(err);
                        result(err, null);
                    } else {
                        result(null, results);
                    }
                });   
            }


//Inventory
// Get All Inventory
export const getInventory = (result) => {
    db.query("SELECT CODIGO,MATERIAL, LOTE, STOCK, STOCKMINIMO, (STOCK-STOCKMINIMO) as Diferencia FROM inventory", (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}

 
// Get Single Inventory
/*export const getInventoryId = (id, result) => {
    db.query("SELECT * FROM inventory WHERE id = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results[0]);
        }
    });   
}*/

export const getInventoryBySku = (CODIGO, result) => {
        db.query("SELECT * FROM inventory WHERE CODIGO = ?", [CODIGO], (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results[0]);
            }
        });   
    }
 
// Insert Inventory to Database
export const insertInventory = (data, result) => {
    db.query("INSERT INTO inventory SET ?", [data], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}
 
// Update Inventory to Database
/*export const updateInventoryById = (data, id, result) => {
    db.query("UPDATE inventory SET Codigo = ?, Nombre = ?, LOTE = ?, Stock = ?, StockMinimo = ? WHERE id = ?", 
    [data.Codigo, data.Nombre, data.LOTE, data.Stock, data.StockMinimo, id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}*/

export const updateInventoryBySku = (data, CODIGO, result) => {
        db.query("UPDATE inventory SET MATERIAL = ?, LOTE = ?, STOCK = ?, STOCKMINIMO = ? WHERE CODIGO = ?", 
        [data.MATERIAL, data.LOTE, data.STOCK, data.STOCKMINIMO, CODIGO], (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });   
    }
export const updateInventoryQuant = (data, CODIGO, result) => {

    var cantidad;
    const msg ={
        from:"virginiosiia@gmail.com",
        to:"javmunozm@gmail.com",
        subject: "Stock",
        text:"Producto :"+CODIGO+" MATERIAL: "+data.MATERIAL+" tiene inventario 0 disponible"
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
            db.query("SELECT (Stock-StockMinimo) as Qty FROM inventory WHERE CODIGO =? ",[
            CODIGO],(errr, resultss)=>{
                if(errr){
                    console.log(errr);
                } else {
                    cantidad = resultss[0].Qty;
                    console.log(cantidad);
                    if(cantidad>=0){
                        db.query("UPDATE inventory SET STOCK = STOCK - ? WHERE (STOCK - ?)>=0 AND CODIGO = ?", 
                    [data.Cantidad_Entregada,data.Cantidad_Entregada, CODIGO], (err, results) => {             
                        if(err) {
                            console.log(err);
                            result(err, null);
                        } else {
                          var newQty=cantidad-data.Cantidad_Entregada;
                            result(null, results);
                            console.log("cantidad");
                            console.log(cantidad);
                            console.log("Cantidad Entregada");
                            console.log(data.Cantidad_Entregada);
                            console.log("resultado");
                            console.log(newQty);
                                 if(newQty==0){
                                 transporter();
                                    }
                                
                        }
                    }); 
                    }
                    
                }
            });

           
        ////
            
          
        }
 
// Delete Inventory to Database
/*export const deleteInventoryById = (id, result) => {
    db.query("DELETE FROM inventory WHERE id = ?", [id], (err, results) => {             
        if(err) {
            console.log(err);
            result(err, null);
        } else {
            result(null, results);
        }
    });   
}*/

export const deleteInventoryBySku = (CODIGO, result) => {
        db.query("DELETE FROM inventory WHERE Codigo = ?", [CODIGO], (err, results) => {             
            if(err) {
                console.log(err);
                result(err, null);
            } else {
                result(null, results);
            }
        });   
    }

