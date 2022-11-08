<template>
    <div class="surface-100 border-solid border-round-xl pt-2 pl-2">
      <div>
        <DataTable 
        ref="dt"
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
                      <h5 class="mb-2 md:m-0 p-as-md-center ">Entregas Finalizadas</h5>
                      <span class="p-input-icon-left">
                          <i class="pi pi-search"/>
                          <InputText v-model="Filtros['global'].value" placeholder="Busqueda...." />
                      </span>
                      <Button label="Exportar" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
                  </div>
              </template>
        <Column field="Id" header="Id" ></Column>
        <Column field="Usuario" header="Solicitante"></Column>
        <Column field="UserDelivery" header="Repartidor"></Column>
        <Column field="Fecha_Solicitud" header="Fecha de Solicitud">
          <template #body="slotProps">
            <span >{{moment(slotProps.data.Fecha_Solicitud).utc().format('h:mm:ss a -- DD/MM/YY ')}}</span>
          </template></Column>
        <Column field="Fecha_Entrega" header="Fecha de Entrega">
          <template #body="slotProps">
            <span >{{moment(slotProps.data.Fecha_Solicitud).utc().format('h:mm:ss a -- DD/MM/YY ')}}</span>
          </template></Column>
        <Column field="CommentDelivery" header="Comentario del repartidor"></Column>
        <Column  header="Firma">
            <template #body="slotProps">
                <img :style="{width:'100px',height:'100px'}"  :src="slotProps.data.Signature" :alt="slotProps.data.Signature">
            </template>
        </Column>
        <Column header="Detalle">
            <template #body="slotProps">
              <Button label="Detalles" @click="openDialog(slotProps.data.Id)"/>
            </template>
        </Column>
        </DataTable>
      </div>
      <div>
        <Dialog v-model:visible="Details"  header="Detalles" :modal="true" :style="{minWidth:'50em'}" :content-style="{minHeight:'30em'}" class="p-fluid min-height:100px;">
        <!--Datatable con detalles de pedido-->
        <div>       
          <DataTable 
          ref="dt"
          :value="requestDetail"
          :dataKey="Id"
          :paginator="true"
          :rows="5"
          :rowsPerPageOptions="[5,10,25]"
          currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} registros en inventario"
          paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
          responsiveLayout="scroll">
          <template #header >
                    <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                        <h5 class="mb-2 md:m-0 p-as-md-center ">Materiales Entregados</h5>
                        
                    </div>
                </template>
                <div>
                  <Column field="Id" header="Id"></Column>
                  <Column field="Codigo_Item" header="Codigo"></Column>
                  <Column field="MATERIAL" header="Material"></Column>
                  <Column field="Cantidad_Solicitada" header="Cantidad Solicitada"></Column>
                  <Column field="Cantidad_Entregada" header="Cantidad Entregada"></Column>
                </div>
          </DataTable>
        </div>
        
        <template #footer>
          <div class=" flex align-items-start">
               <Button  label="Exportar" icon="pi pi-file-export" class="p-button-text" @click="exportCSV($event)"/>
                
               <Button label="Cerrar" icon="pi pi-check" class="p-button-text" @click="closeDialog"/>
          </div>
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

export default {
  setup() {

    onMounted(()=>{
      let header = {"token":store.state.token};
        let configuration = {headers: header};
      RequestService.getrequestComplete(configuration).then(response => 
      {requestList.value = response.data
        console.log(response.data);
      })
      
    })
    //Arays y Objetos
    const requestList = ref([]);
    const requestDetail =ref([]);
    const dt = ref();
    //array almacena id
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

    //Dialog
    const Details =ref(false);

    const openDialog = (val)=>{
      console.log(val);
      let header = {"token":store.state.token};
        let configuration = {headers: header};
      RequestService.getRequestItems(val,configuration).then(response =>
      {
        requestDetail.value = response.data;
        console.log(response.data);
        
      })
      Details.value=true;

    }
    const closeDialog = ()=>{
      Details.value=false;
    }
    const exportCSV = () => {
            dt.value.exportCSV();
        };
    
    return {requestList, Filtros, headers,headersItems,moment,requestDetail,dt,//Datos precargados
            Details, openDialog,closeDialog//Dialog
            ,exportCSV
       

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
  