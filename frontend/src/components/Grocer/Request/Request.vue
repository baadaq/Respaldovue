
<template>
     <div class="surface-100 border-solid border-round-xl pt-2 pl-2">
      
      <Toolbar class="mb-4">
                <template #start>
                  
                    <Button label="Buscar"  icon="pi pi-search" class="p-button-warning p-button-rounded bg-blue-100 flex align-items-center" :style="aling-items-center" @click="openDialog" />
                </template>
        </Toolbar>
  
    <div>
      <!--{{items}}-->
  <!--Datatable con los elementos agregados al buscador-->
          <div v-if="items!=null">
            <div class="borders-rounded">
                <DataTable 
                :value="items"
                :dataKey="CODIGO"
                :paginator="true"
                :rows="5"
                :rowsPerPageOptions="[5,10,25]"
                v-model:selection="selectedInventory"
                currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} registros en inventario"
                paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                :globalFilterFields="['MATERIAL','CODIGO']" responsiveLayout="scroll">
                <template #header >
                          <div >
                              <h5 class="aling-items-center">Salidas de Material requeridas</h5>
                          </div>
                      </template>
                      <div>
                        <Column field="CODIGO" header="Codigo Orden"></Column>
                        <Column field="MATERIAL" header="Nombre"></Column>
                        <Column field="Diferencia" header="Stock"></Column>
                        <Column field="Cantidad" header="Cantidad">
                          <template #body=slotProps>
                            <InputNumber id="Cantidad" :min="0" :max="slotProps.data.Diferencia" v-model="slotProps.data.Cantidad" integeronly/>
                          </template></Column>
                          <Column field="Comments" header="Comentario">
                    <template #body="slotProps">
                      <InputText id="Comments" v-model="slotProps.data.Comments" type="text"/>
                    </template>
                     
                  </Column>
                        <Column header="Modificar">
                              <template #body=slotProps>
                                <div class="flex inline">
                                  <Button  icon="pi pi-bars" class="p-button-warning p-button-rounded mr-2 " @click="insertItem(slotProps.data)" />
                                  <Button  icon="pi pi-trash" class="p-button-danger p-button-rounded mr-2 " @click="removeItem(slotProps.data)" />
                                </div>
                                  
                              </template></Column>
                      </div>
                
                </DataTable>
            </div>
            <Divider></Divider>
            <div>
              <div class="field">
              <label for="Comentario">Comentario</label><br>
              <Textarea id="Comentario"  v-model.trim="comment.Comentario" required="true" :style="{minWidth:'22em'}" autofocus :class="{'p-invalid': submitted && !comment.Comentario}" />
              <small class="p-error" v-if="submitted && !comment.Comentario">Comentario es  requerido.</small>
              </div>
            </div>
          </div>
       <!--Dialog orders-->
       <Dialog v-model:visible="dialogOrders"  header="Peticiones a agregar" :modal="true" :style="{minWidth:'50em'}" :content-style="{minHeight:'30em'}" class="p-fluid min-height:100px;">
        <!--Datatable con los elementos a buscar-->
        <div>  
          <DataTable 
        :value="request.filter(x => !items.map(x=> x.CODIGO).includes(x.CODIGO) )"
          :dataKey="CODIGO"
          :paginator="true"
          :rows="5"
          :filters="Filtros"
          :rowsPerPageOptions="[5,10,25]"
          v-model:selection="selectedInventory"
          currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} registros en inventario"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          :globalFilterFields="['CODIGO','MATERIAL']" responsiveLayout="scroll">
          <template #header >
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                        <h5 class="mb-2 md:m-0 p-as-md-center ">Inventario</h5>
                        <Divider :align="left"></Divider>
                        <span class="p-input-icon-left">
                            <i class="pi pi-search"/>
                            <InputText v-model="Filtros['global'].value" placeholder="Busqueda...." />
                        </span>
                    </div>
                </template>
                <div v-if="Filtros['global'].value!=null && Filtros['global'].value!=''  ">
                  <Column field="CODIGO" header="Codigo Orden"></Column>
                  <Column field="MATERIAL" header="Nombre"></Column>
                  <Column field="Diferencia" header="Stock"></Column>
                  <Column field="Cantidad"  header="Cantidad" :style="{minWidth:'5px'}">
                    <template  #body=slotProps>
                      <InputNumber id="Cantidad" :min="0" :max="slotProps.data.Diferencia" :input-style="{width:'3em'}"  v-model="slotProps.data.Cantidad"  integeronly required/>
                    </template>
                  </Column>
                  <Column field="Comments" header="Comentario">
                    <template #body="slotProps">
                      <InputText id="Comments" v-model="slotProps.data.Comments" type="text"/>
                    </template>
                     
                  </Column>
                  <Column header="Agregar">
                        <template #body=slotProps>
                            <Button  icon="pi pi-plus-circle" class="p-button-info p-button-rounded mr-1  bg-white" @click="insertItem(slotProps.data)" />
                        </template></Column>
                </div>

                
          </DataTable>
        </div>
        
        <template #footer>
              <Button label="Ok" icon="pi pi-check" class="p-button-text" @click="closeDialog"/>
          </template>
       </Dialog>


       <Dialog v-model:visible="nestedDialog" :style="{width: '450px'}" header="Añadir Ordenes" :modal="true" class="p-fluid">
       
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="items">Estas seguro de querer realizar  estas peticion?</span>
            </div>
            <div style="display:flex;justify-content: center;">
              <Button label="Ok" icon="pi pi-check"  class="p-button-info p-button-rounded mr-1    bg-blue flex justify-concent-center align-items-center" 
              :style="{minWidth:'3em', width:'10em'}"  @click="saveRequest"  />
              
            </div>
       </Dialog>
    </div>

    <div style="display:flex;justify-content: center;">
      <Button label="Enviar" icon="pi pi-book"  class="p-button-warning p-button-rounded mr-2  bg-blue flex justify-concent-center align-items-center" 
     :style="{minWidth:'3em', width:'10em'}"  @click="opennestedDialog"  />

    </div>
              <Divider>
              </Divider>
     </div>  
