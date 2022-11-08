<template>
      <div class="surface-100 border-solid border-round-xl pt-2 pl-2">
        <div>
          <DataTable 
          :value="requestList"
          :dataKey="Id"
          :paginator="true"
          :rows="10"
          :filters="Filtros"
          :rowsPerPageOptions="[5,10,25]"
          v-model:selection="selectedInventory"
          currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} registros en inventario"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :globalFilterFields="['Id','Usuario']" responsiveLayout="scroll">
          <template #header >
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                        <h5 class="mb-2 md:m-0 p-as-md-center ">Entrega de Material</h5>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search"/>
                            <InputText v-model="Filtros['global'].value" placeholder="Busqueda...." />
                        </span>
                    </div>
                </template>
          <Column field="Id" header="Id"></Column>
          <Column field="Usuario" header="Usuario"></Column>
          <Column field="Fecha_Solicitud" header="Fecha de Solicitud">
            <template #body="slotProps">
            <span >{{moment(slotProps.data.Fecha_Solicitud).utc().format('h:mm:ss a -- DD/MM/YY ')}}</span>
          </template>
          </Column>
          <Column field="Comentario" header="Comentario"></Column>
          <Column header="Detalle">
                        <template #body=slotProps>
                            <Button id="Id"  icon="pi pi-bars" class="p-button-info p-button-rounded mr-2 " @click="openDialog(slotProps.data.Id)" />
                        </template></Column>
    
          </DataTable>
        </div>
        
        <div>
          <Dialog v-model:visible="dialogOrders"  header="" :modal="true" :style="{minWidth:'50em'}" :content-style="{minHeight:'30em'}" 
          class="p-fluid min-height:100px;">
            <div>
              <div>       
                <DataTable 
                :value="requestItems"
                :dataKey="Id"
                :paginator="true"
                :rows="5"
                :rowsPerPageOptions="[5,10,25]"
                v-model:selection="selectedInventory"
                currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} registros en inventario"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                >
                <template #header >
                          <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                              <h5 class="mb-2 md:m-0 p-as-md-center ">Material a Entregar</h5>
                              <Divider :align="left"></Divider>
                            
                          </div>
                      </template>
                      <div>
                        <Column field="Codigo_Item" header="Codigo Item"></Column>
                        <Column field="Comments" header="Comentario"></Column>
                        <Column field="Disponible" header="Stock Disponible"></Column>
                        <Column field="Cantidad_Solicitada" header="Cantidad Solicitada"></Column>
                        <Column header="Cantida¿d Entregada">
                          <template #body=slotProps>
                            <InputNumber id="Cantidad_Entregada" :min="0" :max="slotProps.data.Cantidad_Solicitada" v-model="slotProps.data.Cantidad_Entregada" integeronly required="true" 
                            autofocus :class="{'p-invalid': submitted && !slotProps.data.Cantidad_Entregada}" />
                            <small class="p-error" v-if="submitted && !slotProps.data.Cantidad_Entregada">Cantidad es  requerido.</small>
                          </template></Column>
                      </div>
                </DataTable>
                <Divider></Divider>
                  <div>
                    <div class="field">
                    <label for="Comentario">Comentario Entrega</label><br>
                    <Textarea id="Comentario" v-model.trim="requestList.CommentDelivery"  required="true" :style="{minWidth:'22em'}" autofocus :class="{'p-invalid': submitted && !requestList.CommentDelivery}" />
                    <small class="p-error" v-if="submitted && !requestList.CommentDelivery">Comentario es  requerido.</small>
                    </div>
                  </div>
              </div>
            </div>
            <Divider></Divider>
            <template #footer>
                <Button  label="Completar" icon="pi pi-check" class="p-button-success " @click="saveRequestList"/>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-warning " @click="closeDialog"/>
            </template>
          </Dialog>
        </div>
  </div>
  

  

    
      
      
    </template>
    
    <script >
   // import axios from "axios";
  import {FilterMatchMode,FilterOperator} from 'primevue/api';      
  import {ref, onMounted} from 'vue'; 
  import RequestService from "@/services/RequestService";
  import InventarioService from '@/services/InventarioService';
  import moment from 'moment';
  import store from '@/store/store';
  export default {
    setup() {
    const tokenhead = {"token":store.state.token};
    const retoken={headers:tokenhead};
      onMounted(()=>{
        RequestService.getrequestList(retoken).then(response => 
        {requestList.value = response.data
          console.log(response.data);
        })
        
      })
      //Arays y Objetos
      const requestList = ref([]);
      //array almacena id
      const arrsid = ref([]);
      const requestItems = ref([]);
      const ids = ref([]);
      const Filtros = ref({
            'global':{value:null, matchMode: FilterMatchMode.CONTAINS},
            'Nombre': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
          })
      const headers = ref([
              {text:"Id", align: "start",sortable:false, value:"Id"},
              {text:"Usuario", value:"Usuario", sortable: false},
              {text:"Fecha Solicitud", value:"Fecha_Solicitud", sortable: false},
      ])

      const headersItems = ref([
              {text:"Id Codigo", align: "start",sortable:false, value:"Id_Request"},
              {text:"Codigo", value:"Codigo_Item"},
              {text:"Cantidad Solicitada", align: "start",sortable:false, value:"Cantidad_Solicitada"},
      ])
      //
      const dialogOrders = ref(false);
      const submitted = ref(false);
      
      
      //// Dialog de pedidos
      const openDialog = (val)=>{
        dialogOrders.value = true;
        submitted.value=false;
        ids.value = val;
        arrsid.value.push(val);
        console.log(val);
        RequestService.getRequestList(val,retoken).
        then(response => {
          requestItems.value = response.data;
          console.log(requestItems.value);
        })
        
        console.log("btn pressed");
        
      }

      //Metodo para guardar en Db
      const saveRequestList=()=>{
        submitted.value =true;
        var val = arrsid.value.pop();
        console.log(val);
        var dataRequest = {
        CommentDelivery: requestList.value.CommentDelivery,
        Fecha_Entrega: new Date().toISOString().split('T').join(' ').split('Z').join(''),
        Estado:1,
      };
      RequestService.updateRequestList(val,dataRequest,retoken)
      .then(response => {
        requestList.value.push(response.data);
        console.log(response.data);
      })
      requestItems.value.forEach(element => {
        element= {
          Id: element.Id,
          Codigo_Item: element.Codigo_Item,
          Cantidad_Entregada: element.Cantidad_Entregada,
        }
        InventarioService.updateQuant(element.Codigo_Item,element,retoken)
        .then(
          response =>{
            requestItems.value.push(response.data);
            console.log(requestItems.value);
          }
        )
        RequestService.updateRequestItems(element.Id, element,retoken)
        .then(
          response =>{
          requestItems.value.push(response.data);
          console.log(requestItems.value);
          })
      });

      //guardado en otro arreglo.
      requestItems.value.forEach(element => {
        element= {
          Id: element.Id,
          Codigo_Item: element.Codigo_Item,
          Cantidad_Entregada: element.Cantidad_Entregada,
        }
        
        
        console.log(element);
       
      });
      
      RequestService.getrequestList(retoken).then(response => 
        {requestList.value = response.data
          console.log(response.data);
        })
      dialogOrders.value = false;
      
      }
      
      
      const closeDialog = ()=>{
        submitted.value =false;
        dialogOrders.value = false;
      }

      

      


      

      return {requestList,requestItems, Filtros, headers,headersItems,ids,arrsid,//Datos precargados
        dialogOrders,submitted,// mutadores
          openDialog, closeDialog,moment,//resto
          saveRequestList, retoken,tokenhead// Metodos
      }
    }
    
  }
  
    </script>
    
    <style >
    .list {
      text-align: left;
      max-width: 750px;
      margin: auto;
    }
    .table-header {
              display: flex;
              align-items: center;
              justify-content: space-between;
          }
  
          .product-image {
              width: 50px;
              box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23);
          }
  
          .p-dialog .product-image {
              width: 50px;
              margin: 0 auto 2rem auto;
              display: block;
          }
  
          .confirmation-content {
              display: flex;
              align-items: center;
              justify-content: center;
          }
          @media screen and (max-width: 960px) {
              .table-header {
                  align-items: start;
              }
  
              .p-toolbar {
                  flex-wrap: wrap;
              }
                  
              .p-toolbar .p-button {
                  margin-bottom: 0.25rem;
              }
          }
    </style>
    