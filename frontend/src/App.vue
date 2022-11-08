<template id="app" >
  <div  class="surface-100" style="display=width:100%;height: 100%;">
    <router-view />             
  </div>
</template>

<script>
import {computed} from 'vue';
import store from '@/store/store.js';
export default {
  setup(){
        const verifyToken=()=>{
          console.log("something");
           store.dispatch("autoLogin");
         }
        const logued =computed(()=>{
          return store.state.user;
        });
        const isAdmin=computed(()=>{
          console.log(store.state.user);
          return (store.state.user && store.state.user.TipoUser=='Admin');
          
        });
        const isRecepcion=computed(()=>{
          return (store.state.user && store.state.user.TipoUser=='Recepcion');
        });






return {
  logued,isAdmin,isRecepcion,verifyToken
};
}
  

};

</script>


<!--<script>
import HelloWorld from './components/HelloWorld.vue'

export default {
  name: 'App',
  components: {
    HelloWorld
  }
}
</script>
-->
<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: -20px;
}

@import url("https://fonts.googleapis.com/css2?family=Montserrat:wght@100;300;400;500;600;700;800;900&display=swap");
body {
  font-family: "Montserrat", sans-serif;
}

</style>