</template>
  
  <script >
import {FilterMatchMode,FilterOperator} from 'primevue/api';      
import {  ref, onMounted} from 'vue'; 
import RequestService from "@/services/RequestService";
import InventarioService from '@/services/InventarioService';
import { required } from '@vuelidate/validators'
import store from '@/store/store';
export default {
  setup() {

    onMounted(()=>{
      guser;
      let header = {"token":store.state.token};
      let configuration = {headers: header};
      InventarioService.getAll(configuration).then(response => 
      {request.value = response.data
        console.log(response.data);
      })
    })

    //rules
    const rules = {
      Cantidad: {required},
    }
    //Arreglo de objetos temporal para guardar y comparar items
    const items = ref([]);
    const comparison = ref([]);
    const id=ref();

    //insercion y metodos especificos de arrays
    const insertItem =(val)=>{
      if(items.value.find(e=>{
        if(e.MATERIAL == val.MATERIAL){
          return true// verificamos que el objeto se encuentre dentro del arreglo
                  }
                }
              )
            )
            {
        items.value.Cantidad = val.Cantidad; // actualizacion de cantidad
      }
      else{
        items.value.push(val);
        console.log(items.value);
       
      }
    }

    const removeItem = (val)=>{
      // let index = items.value.findIndex(e => e.Nombre == val.Nombre);
      // console.log(index);
      items.value.splice(items.value.findIndex(e => e.MATERIAL == val.MATERIAL),1);
      
    }

   
    //val ref 
    const guser= ref();
    guser.value=store.state.user.Email; 
    const requestItemsArr=ref([]);
    const inventory = ref([]);
    const request = ref([]);
    const comment = ref([]);
    
    //
    const Filtros = ref({
          'global':{value:null, matchMode: FilterMatchMode.CONTAINS},
          'Nombre': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        })
    const headers = ref([
            {text:"Codigo", align: "start",sortable:false, value:"CODIGO"},
            
            {text:"Cantidad", value:"Cantidad", sortable: false},
           
            {text:"Comments", value:"Comments", sortable: false},
            {text:"Diferencia", value:"Diferencia", sortable: false}
    ])
    //
    const dialogOrders = ref(false);
    const nestedDialog = ref(false);
    const submitted = ref(false);
    const openDialog = ()=>{
      submitted.value =false;
      dialogOrders.value = true;
      console.log("btn pressed");
    }

    const opennestedDialog = ()=>{
      submitted.value =false;
      nestedDialog.value = true;
      console.log("btn pressed");
    }
    
    const closeDialog = ()=>{
      submitted.value =false;
      if(nestedDialog.value){
        nestedDialog.value=false;
      }
      if(dialogOrders.value){
        dialogOrders.value = false;
      }
      
    }

    

    const saveRequest = ()=>{
      let header = {"token":store.state.token};
      let configuration = {headers: header};
      
      var dataRequest = {
        Comentario: comment.value.Comentario,
        Fecha_Solicitud: new Date().toISOString().split('T').join(' ').split('Z').join(''),
        CommentDelivery:'-',
        Estado:0,
        Usuario:guser.value,
        UserDelivery:guser.value,
      };
      RequestService.createRequest(dataRequest,configuration)
      .then(response => {
        request.value = response.data;
        console.log(response.data);
      })
      RequestService.getId(configuration).then(response => 
      {
        request.value = response.data
         var ids= response.data;
        console.log(ids[0]);
        var number = Object.values(ids[0]);
        items.value.forEach(element => {
        element ={
          Codigo_Item: element.CODIGO,
          Id_request: Number(number),
          Cantidad_Solicitada: element.Cantidad,
          Comments: element.Comments
        }
        console.log(element);
        RequestService.createRequestItem(element,configuration)
        .then(response =>{
          request.value = response.data;
          console.log(request.value);
        })
      });
      })
      
      nestedDialog.value=false;
      dialogOrders.value = false;
      comment.value.Comentario=''
    }

    return {
      inventory,request, Filtros, headers,items,comment,requestItemsArr,//Datos precargados
      //Metodos y Arr restricciones
      comparison,
      dialogOrders, nestedDialog,submitted,id,rules,  // mutadores        
      openDialog, closeDialog,opennestedDialog, // Dialogs
      saveRequest, insertItem, removeItem, guser// Metodos
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
  