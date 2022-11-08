// import express
import express from "express";
// import cors
import cors from "cors";
// import routes
import Router from "./routes/routes.js";

//Imagenes pesadas
import bodyParser from "body-parser";
 // import nodemailer
// init express
const app = express();
 
// use express json
app.use(bodyParser.json({limit:'50mb'}));
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true, parameterLimit: 50000 }))
app.use(express.json());
 
// use cors
app.use(cors());
 
// use router
app.use(Router);
 
app.listen(8080, () => console.log('Server running at http://localhost:8080'));