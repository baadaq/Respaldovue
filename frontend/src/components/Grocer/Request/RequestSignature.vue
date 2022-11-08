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
                      <h5 class="mb-2 md:m-0 p-as-md-center ">Concluir Entrega de Material</h5>
                      <span class="p-input-icon-left">
                          <i class="pi pi-search"/>
                          <InputText v-model="Filtros['global'].value" placeholder="Busqueda...." />
                      </span>
                  </div>
              </template>
        <Column field="Id" header="Id"></Column>
        <Column field="Usuario" header="Usuario"></Column>
        <Column field='Fecha_Solicitud' header="Fecha de Solicitud">
          <template #body="slotProps">
            <span >{{moment(slotProps.data.Fecha_Solicitud).utc().format('h:mm:ss a -- DD/MM/YY ')}}</span>
          </template>
          
        </Column>    
        <Column field="CommentDelivery" header="Comentario"></Column>
        <Column header="Snapshot">
                      <template #body=slotProps>
                          <Button id="Id"  icon="pi pi-pencil" class="p-button-info p-button-rounded mr-2 " @click="openDialog(slotProps.data.Id)" />
                      </template></Column>
  
        </DataTable>
      </div>
      <div>
        <Dialog v-model:visible="dialogOrders"  header="Peticiones" :modal="true" 
        class="p-fluid min-height:50px;">
            <div id="test" >
                  <Camera  :resolution="{width:175,height:312}" ref="camera" :autoplay="true"/>
            </div>
            
          <Divider></Divider>
          <template #footer>
              <Button label="Tomar Foto" @click="snapshots" />
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
import moment from 'moment';
import RequestService from "@/services/RequestService";
import store from '@/store/store';
import Camera from 'simple-vue-camera';
import html2canvas from 'html2canvas';

export default {
    setup() {
        onMounted(() => {
            let header = { "token": store.state.token };
            let configuration = { headers: header };
            RequestService.getRequestSignature(configuration).then(response => {
                requestList.value = response.data;
                console.log(response.data);
            });
        });
        //valores y variables
        const requestList = ref([]);
        const ids = ref([]);
        const Filtros = ref({
            "global": { value: null, matchMode: FilterMatchMode.CONTAINS },
            "Nombre": { operator: FilterOperator.AND, constraints: [{ value: null, matchMode: FilterMatchMode.STARTS_WITH }] },
        });
        const headers = ref([
            { text: "Id", align: "start", sortable: false, value: "Id" },
            { text: "Usuario", value: "Usuario", sortable: false },
            { text: "Fecha Solicitud", value: "Fecha_Solicitud", sortable: false },
        ]);
        const headersItems = ref([
            { text: "Id Codigo", align: "start", sortable: false, value: "Id_Request" },
            { text: "Codigo", value: "Codigo_Item" },
            { text: "Cantidad Solicitada", align: "start", sortable: false, value: "Cantidad_Solicitada" },
        ]);
        const formatDate = (val) => {
            return val.toLocalDateString("en-US", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric"
            });
        };
        const camera = ref();

// Use camera reference to call functions
        
        



        //
        const dialogOrders = ref(false);
        const submitted = ref(false);
        const arrsid = ref([]);
        // metodos
        const openDialog = (val) => {
            dialogOrders.value = true;
            submitted.value = false;
            ids.value = val;
            arrsid.value.push(val);
            console.log(val);
            console.log("btn pressed");
        };
        const snapshots =() => {
            var val =arrsid.value.pop();
            console.log(val)
            submitted.value=true;
          var node = document.getElementById("test");
          console.log(node);
          html2canvas(node).then(canvas=>{
            canvas.style.display='none'
            document.body.appendChild(canvas)
            return canvas
          }).then(canvas=>{
            const image = canvas.toDataURL('image/png')
            console.log(image);
            let header = { "token": store.state.token };
            let configuration = { headers: header };
            var data ={
                Signature:image,
                Estado:2
            }
            RequestService.updateRequestSignature(val,data,configuration);
          })
          



          let header = { "token": store.state.token };
            let configuration = { headers: header };
            RequestService.getRequestSignature(configuration).then(response => {
                requestList.value = response.data;
                console.log(response.data);
            });
            dialogOrders.value=false;

         }
        
       
        const closeDialog = () => {
            submitted.value = false;
            dialogOrders.value = false;
        };
        return { requestList, Filtros, headers, headersItems, ids, arrsid, //Datos precargados
            dialogOrders, submitted, // mutadores
            openDialog, closeDialog, //resto
             formatDate, moment,snapshots,camera // Metodos
        };
    },
    components: { Camera }
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
  