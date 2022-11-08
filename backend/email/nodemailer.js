import db from "../config/database.js";
import nodemailer from "nodemailer";


const msg ={
    from:"virginiosiia@gmail.com",
    to:"javmunozm@gmail.com",
    subject: "prueba",
    text:"something"
}

 export const transporter =()=> nodemailer.createTransport({
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



