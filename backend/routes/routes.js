// import express
import express from "express";
 
// import function from controller
import { showInventory, showInventoryBySku, createInventory, updateInventory, deleteInventory,
UpdateInventoryQuant, showUser, UpdateUser, createUser, DeleteUser} from "../controllers/inventory.js";
import {showRequest,ShowRequestItems, createNewRequest, showId, createNewRequestItems, UpdateRequestItems,
     showRequestList, showAllItems, UpdateRequest, showRequestListAlmost, UpdateRequestSignature, showRequestListComplete, ShowRequestItemsDefault} from "../controllers/request.js";
import { transporter} from "../email/nodemailer.js";

import {Login} from "../controllers/auth.js";
//auth
import { verifyAdmin, verifyRecepcion, verifyUsuario} from '../middlewares/auth.js';
// init express router
const router = express.Router();



router.post('/email',verifyUsuario, transporter);
//Routes for inventory 
                    // Get All 
router.get('/inventory',verifyUsuario, showInventory);
                    // Get Single 
router.get('/inventory/:Codigo',verifyAdmin, showInventoryBySku);
                    // Create New 
router.post('/inventory',verifyAdmin, createInventory);
                    // Update 
router.put('/inventory/:Codigo',verifyUsuario, updateInventory);
router.put('/inventoryQ/:Codigo',verifyUsuario, UpdateInventoryQuant);
                    // Delete 
router.delete('/inventory/:Codigo',verifyAdmin, deleteInventory);
 

//Routes for order meaning all from request, need to order more, this is just for presentation for the client
                    // Get All 
router.get('/request',verifyUsuario, showRequest);

// RequestList
router.get('/requestList',verifyUsuario, showRequestList);
// return request with status 1
router.get('/requestSignature',verifyUsuario,showRequestListAlmost);
//return request with status 2
router.get('/requestAlmost',verifyUsuario,showRequestListAlmost);
router.get('/requestFinished',verifyUsuario,showRequestListComplete);
                    // Get Single 
router.get('/requestList/:Id_Request',verifyUsuario, showAllItems);  
        
router.get('/requestItems/:Id_Request',verifyUsuario,ShowRequestItems);
router.get('/requestItems/',verifyUsuario,ShowRequestItemsDefault);

                 //create  
router.post('/request',verifyUsuario, createNewRequest);
router.post('/requestItem',verifyUsuario, createNewRequestItems);

//update request
router.put('/request/:Id',verifyUsuario, UpdateRequest);
router.put('/requestList/:Id',verifyUsuario,UpdateRequestItems);
router.put('/requestSignature/:Id',verifyUsuario,UpdateRequestSignature);
//retorno id
router.get('/id',verifyUsuario, showId);
// requesst


////

//users Admin

router.get('/user', verifyAdmin,showUser);
router.post('/user',verifyAdmin,createUser);
router.put('/user/:Id', verifyAdmin,UpdateUser);
router.delete('/user/:Id',verifyAdmin,DeleteUser);


//otras rutas
router.post('/login', Login);

export default router;