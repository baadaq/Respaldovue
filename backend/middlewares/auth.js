import { getUserById } from '../models/authModel.js';
import tokenService from '../services/token.js';

export const verifyUsuario =async  (req, res,next) =>{
    if(!req.headers.token){
        return res.status(404).send({
            message: 'No token'
        });
    }
    const response = await tokenService.decode(req.headers.token);
    if(response){
        getUserById(response,(err,results)=>{
            if(err) throw err;
            else if(results.TipoUser=="Admin" || results.TipoUser=="Recepcion" || results.TipoUser=="Bodega"){
                next();
            }
            else{
                return res.status(403).send({
                    message: 'No'
                });
            }
        })
    }else{
        return res.status(403).send({
            message: 'No'
        });
    }
};

export const verifyAdmin =   async(req, res,next) =>{
    if(!req.headers.token){
        return res.status(404).send({
            message: 'No'
        });
    }
    //console.log("verify admin");
   // console.log(req.headers.token);
    const response = await tokenService.decode(req.headers.token);
    console.log(response);
    if(response){
        getUserById(response,(err,results)=>{
            if(err) throw err;
            else if(results.TipoUser=="Admin"){
                next();
            }
            else{
                return res.status(403).send({
                    message: 'No'
                });
            }
        })
    }else{
        return res.status(403).send({
            message: 'No'
        });
    }
};

export const verifyRecepcion = async (req, res,next) =>{
    if(!req.headers.token){
        return res.status(404).send({
            message: 'No'
        });
    }
    const response =await tokenService.decode(req.headers.token);
    if(response){
        getUserById(response,(err,results)=>{
            if(err) throw err;

            else if(results.TipoUser=="Admin" || results.TipoUser=="Recepcion"){
                next();
            }
            else{
                return res.status(403).send({
                    message: 'No'
                });
            }
        })
    }else{
        return res.status(403).send({
            message: 'No'
        });
    }
   
};

export const verifyBodega = async (req, res,next) =>{
    if(!req.headers.token){
        return res.status(404).send({
            message: 'No'
        });
    }
    const response =await tokenService.decode(req.headers.token);
    if(response){
        getUserById(response,(err,results)=>{
            if(err) throw err;
            else if(results.TipoUser=="Admin" || results.TipoUser=="Bodega"){
                next();
            }
            else{
                return res.status(403).send({
                    message: 'No'
                });
            }
        })
    }else{
        return res.status(403).send({
            message: 'No'
        });
    }
};