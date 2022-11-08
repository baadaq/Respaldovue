import bcrypt from 'bcryptjs'
import token from '../services/token.js';
import { getUserAuth, getUserById } from '../models/authModel.js';

export const Login = async(req, res, next) => {
    var email = req.body.Email;
    var pass = req.body.Password;
    if(email && pass){
            getUserAuth(email,pass, (err, results) => {
                        if (err){
                             res.status(404);
                        }else if(results){
                        const match = bcrypt.compare(results.Password,pass);
                                    if(match){
                                        console.log("paso password");
                                    // res.json(results);
                                        
                                        console.log("logeado");
                                        let tokenReturn =  token.encode(results.Id,results.TipoUser, results.Email);
                                        console.log(tokenReturn);
                                         res.status(200).json({results,tokenReturn});
                                    }else{
                                         res.status(404)
                                    }
                        }
                else{
                    res.status(404);
                    res.send("credenciales invalidas");
                }
                    });
            
        
            }else{
        res.send("credenciales invalidas");
    }
}

