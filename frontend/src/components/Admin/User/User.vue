(<template>

<div class="surface-100 border-solid border-round-xl pt-2 pl-2" >
      <Toolbar class="mb-4">
                <template #start>
                    <Button label="Crear" icon="pi pi-plus" class="p-button-success mr-2" @click="openNew" />
                </template>
                <template #end>
                    <Button label="Exportar" icon="pi pi-upload" class="p-button-help" @click="exportCSV($event)"  />
                </template>
                
        </Toolbar>



      <DataTable 
      ref="dt"
      :value="users"
      :dataKey="Id"
      :paginator="true"
      :rows="10"
      :filters="Filtros"
      :rowsPerPageOptions="[5,10,25]"
      v-model:selection="selectedUser"
      currentPageReportTemplate="Mostrando {first} hasta {last} de {totalRecords} registros en inventario"
      paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
      :globalFilterFields="['Nombre','Rut']" responsiveLayout="scroll">
      <template #header>
                 <div class="table-header flex flex-column md:flex-row md:justiify-content-between">
                    <h5 class="mb-2 md:m-0 p-as-md-center">Usuarios</h5>
                    <Divider></Divider>
                    <span class="p-input-icon-left">
                        <i class="pi pi-search"/>
                        <InputText v-model="Filtros['global'].value" placeholder="Busqueda...." />
                    </span>
                 </div>
            </template>
      <Column field="Nombre" header="Nombre"></Column>
      <Column field="Apellido" header="Apellido"></Column>
      <Column field="Rut" header="Rut"></Column>
      <Column field="Email" header="Email"></Column>
      <Column field="Password" header="Password" hidden></Column>
      <Column field="Id" header="Id" hidden></Column>
      <Column field="Fecha_Nacimiento" header="Fecha de Nacimiento">
            <template #body="slotProps">
            <span >{{moment(slotProps.data.Fecha_Nacimiento).utc().format('h:mm:ss a -- DD/MM/YY ')}}</span>
          </template>
          </Column>
      <Column field="Fecha_Creaciom" header="Fecha de Ingreso">
            <template #body="slotProps">
            <span >{{moment(slotProps.data.Fecha_Creacion).utc().format('h:mm:ss a -- DD/MM/YY ')}}</span>
          </template>
          </Column>
      <Column field="TipoUser" header="Funcion"></Column>
      <Column header="Acciones">
        <template #body="slotProps">
                        <Button icon="pi pi-pencil" class="p-button-rounded p-button-success mr-2" @click="openEdit(slotProps.data)"  />
                        <Button icon="pi pi-trash" class="p-button-rounded p-button-warning" @click="confirmDeleteSelected(slotProps.data)" />
                    </template></Column>

      </DataTable>
      
    </div>



<Dialog v-model:visible="userDialog" :style="{width: '450px'}" header="Creacion de Usuario Nuevo" :modal="true" class="p-fluid">
    <div>
        <Card class="form">
            <template #header>
                <div>
                    <h5></h5>
                </div>
            </template>
            
            <template #title>
                <div>
                    <h5>Creacion de Usuario</h5>
                </div>
            </template>

            <template #content>
                <div>
                    <span class="p-float-label">
                        <InputText id="Nombre" type="text" v-model.trim="users.Nombre" required/>
                        <label for="Nombre">Nombre</label>
                    </span>
                </div>
                <Divider></Divider>
                <div>
                    <span class="p-float-label">
                        <InputText id="Apellido" type="text" v-model.trim="users.Apellido" required />
                        <label for="Apellido">Apellido</label>
                    </span>
                </div>
                <Divider></Divider>
                <div>
                    <span class="p-float-label">
                        <InputText id="Rut" type="text" v-model.trim="users.Rut" required/>
                        <label for="Rut">Rut</label>
                    </span>
                </div>
                <Divider></Divider>
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
                <div>
                    <span class="p-float-label">
                        <Calendar inputId="Fecha_Nacimiento" dateFormat="dd--mm--yy" v-model="users.Fecha_Nacimiento" required/>
                        <label for="Fecha_Nacimiento">Fecha de Nacimiento</label>
                    </span>
                </div>
                <Divider></Divider>
                <div>
                    <span class="p-float-label">
                        <Dropdown inputId="TipoUser" v-model="Userss" :options="Tipes" v-model.trim="users.TipoUser" optionLabel="name" optionValue="name" placeholder="Seleccione tipo de usuario" required/>
                        <label for="TipoUser">Tipo de Usuario</label>
                        
                    </span>
                </div>
                <Divider></Divider>

            </template>

            <template #footer>
                <div>
                    <Button  label="Crear" icon="pi pi-file-export" class="p-button-rounded p-button-warning" @click="createUser" />
                </div>
            </template>
           
        </Card>
    </div>
</Dialog>

<div>
        <Dialog v-model:visible="editDialog"  header="Usuario" :modal="true" :style="{minWidth:'450px'}" :content-style="{minHeight:'30em'}" class="p-fluid min-height:100px;">
            <div>
        <Card class="form">
            <template #header>
                <div>
                    <h5></h5>
                </div>
            </template>
            
            <template #title>
                <div>
                    <h5>Datos de  Usuario</h5>
                </div>
            </template>

            <template #content>
                <div>
                    <span class="p-float-label">
                        <InputText id="Nombre" type="text" v-model.trim="arrs.Nombre" required/>
                        <label for="Nombre">Nombre</label>
                    </span>
                </div>
                <Divider></Divider>
                <div>
                    <span class="p-float-label">
                        <InputText id="Apellido" type="text" v-model.trim="arrs.Apellido" required />
                        <label for="Apellido">Apellido</label>
                    </span>
                </div>
                <Divider></Divider>
                <div>
                    <span class="p-float-label">
                        <InputText id="Rut" type="text" v-model.trim="arrs.Rut" required/>
                        <label for="Rut">Rut</label>
                    </span>
                </div>
                <Divider></Divider>
                <div>
                    <span class="p-float-label">
                        <InputText id="Email" type="text" v-model.trim="arrs.Email" required/>
                        <label for="Email">Email</label>
                    </span>
                </div>
                <Divider></Divider>
                <div>
                    <span class="p-float-label">
                        <InputText id="Password" type="password" v-model.trim="arrs.Password" required/>
                        <label for="Password">Password</label>
                    </span>
                </div>
                <Divider></Divider>
                <div>
                    <span class="p-float-label">
                        <Dropdown inputId="TipoUser" v-model="Userss" :options="Tipes" v-model.trim="arrs.TipoUser" optionLabel="name" optionValue="name" placeholder="Seleccione tipo de usuario" required/>
                        <label for="TipoUser">Tipo de Usuario</label>
                        
                    </span>
                </div>
                <Divider></Divider>

            </template>

            <template #footer>
                <div>
                    <Button  label="Guardar" icon="pi pi-file-export" class="p-button-rounded p-button-warning" @click="editUser" />
                </div>
            </template>
           
        </Card>
    </div>
       </Dialog>
      </div>



      <Dialog v-model:visible="deleteInventoryDialog" ::modal="true" :style="{minWidth:'250px'}" :content-style="{minHeight:'5em'}" class="p-fluid min-height:50px;">
            <div class="confirmation-content">
                <i class="pi pi-exclamation-triangle mr-3" style="font-size: 2rem" />
                <span >Estas seguro de querer eliminar al usuario?</span>
            </div>
            <template #footer>
                <Button label="No" icon="pi pi-times" class="p-button-text" @click="deleteInventoryDialog = false"/>
                <Button label="Si" icon="pi pi-check" class="p-button-text" @click="deleteInventory" />
            </template>
        </Dialog>
    
</template>

<script>
import {ref, onMounted} from "vue";
import {FilterMatchMode,FilterOperator} from 'primevue/api';   
import moment from 'moment';
import store from "@/store/store";
import InventarioService from "@/services/InventarioService";

export default{
    setup(){
        const tokenhead = {"token":store.state.token};
    const retoken={headers:tokenhead};
        onMounted(()=>{
            
            InventarioService.getUsers(retoken).then(response => 
            {
                     users.value = response.data;
            })
        
      })

      //Dt
        const users = ref([]);
        const arrs = ref([]);
        const selectedUser = ref();
        

        //fechas
        let today = new Date();
        let month = today.getMonth();
        let year = today.getFullYear();
        let prevMonth = (month === 0) ? 11 : month -1;
        let prevYear = (prevMonth === 11) ? year - 1 : year;
        let nextMonth = (month === 11) ? 0 : month + 1;
        let nextYear = (nextMonth === 0) ? year + 1 : year;

        const minDate = ref(new Date());
        const maxDate = ref(new Date());
        const invalidDates = ref();

        const date = ref();

        const responsiveOptions = ref([
            {
                breakpoint: '1400px',
                numMonths: 2
            },
            {
                breakpoint: '1200px',
                numMonths: 1
            }
        ]);

        minDate.value.setMonth(prevMonth);
        minDate.value.setFullYear(prevYear);
        maxDate.value.setMonth(nextMonth);
        maxDate.value.setFullYear(nextYear);

        let invalidDate = new Date();
        invalidDate.setDate(today.getDate() - 1);
        invalidDates.value = [today, invalidDate];

        // fechas fin

        const Userss = ref();
        const submitted = ref(false);
        const userDialog = ref(false);
        const editDialog = ref(false);
        const deleteInventoryDialog = ref(false);
        const Tipes = ref([
            {name:'Admin'},
            {name:'Recepcion'}
        ]);

        // DT
        const selectedInventory = ref(false);
        const Filtros = ref({
          'global':{value:null, matchMode: FilterMatchMode.CONTAINS},
          'Nombre': {operator: FilterOperator.AND, constraints: [{value: null, matchMode: FilterMatchMode.STARTS_WITH}]},
        });
        const  headers = ref([
            {text:"Nombre", align: "start",sortable:false, value:"Nombre"},
            {text:"Apellido", value:"Apellido", sortable: false},
            {text:"Rut", value:"Rut", sortable: false},
            {text:"Email", value:"Email", sortable: false},
            {text:"Fecha_Nacimiento", value:"Fecha_Nacimiento", sortable: false},
            {text:"Fecha_Creacion", value:"Fecha_Creacion", sortable: false},
            
        ]);

        const openNew = ()=>{
            submitted.value =false;
            userDialog.value = true;
            arrs.value=[];
            console.log("btn pressed");
        }
        const close =()=>{
            submitted.value=false;
            userDialog.value=false;
        }
        const createUser =()=>{
            submitted.value=true;
            
            var data = {
                Nombre:users.value.Nombre,
                Apellido:users.value.Apellido,
                Rut:users.value.Rut,
                Email:users.value.Email,
                Password:users.value.Password,
                TipoUser:users.value.TipoUser,
                Fecha_Nacimiento:users.value.Fecha_Nacimiento.toISOString().split('T').join(' ').split('Z').join(''),
                Fecha_Creacion:new Date().toISOString().split('T').join(' ').split('Z').join(''),
            }
            InventarioService.createUser(data,retoken).then(response =>{
                users.value.push(response.data);
                console.log("paso");
            }).then(
                userDialog.value=false,
            ).then(
                InventarioService.getUsers(retoken).then(response => 
            {
                     users.value = response.data;
            })
            ).catch(e => {
            console.log(e);
          });
        }
        
        var Id
        const openEdit =(datos)=>{
            editDialog.value=true;
            
            console.log(datos);
            Id=datos.Id;
            console.log(Id);
            arrs.value.Nombre=datos.Nombre;
            arrs.value.Apellido=datos.Apellido;
            arrs.value.Rut=datos.Rut;
            arrs.value.Email=datos.Email;
            arrs.value.Password=datos.Password;
            arrs.value.TipoUser=datos.TipoUser;
        }

        const editUser=()=>{
            submitted.value=true;
            
            var data = {
                Nombre:arrs.value.Nombre,
                Apellido:arrs.value.Apellido,
                Rut:arrs.value.Rut,
                Email:arrs.value.Email,
                Password:arrs.value.Password,
                TipoUser:arrs.value.TipoUser,
                Fecha_Nacimiento:arrs.value.Fecha_Nacimiento,
                Fecha_Creacion:arrs.value.Fecha_Creacion,
            }
            InventarioService.updateUser(Id,data,retoken).then(response =>{
                users.value.push(response.data);
                console.log("paso");
            }).catch(e => {
            console.log(e);
          });
          
            editDialog.value=false;
            InventarioService.getUsers(retoken).then(response => 
            {
                     users.value = response.data;
            })
        }

        var Idelete;
        const confirmDeleteSelected=(datos)=>{
            deleteInventoryDialog.value =true;
            Idelete=datos.Id;
        }
        const deleteInventory=()=>{
            submitted.value=true;
            console.log(Idelete);
            InventarioService.deleteUser(Idelete,retoken)
            InventarioService.getUsers(retoken).then(response => 
            {
                     users.value = response.data;
            })
            deleteInventoryDialog.value =false;
        }





        return { minDate, maxDate, invalidDates, date, responsiveOptions, Userss,Tipes,moment, userDialog
        , selectedInventory, editDialog,deleteInventoryDialog,Filtros, headers, openNew,createUser, users,close,openEdit,selectedUser,
        deleteInventory,arrs,editUser,Id,confirmDeleteSelected,Idelete }
    }
}
</script>

<style lang="scss" scoped>

</style>)