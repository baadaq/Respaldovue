import http from "../http-common.js";

class InventarioService {
    getAll(token){
        return http.get("/inventory",token).catch(token);
    }

    
/*
    get(id){
        return http.get(`/inventory/${id}`);
    }
    update(id, data){
        return http.put(`/inventory/${id}`,data);
    }

    delete(id){
        return http.delete(`/inventory/${id}`);
    }

    deleteAll(){
        return http.delete('/inventory');
    }
*/
    create(data,token){
        return http.post("/inventory",data,token);
    }

    findBySku(Codigo,token){
        return http.get(`/inventory?Codigo=${Codigo}`,token);
    }
    
    updateBySku(Codigo, data,token){
        return http.put(`/inventory/${Codigo}`,data,token);
    }

    updateQuant(Codigo, data,token){
        return http.put(`/inventoryQ/${Codigo}`,data,token);
    }
    deleteBySku(Codigo,token){
        return http.delete(`/inventory/${Codigo}`,token);
    }

    deleteAll(){
        return http.delete('/inventory');
    }
    
    email(){
        return http.post("/email");
    }

    //User
    login(data){
        return http.post("/login",data);
    }

    getUsers(token){
        return http.get("/user",token);
    }
    createUser(data,token){
        return http.post("/user",data,token).catch(token);
    }
    updateUser(Id, data,token){
        return http.put(`/user/${Id}`,data,token).catch(token);
    }
    deleteUser(Id,token){
        return http.delete(`/user/${Id}`,token);
    }
}

export default new InventarioService();