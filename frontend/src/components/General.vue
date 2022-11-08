<template v-if="logued" >
<div class="pt-2">
    <div class="surface-500">
        <Toolbar >
                <template #start>
                    <img src="../assets/iaco2.jpg" class="border-circle" style="display=width:100px;height:100px;" alt="">
                </template>
                <template #end>
                    <Button icon="pi pi-circle" class="p-button-danger border-circle"  @click="salir" />
                </template>
                
    </Toolbar>
    </div>
    

    <!--ADMIN-->
    <div>
        <template v-if="isAdmin">
            <div  class="flex card-container indigo-container" >
               
                    <div > 
                        <Menu :model="itemsadmin"/>
                   </div>
            <div class="surface-500  text-white font-bold  flex align-items-center justify-content-center">
                <div class="surface-200">
                    <router-view />
                </div>
                
            </div>
            </div>
            
        </template>
    </div>


    <!--Recepcion-->
    <div>
        <template v-if="isRecepcion">
            <div  class="flex card-container indigo-container" >
               
               <div > 
                   <Menu class="surface-50 flex align-items-center justify-content-center pl-2 pr-2 border-round-xl border-solid" :model="itemsreception"/>
              </div>
             <div class="surface-500  text-white font-bold  flex align-items-center justify-content-center">
           <div class="surface-200">
               <router-view />
           </div>
           
       </div>
       </div>
    </template>
    </div>
</div>
      
    
</template>

<script>
import {ref,computed} from 'vue';
import store from '@/store/store.js';
export default {
    setup() {


        const itemsadmin = ref([
            {
                label: 'Materiales',
                items: [{
                    label: 'Inventario',
                    icon: 'pi pi-cart-plus',
                    to:'/inventory'                 
                },
                {
                    label: 'Control Salida',
                    icon: 'pi pi-truck',
                    to:'requestcomplete'
                    
                }
            ]},
            {
                label: 'Usuarios',
                items: [{
                    label: 'Gestion Usuarios',
                    icon: 'pi pi-users',
                    to:'user',
                },
            ]}
        ]);

        const itemsreception = ref([
            {
               
                label: 'Gestion de Material',
                items: [
                {
                    label: '1. Generar Salida Material',
                    icon: 'pi pi-caret-right',
                    to:'/request'                 
                },
                {
                    label: '2. Gestionar Salida Material',
                    icon: 'pi pi-caret-right',
                    to:'/listrequest'                 
                },
                {
                    label: '3. Entrega de Material',
                    icon: 'pi pi-caret-right',
                    to:'/requestsignature'                 
                },
                {
                    label: '4. Entregas Pendientes',
                    icon: 'pi pi-wrench',
                    to:'/requestalmost',
                    
                },
            ]},
        ]);
        
        //Login
        const verifyToken = () => {
            console.log("something");
            store.dispatch("autoLogin");
        };
        const logued = computed(() => {
            return store.state.user;
        });
        const isAdmin = computed(() => {
            console.log(store.state.user);
            return (store.state.user && store.state.user.TipoUser == "Admin");
        });
        const isRecepcion = computed(() => {
            return ( store.state.user && store.state.user.TipoUser == "Recepcion");
        });

        const salir =()=>{
            return store.dispatch("logout");
        }





        return { itemsadmin,itemsreception, logued, isAdmin, isRecepcion, verifyToken,salir };
    },
};

</script>