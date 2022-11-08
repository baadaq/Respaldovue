// Import function from Inventory Model
import { getRequest, createRequest, createRequestItems,lastInsertId, getRequestList, updateRequestItems,
getRequestItems, getAllItems,getRequestListAlmost,updateRequestSignature,
updateRequest, getRequestListComplete,getRequestItemsDefault} from "../models/requestModel.js";
 
// Get All Inventory
export const showRequest = (req, res) => {
    getRequest((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}



export const showId = (req, res) =>{
    lastInsertId((err, results)=>{
        if(err){
            res.send(err);
        }
        else{
            res.json(results);
        }
    })
}

export const ShowRequestItems = (req, res) => {
    getRequestItems(req.params.Id_Request, (err, results) => {
            if (err){
                res.send(err);
            }else{
                res.json(results);
            }
        });
    }
export const ShowRequestItemsDefault = (req, res) => {
        getRequestItemsDefault(req.params.Id_Request, (err, results) => {
                if (err){
                    res.send(err);
                }else{
                    res.json(results);
                }
            });
        }


export const showAllItems = (req, res) => {
            getAllItems(req.params.Id_Request, (err, results) => {
                if (err){
                    res.send(err);
                }else{
                    res.json(results);
                }
            });
        }

// Create New Inventory
export const createNewRequest = (req, res) => {
    const data = req.body;
        createRequest(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
 
export const createNewRequestItems = (req, res) => {
        const data = req.body;
        createRequestItems(data, (err, results) => {
            if (err){
                res.send(err);
            }else{
                res.json(results);
            }
        });
    }


export const showRequestList = (req, res) => {
        getRequestList((err, results) => {
            if (err){
                res.send(err);
            }else{
                res.json(results);
            }
        });
    }

export const showRequestListAlmost = (req, res) => {
        getRequestListAlmost((err, results) => {
            if (err){
                res.send(err);
            }else{
                res.json(results);
            }
        });
    }

export const showRequestListComplete = (req, res) => {
        getRequestListComplete((err, results) => {
            if (err){
                res.send(err);
            }else{
                res.json(results);
            }
        });
    }

//Update 

export const UpdateRequest = (req, res) => {
        const data  = req.body;
        const Id = req.params.Id;
        updateRequest(data, Id, (err, results) => {
            if (err){
                res.send(err);
            }else{
                res.json(results);
            }
        });
    }
export const UpdateRequestSignature = (req, res) => {
            const data  = req.body;
            const Id = req.params.Id;
            updateRequestSignature(data, Id, (err, results) => {
                if (err){
                    res.send(err);
                }else{
                    res.json(results);
                }
            });
        }

export const UpdateRequestItems = (req, res) => {
            const data  = req.body;
            const Id = req.params.Id;
            updateRequestItems(data, Id, (err, results) => {
                if (err){
                    res.send(err);
                }else{
                    res.json(results);
                }
            });
        }