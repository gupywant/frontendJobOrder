<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="service-list">
    <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">
        <vx-card title="Service List">
          <template slot="actions">
            <vs-button @click="addModal()" color="primary" type="filled">Add Service</vs-button>
          </template>
          <div slot="no-body" class="mt-4">
            <vs-table search max-items="5" pagination :data="serviceList" class="table-dark-inverted" stripe>
              <template slot="thead">
                <vs-th>NO</vs-th>
                <vs-th>SERVICE CODE</vs-th>
                <vs-th>NAME</vs-th>
                <vs-th>Description</vs-th>
                <vs-th>CREATED AT</vs-th>
                <vs-th>UPDATED AT</vs-th>
                <vs-th>DETAIL</vs-th>
                <vs-th>DELETE</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :key="i" v-for="(tr, i) in data">
                  <vs-td :data="i">
                    <span>{{i+1}}</span>
                  </vs-td>
                  <vs-td :data="data[i]._id">
                    <span>{{data[i]._id}}</span>
                  </vs-td>
                  <vs-td :data="data[i].name">
                    <span>{{data[i].name}}</span>
                  </vs-td>
                  <vs-td :data="data[i].description">
                    <span v-if="data[i].description.length >= 10">{{data[i].description.substr(0,10)}}..</span>
                    <span v-else>{{data[i].description.substr(0,10)}}</span>
                  </vs-td>
                  <vs-td :data="data[i].createdAt">
                    <span>{{format_date(data[i].createdAt)}}</span>
                  </vs-td>
                  <vs-td :data="data[i].updatedAt">
                    <span>{{format_date(data[i].updatedAt)}}</span>
                  </vs-td>
                  <vs-td>
                    <vs-button @click="editModal(data[i])" color="primary" icon="create" type="border"></vs-button>
                  </vs-td>
                  <vs-td>
                    <vs-button @click="deleteService(data[i])" color="primary" icon="delete" type="border"></vs-button>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vx-card>
      </div>
    </div>
    <!--popup modal -->
    <div class="centerx">
      <vs-popup class="holamundo"  :title="title" :active.sync="modal">
        <div class="vx-col w-full">  
          <vx-input-group class="mb-6">
            <vs-input label="Service Name" v-validate="'required|min:1'" v-model="name" type="text" placeholder="Service Name" />
          </vx-input-group>
        </div>
        <div class="vx-col w-full">  
          <vx-input-group class="mb-6">
            <vs-textarea label="Description" v-validate="'required|min:1'" v-model="description" placeholder="Description" />
          </vx-input-group>
        </div>
        <div>
          <vs-button v-if="!edit" @click="addService()" color="primary" type="filled">Save</vs-button>
          <vs-button v-else @click="editService()" color="primary" type="filled">Save</vs-button>
        </div>
      </vs-popup>
    </div>
    <!-- end off popup modal -->
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      title: '',
      edit: false,
      modal: false,
      data: null,
      serviceList: [],
      id: '',
      name: '',
      description: ''
    }
  },
  async created () {
    this.loadData()
    this.$vs.loading()
    this.sockets.subscribe('updateService', () => {
      this.retrieveServiceList()
    })
  },
  methods: {
    loadData () {
      this.retrieveServiceList()
    },
    retrieveServiceList () {
      this.serviceList = []
      this.$store.dispatch('retrieveServiceList')
        .then((response) => {
          this.serviceList = response.data.data
          this.$vs.loading.close()
        })
        .catch((error) => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    },
    addModal () {
      this.title = 'Add New Service'
      this.edit = false
      this.name = ''
      this.description = ''
      this.modal = true
    },
    addService () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const payload = {
            name: this.name,
            description: this.description
          }
          this.$vs.loading()
          this.$store.dispatch('addService', payload)
            .then((response) => {
              console.log(response)
              this.modal = false
              this.$vs.loading.close()
              this.$vs.notify({
                title: 'Success',
                text: 'a new service has been created',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'success'
              })
              this.$socket.emit('updateService')
              //this.retrieveServiceList()
            })
            .catch((error) => { 
              this.$vs.loading.close()
              this.$vs.notify({
                title: 'Error',
                text: error.message,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
              })
            }) 
        } else {
          this.$vs.notify({
            title: 'Error',
            text: 'Make sure form is correct!!',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        }
      })
    },
    editService () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const payload = {
            id: this.id,
            name: this.name,
            description: this.description
          }
          this.$vs.loading()
          this.$store.dispatch('editServiceData', payload)
            .then(() => {
              this.$vs.loading.close()
              this.$vs.notify({
                title: 'Success',
                text: 'Update Success',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'success'
              })
              this.modal = false
              this.$socket.emit('updateService')
            })
            .catch((error) => {
              this.$vs.loading.close()
              this.$vs.notify({
                title: 'Error',
                text: error.message,
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'danger'
              })
            })
        } else {
          this.$vs.notify({
            title: 'Error',
            text: 'Make sure form is correct!!',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        }
      })
    },
    editModal (data) {
      this.title = `Edit ${data.name}`
      this.edit = true
      this.name = data.name
      this.description = data.description
      this.id = data._id
      this.modal = true
    },
    deleteService (data) {
      this.name = data.name
      this.id = data._id
      this.deleteConfirm()
    },
    deleteConfirm () {
      this.$vs.dialog({
        type:'confirm',
        color: 'danger',
        title: 'Confirm',
        text: `Are you sure want to delete ${this.name} service?`,
        accept:this.acceptAlert
      })
    },
    acceptAlert () {
      this.$vs.loading()
      this.$store.dispatch('deleteService', this.id)
        .then(() => {
          this.$vs.loading.close()   
          this.$vs.notify({
            color:'danger',
            title:'Deleted service',
            text:'The selected Service was successfully deleted'
          })
          this.$socket.emit('updateService')
        })
        .catch((error) => { 
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    },
    format_date (value) {
      if (value) {
        return moment(String(value)).format('D MMM YYYY')
      }
    }
  },
  beforeDestroy () {
    //clearInterval(this.polling)
  }
}
</script>

<style lang="scss">
/*! rtl:begin:ignore */
#dashboard-analytics {
  .greet-user{
    position: relative;

    .decore-left{
      position: absolute;
      left:0;
      top: 0;
    }
    .decore-right{
      position: absolute;
      right:0;
      top: 0;
    }
  }

  @media(max-width: 576px) {
    .decore-left, .decore-right{
      width: 140px;
    }
  }
}
//ADD BY GUPY WANTORO
.con-images {
  max-height: 500px;
  overflow: auto;
  /*! rtl:end:ignore */
}
</style>