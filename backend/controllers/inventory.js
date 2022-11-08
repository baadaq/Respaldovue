// Import function from Inventory Model
import { getInventory, getInventoryBySku, insertInventory, updateInventoryBySku, deleteInventoryBySku,
updateInventoryQuant, getUser, insertUser, deleteUser, updateUser} from "../models/inventoryModel.js";
 

//Users
export const showUser =  (req, res) => {
        getUser((err, results) => {
            if (err){
                res.send(err);
            }else{
                res.json(results);
            }
        });
    }
export const createUser = (req, res) => {
            const data = req.body;
        insertUser(data, (err, results) => {
                if (err){
                    res.send(err);
                }else{
                    res.json(results);
                }
            });
        }
export const UpdateUser = (req, res) => {
    const data  = req.body;
    const Id = req.params.Id;
    updateUser(data, Id, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}


export const DeleteUser = (req, res) => {
        const Id = req.params.Id;
        deleteUser(Id, (err, results) => {
            if (err){
                res.send(err);
            }else{
                res.json(results);
            }
        });
    }

// Get All Inventory
export const showInventory = (req, res) => {
    getInventory((err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}

 
// Get Single Inventory 
export const showInventoryBySku = (req, res) => {
    getInventoryBySku(req.params.Codigo, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
 
// Create New Inventory
export const createInventory = (req, res) => {
    const data = req.body;
    insertInventory(data, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
 
// Update Inventory
export const updateInventory = (req, res) => {
    const data  = req.body;
    const Codigo    = req.params.Codigo;
    updateInventoryBySku(data, Codigo, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
export const UpdateInventoryQuant= (req, res) => {
    const data  = req.body;
    const Codigo    = req.params.Codigo;
    updateInventoryQuant(data, Codigo, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}
 
// Delete Inventory
export const deleteInventory = (req, res) => {
    const Codigo = req.params.Codigo;
    deleteInventoryBySku(Codigo, (err, results) => {
        if (err){
            res.send(err);
        }else{
            res.json(results);
        }
    });
}