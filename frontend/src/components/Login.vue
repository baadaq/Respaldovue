<template>
    <div class="center-align">
        <div  class=" flex align-items-center  justify-content-center font-bold text-black border-round pt-8 ">
        <Card class="border-solid border-round-xl "  >
            <template #header>
                <div>
                    <h5></h5>
                </div>
            </template>
            
            <template #title>
                <div>
                    <h5>Login</h5>
                    <img src="../assets/login.png" class="border-circle" style="display=width:100px;height:100px;" alt="">
                </div>
            </template>

            <template #content>
                
                <div>
                    <span class="p-float-label">
                        <InputText id="Email" type="text" v-model.trim="users.Email" required/>
                        <label for="Email">Email</label>
                    </span>
                </div>
                <Divider></Divider>
                <div>
                    <span class="p-float-label">
                        <InputText id="Password" type="password" v-model.trim="users.Password" required/>
                        <label for="Password">Password</label>
                    </span>
                </div>
                <Divider></Divider>
                <small class="p-error" v-if="errorLogin">{{errorLogin}}.</small>
              </template>
              <template #footer>
                <div>
                    <Button  label="" icon="pi pi-check-circle" class="p-button-rounded p-button-success" @click="login" />
                </div>
            </template>
        </Card>
    </div>
    </div>
    
</template>

<script>
import {ref, provide} from "vue";
import InventarioService from "@/services/InventarioService";
import store from "@/store/store";
import router from "@/router";

export default{
    setup(){

      //Dt
      const algo=ref();
        const users = ref([]);
        const submitted= ref(false);
        const errorLogin=ref();
        const login =()=>{
            var data = {
                Email:users.value.Email,
                Password:users.value.Password,
            }
            InventarioService.login(data).then(response =>{
                users.value = response.data;
                console.log(users.value);
                console.log(response.data);
                return users.value;

            }).then(r=>{
                store.dispatch("storeToken",r.tokenReturn);
                
                provide('user','String');
                router.push({name:'general'});
            })
            .catch(e=>{
                console.log(e);
                errorLogin.value=null;
                if(e.response.status==404){
                    errorLogin.value="Credenciales Incorrectas o User no existe"
                }else{
                    errorLogin.value='Ocurrio un error con el servidor';
                }
            });
            submitted.value=true;
        }

        return { login, users,submitted,errorLogin,algo }
    }
}
</script>
<style>
.center-align {
position:relative;
height: 100px;
margin:0 auto;
padding: 10% 0;
}

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
