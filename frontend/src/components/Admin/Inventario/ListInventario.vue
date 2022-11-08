<template>
    
  <div class="surface-100 border-solid border-round-xl">
    <div class="pt-2 pl-2">
      <Toolbar class="mb-4">
                <template #start>
                    <Button label="Agregar" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                    <Button label="Eliminar"  icon="pi pi-trash" class="p-button-danger" @click="confirmDeleteSelecteds"  hidden />
                </template>
                <template #end>
                    <Button label="Exportar" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
                </template>
                
        </Toolbar>



      <DataTable 
      ref="dt"
      :value="inventory"
      :dataKey="CODIGO"
      :paginator="true"
      :rows="10"
      :filters="Filtros"
      :rowsPerPageOptions="[5,10,25]"
      v-model:selection="selectedInventory"
      currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} registros en inventario"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :globalFilterFields="['MATERIAL','CODIGO']" responsiveLayout="scroll">
      <template #header>
                 <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                    <h5 class="mb-2 md:m-0 p-as-md-center">Inventario</h5>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search"/>
                        <InputText v-model="Filtros['global'].value" placeholder="Busqueda...." />
                    </span>
                 </div>
            </template>
      <Column field="CODIGO" header="Codigo"></Column>
      <Column field="MATERIAL" header="Nombre"></Column>
      <Column field="LOTE" header="Lote"></Column>
      <Column field="STOCK" header="Stock"></Column>
      <Column field="STOCKMINIMO" header="Stock Minimo"></Column>
      <Column header="Acciones">
        <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="openEdit(slotProps.data)"  />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteSelected(slotProps.data)" />
                    </template></Column>

      </DataTable>
    </div>

    <!-- Dialog nuevo inventario-->
    <Dialog v-model:visible="inventoryDialog" :style="{width: '450px'}" header="Detalles de inventario" :modal="true" class="p-fluid">
            <div class="field">
                <label for="CODIGO">Codigo</label>
                <InputText id="CODIGO" v-model.trim="inventory.CODIGO" required="true" autofocus :class="{'p-invalid': submitted && !inventory.CODIGO}" />
                <small class="p-error" v-if="submitted && !inventory.CODIGO">Codigo es  requerido.</small>
            </div>
            <div class="field">
                <label for="MATERIAL">Material</label>
                <InputText id="MATERIAL" v-model.trim="inventory.MATERIAL" required="true" autofocus :class="{'p-invalid': submitted && !inventory.MATERIAL}" />
                <small class="p-error" v-if="submitted && !inventory.MATERIAL">Nombre es  requerido.</small>
            </div>
            <div class="field">
                <label for="LOTE">Lote</label>
                <Dropdown id="LOTE" v-model="inventory.LOTE" :options="Lote" optionLabel="label" optionValue="value" placeholder="Seleccione Lote" 
                required="true"  autofocus :class="{'p-invalid': submitted && !inventory.LOTE}" />
                
                <small class="p-error" v-if="submitted && !inventory.LOTE">Lote es  requerido.</small>
            </div>


           
            <div class="formgrid grid">
                <div class="field col">
                    <label for="STOCK">Stock</label>
                    <InputNumber id="STOCK" v-model="inventory.STOCK" integeronly/>
                </div>
                <div class="field col">
                    <label for="STOCKMINIMO">Stock Minimo</label>
                    <InputNumber id="STOCKMINIMO" v-model="inventory.STOCKMINIMO" integeronly />
                </div>
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialog"/>
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="save" />
            </template>
        </Dialog>

    <!-- Dialog editar inventario-->
    <Dialog v-model:visible="inventoryDialogEdit" :style="{width: '450px'}" header="Detalles de inventario" :modal="true" class="p-fluid">
            <div class="field">
                <label for="CODIGO">Codigo</label>
                <InputText id="CODIGO" disabled v-model.trim="inventory.CODIGO" required="true" autofocus :class="{'p-invalid': submitted && !inventory.CODIGO}" />
                <small class="p-error" v-if="submitted && !inventory.CODIGO">Codigo es  requerido.</small>
            </div>
            <div class="field">
                <label for="MATERIAL">Material</label>
                <InputText id="MATERIAL" v-model.trim="inventory.MATERIAL" required="true" autofocus :class="{'p-invalid': submitted && !inventory.MATERIAL}" />
                <small class="p-error" v-if="submitted && !inventory.MATERIAL">Material es  requerido.</small>
            </div>
            <div class="field">
                <label for="LOTE">Lote</label>
                <Dropdown id="LOTE" v-model="inventory.LOTE" :options="Lote" optionLabel="label" optionValue="value" placeholder="Seleccione Lote" 
                required="true"  autofocus :class="{'p-invalid': submitted && !inventory.LOTE}" />
                
                <small class="p-error" v-if="submitted && !inventory.LOTE">Lote es  requerido.</small>
            </div>
            <div class="formgrid grid">
                <div class="field col">
                    <label for="STOCK">Stock</label>
                    <InputNumber id="STOCK" v-model="inventory.STOCK" integeronly/>
                </div>
                <div class="field col">
                    <label for="STOCKMINIMO">Stock Minimo</label>
                    <InputNumber id="STOCKMINIMO" v-model="inventory.STOCKMINIMO" integeronly />
                </div>
            </div>
            <template #footer>
                <Button label="Cancelar" icon="pi pi-times" class="p-button-text" @click="hideDialogEdit"/>
                <Button label="Guardar" icon="pi pi-check" class="p-button-text" @click="editInventory" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteInventoryDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
            <div class="confirmation-content">
              <InputText id="CODIGO" hidden disabled v-model.trim="inventory.CODIGO" required="true" autofocus :class="{'p-invalid': submitted && !inventory.CODIGO}" />
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="inventory">Estas seguro de querer eliminar <b>{{inventory.MATERIAL}}</b>?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteInventoryDialog = false"/>
                <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteInventory" />
            </template>
        </Dialog>

        <Dialog v-model:visible="deleteInventorysDialog" :style="{width: '450px'}" header="Confirmar" :modal="true">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span v-if="product">Estas seguro de querer eliminar estos inventarios?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteInventorysDialog = false"/>
                <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteSelectedInventorys" />
            </template>
        </Dialog>

  </div>
    
    
  </template>
  
  <script>
 // import axios from "axios";
