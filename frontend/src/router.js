import { createWebHistory, createRouter } from "vue-router";
import store from './store/store.js';
const routes = [


    //Login
    {
        path:'/login',
        alias:"/login/",
        name:"login",
        component: () => import("../src/components/Login"),
        meta:{
            libre:true,
        }
    },
    //homeview
    {
        path:'/',
        alias:"/home",
        name:"home",
        component: () => import("../src/App"),
        meta:{
            Admin:true,
            Recepcion:true
        }
    },
    //General
    {
        path:'/general',
        alias:"/general/",
        name:"general",
        component: () => import("../src/components/General"),
        children:[
                 //routes de Admin **ADMIN
                    {
                        path:'/inventory',
                        alias:"/inventory/",
                        name:"inventory",
                        component: () => import("../src/components/Admin/Inventario/ListInventario"),
                        meta:{
                            Admin:true,
                        }
                    },
                    {
                        path:'/user',
                        alias:"/user/",
                        name:"user",
                        component: () => import("../src/components/Admin/User/User"),
                        meta:{
                            Admin:true,
                        }
                    },
                    //routes de recepcionista, bodeguero, etc. **GROCER
                    {
                        path:'/request',
                        alias:"/request/",
                        name:"request",
                        component: () => import("../src/components/Grocer/Request/Request")
                        ,
                        meta:{
                            Admin:true,
                            Recepcion:true,
                        }
                    },
                    {
                        path:'/listrequest',
                        alias:"/listrequest/",
                        name:"listrequest",
                        component: () => import("../src/components/Grocer/Request/ListRequest")
                        ,
                        meta:{
                            Admin:true,
                            Recepcion:true,
                        }
                    },
                    {
                        path:'/requestsignature',
                        alias:"/requestsignature/",
                        name:"requestsignature",
                        component: () => import("../src/components/Grocer/Request/RequestSignature")
                        ,
                        meta:{
                            Admin:true,
                            Recepcion:true,
                        }
                    },

                    //get order status

                    {
                        path:'/requestalmost',
                        alias:"/requestalmost/",
                        name:"requestalmost",
                        component: () => import("../src/components/Grocer/Request/RequestAlmost")
                        ,
                        meta:{
                            Admin:true,
                            Recepcion:true
                        }
                    },
                    {
                        path:'/requestcomplete',
                        alias:"/requestcomplete/",
                        name:"requestcomplete",
                        component: () => import("../src/components/Grocer/Request/RequestComplete")
                        ,
                        meta:{
                            Admin:true,
                            Recepcion:true,
                        }
                    },
        ],
        meta:{
            Admin:true,
            Recepcion:true
        }
    },
   

]

const router = createRouter({
    history: createWebHistory(),
    routes,
})
router.beforeEach((to,from, next)=>{
    if(to.matched.some(record=> record.meta.libre)){
        console.log("intentando cargar pagina login ");
        next();
    } 
    else if(store.state.user && store.state.user.TipoUser =='Admin'){
        if(to.matched.some(record => record.meta.Admin)){
            next();
        }
    } 
    else if(store.state.user && store.state.user.TipoUser =='Recepcion'){
        if(to.matched.some(record => record.meta.Recepcion)){
            next();
        }
    }else{
        next({name:'login'});
    }
});

export default router;