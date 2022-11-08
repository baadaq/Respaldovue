import {Store} from 'vuex';
import decode from  'jwt-decode';
import router from '../router';
export default new Store({
    state:{
        token:null,
        user:null
    },
    mutations:{
        setToken(state, token){
            state.token=token;
        },
        setUser(state,user){
            state.user=user;
        }
    },
    actions:{
        storeToken({commit},token){
            console.log(token);
            commit("setToken",token);
            commit("setUser",decode(token));
            localStorage.setItem("token",token);
        },
        autoLogin({commit}){
            let token = localStorage.getItem("token");
            if(token){
                commit("setToken",token);
                commit("setUser",decode(token));
            }
            router.push({name:'general'});
        },
        logout({commit}){
            commit("setToken",null);
            commit("setUser",null);
            localStorage.removeItem("token");
            router.push({name:'login'});
        },
    }
})