import InventarioService from "../../../services/InventarioService.js";
import {FilterMatchMode,FilterOperator} from 'primevue/api';       
import store from "@/store/store";

  export default {
    data() {
      return {
        
        inventory: [],
        inventoryDialog: false,
        inventoryDialogEdit: false,
        deleteInventoryDialog:false,
        deleteInventorysDialog:false,
        selectedInventory:false,
        Filtros:{
          'global':{value:null, matchMode: FilterMatchMode.CONTAINS},
          'Nombre': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        },
         headers: [
            {text:"Codigo", align: "start",sortable:false, value:"CODIGO"},
            {text:"Material", value:"MATERIAL", sortable: false},
            {text:"Lote", value:"LOTE", sortable: false},
            {text:"Stock", value:"STOCK", sortable: false},
            {text:"Stock Minimo", value:"STOCKMINIMO", sortable: false},
            
        ],
        Lote: [
          {label : 'Valorado', value: 'VALORADO'},
          {label: 'No valorado', value: 'NOVALORADO'},
        ]
        
      };

      
    },
    methods: {
      getInventory() {
        let header = {"token":store.state.token};
        let configuration = {headers: header};
        console.log(configuration);
        InventarioService.getAll(configuration)
          .then(response => {
            this.inventory = response.data;
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
  
      refreshList() {
        this.getInventory();
        this.currentItems = null;
        this.currentIndex = -1;
      },
  
      setActiveInventory(inventory, index) {
        this.currentItems = inventory;
        this.currentIndex = inventory ? index : -1;
      },
      
      searchTitle() {
        InventarioService.findByTitle(this.CODIGO)
          .then(response => {
            this.inventory = response.data;
            this.setActiveTutorial(null);
            console.log(response.data);
          })
          .catch(e => {
            console.log(e);
          });
      },
      openNew(){
        
        this.submitted= false;
        this.inventoryDialog=true;
      },
      openEdit(inventory){
        this.inventory.CODIGO = inventory.CODIGO;
        this.inventory.MATERIAL = inventory.MATERIAL;
        this.inventory.LOTE = inventory.LOTE;
        this.inventory.STOCK = inventory.STOCK;
        this.inventory.STOCKMINIMO = inventory.STOCKMINIMO;

        this.submitted= false;
        this.inventoryDialogEdit=true;
      },
      hideDialog(){
        this.inventoryDialog=false;
        this.submitted=false;
      },
      hideDialogEdit(){
        this.inventoryDialogEdit=false;
        this.submitted=false;
      },
      save() {
        let header = {"token":store.state.token};
        let configuration = {headers: header};
        console.log(configuration);
        var data = {
          MATERIAL: this.inventory.MATERIAL,
          CODIGO: this.inventory.CODIGO,
          LOTE: this.inventory.LOTE,
          STOCK: this.inventory.STOCK,
          STOCKMINIMO: this.inventory.STOCKMINIMO,
        };
  
        InventarioService.create(data,configuration)
          .then(response => {
            this.inventory.CODIGO = response.data.CODIGO;
            console.log(response.data);
            this.submitted = true;
            this.inventoryDialog=false;
            this.refreshList();
          })
          .catch(e => {
            console.log(e);
          });
      },
      editInventory(){
        let header = {"token":store.state.token};
        let configuration = {headers: header};
        console.log(configuration);
        var data = {
          MATERIAL: this.inventory.MATERIAL,
          CODIGO: this.inventory.CODIGO,
          LOTE: this.inventory.LOTE,
          STOCK: this.inventory.STOCK,
          STOCKMINIMO: this.inventory.STOCKMINIMO,
        };
        console.log(data);
        InventarioService.updateBySku(this.inventory.CODIGO, data,configuration)
        .then(response =>{
          console.log(response.data);
          this.submitted= true;
          this.inventoryDialogEdit=false;
          this.refreshList();
        })
        .catch(e => {
          console.log(e);
        })
      },

      confirmDeleteSelected(inventory){
        this.inventory.CODIGO = inventory.CODIGO;
        this.inventory.MATERIAL = inventory.MATERIAL;
        this.deleteInventoryDialog =true;
      },
      confirmDeleteSelecteds(){
       
        this.deleteInventorysDialog =true;
      }
      ,
      deleteInventory(){
        let header = {"token":store.state.token};
        let configuration = {headers: header};
        console.log(configuration);
        console.log(this.inventory.CODIGO);
        InventarioService.deleteBySku(this.inventory.CODIGO,configuration)
        .then(response => {
          console.log(response.data);
          this.refreshList();
          this.$router.push({name: "inventory"});
          this.deleteInventoryDialog=false;

        })
      },

      deleteSelectedInventorys(){
        InventarioService.deleteAll();

      },
      exportCSV() {
            this.$refs.dt.exportCSV();
        },
      
    },
    mounted() {
      this.getInventory();
    }
  };
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
  