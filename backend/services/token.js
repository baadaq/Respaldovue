import jwt from 'jsonwebtoken';
import { callbackPromise } from 'nodemailer/lib/shared/index.js';
import db from "../config/database.js";
//import  {jwt } from 'jsonwebtoken';
import {getUserById, getUserAuth, getUsersAll} from '../models/authModel.js';

async function checkTokenId(token){
    let Id = null;
    try{
        const {_Id} = await jwt.decode(token);
            Id=_Id;
    } catch(e){
        console.log(e);
        return false;
    }
    
    getUsersAll((err, results) => {
                if (err){
                    res.send(err);
                }else{
                const _Id = results[0].Id;
                console.log(results[0].Id);
                if(results){
                    const token = jwt.sign({Id:_Id},'secretToken',{expiresIn:'1d'});
                    console.log(results[0].TipoUser)
                    return {token, TipoUser:results[0].TipoUser};
            } else{
                return false;
            }
                }
            });
        
    
};

// async function checkTokenEmail(token){
//     let Email = null;
//     try{
//         const {email} = await jwt.decode(token);
//             Email=email;
//     } catch(e){
//         console.log(e);
//         return false;
//     }

//         const user = await getUserAuth({email:Email });
//         if(user){
//             const token = jwt.sign({Email:email},'secretToken',{expiresIn:'1d'});
//             return {token, TipoUser:user.TipoUser};
//         } else{
//             return false;
//         }
    
// };


export default {
    encode: (Id,TipoUser,Email) =>{
        const token = jwt.sign({Id:Id,TipoUser:TipoUser,Email:Email},'secretToken',{expiresIn:'1d'});
        return token;
    },
    decode:async(token)=>{
        try{
            const idTkn = await jwt.verify(token,'secretToken');
            return idTkn.Id;
        }catch(e){
            const newToken = await checkTokenId(token);
            return newToken;
        }
        
        
        // try{
        //     const {Id} =  jwt.verify(token,'secretToken');
        //     return "Admin";
        // } catch(e){
        //     console.log("aqui");
        //    { const newToken =  checkTokenId(token);
        //     return newToken;}
        // }
    }
}