import http from "../http-common.js";

class OrderService {
//GET

    //all
    getAllRequest(token){
        return http.get("/request",token);
    }

    getrequestList(token){
        return http.get("/requestList",token);
    }

    getRequestSignature(token){
        return http.get("/requestSignature",token);
    }
    // request for return order status
    getrequestAlmost(token){
        return http.get("/requestAlmost",token)
    }
    getrequestComplete(token){
        return http.get("/requestFinished",token)
    }
    // return only id
    getId(token){
        return http.get("/id",token);
    }

    getRequestList(Id_Request,token){
        return http.get(`/requestList/${Id_Request}`,token);
    }
    

    getRequestItems(Id_Request,token){
        return http.get(`/requestItems/${Id_Request}`,token);
    }

    getRequestItemsDefault(token){
        return http.get("/requestItems",token);
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

//POST

    createRequest(data,token){
        return http.post("/request",data,token);
    }

    createRequestItem(data,token){
        return http.post("/requestItem",data,token);
    }

//PUT for update or else
    updateRequestList(Id, data,token){
        return http.put(`/request/${Id}`,data,token);
    }
    updateRequestItems(Id, data,token){
        return http.put(`/requestList/${Id}`,data,token).catch(token);
    }

    updateRequestSignature(Id, data,token){
        return http.put(`/requestSignature/${Id}`,data,token);
    }
// Delete not implemented yet.
    
}

export default new OrderService();