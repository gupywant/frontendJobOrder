<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="transaction-add">
    <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">
        <vx-card :title="titleTop">
          <div slot="no-body" class="mt-4 ml-4 mr-4 mb-4">
            <vs-divider color="primary"></vs-divider>
            <div class="vx-row"> 
              <div class="vx-col w-1/2">
                <vx-input-group class="mb-6">
                  Customer
                  <v-select label="name" v-validate="'required'" :options="customerList" @input="onInput()" v-model="customer" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                </vx-input-group>
              </div>
              <div class="vx-col w-1/2">
                <vx-input-group class="mb-6">
                  Vendor
                  <v-select label="name" v-validate="'required'" :options="vendorList" v-model="vendor" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                </vx-input-group>
              </div>
            </div>
            <vs-divider color="primary">Service</vs-divider>
            <div class="vx-row">
              <div class="vx-col w-full">
                <vs-table search max-items="5" :data="availServiceList" class="table-dark-inverted" stripe>
                  <template slot="thead">
                    <vs-th>Service Name</vs-th>
                    <vs-th>Description</vs-th>
                    <vs-th>Qty</vs-th>
                    <vs-th>Planned Amount</vs-th>
                  </template>

                  <template slot-scope="{data}">
                    <vs-tr :key="i" v-for="(tr, i) in data">
                      <vs-td :data="i">
                        <span>{{data[i].name}}</span>
                      </vs-td>
                      <vs-td :data="data[i].description">
                        <span v-if="data[i].description.length >= 10">{{data[i].description.substr(0,10)}}..</span>
                        <span v-else>{{data[i].description.substr(0,10)}}</span>
                      </vs-td>
                      <vs-td>
                        <vs-input v-validate="'required|numeric'" v-model="qty[i]" type="text" placeholder="Quantity" />
                      </vs-td>
                      <vs-td>
                        <vs-input v-validate="'required|numeric'" v-model="planned_amount[i]" type="text" placeholder="Planned Amount" />
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
                <br/>
                <vs-button @click="addModal()" color="primary" type="filled">Add More Service</vs-button>
              </div>
            </div>
          </div>
          <!-- Save & Reset Button -->
          <div class="vx-row">
            <div class="vx-col w-full">
              <div class="mt-8 flex flex-wrap items-center justify-end">
                <vs-button class="ml-auto mt-2" @click="add()">Submit</vs-button>
              </div>
            </div>
          </div>
        </vx-card>
      </div>
    </div>
     <!--popup modal -->
    <div class="centerx">
      <vs-popup class="holamundo"  :title="title" :active.sync="modal">
        <div class="vx-col w-full">  
          <vx-input-group class="mb-6">
            <v-select label="name" :options="options" v-model="newService" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
          </vx-input-group>
        </div>
        <div>
          <vs-button @click="addService()" color="primary" type="filled">Submit</vs-button>
        </div>
      </vs-popup>
    </div>
    <!-- end off popup modal -->
  </div>
</template>

<script>
import vSelect from 'vue-select'
export default {
  data () {
    return {
      x: null,
      qty: [],
      planned_amount: [],
      serviceDisabled: true,
      customerList: [],
      customer: [],
      vendorList: [],
      vendor: [],
      availServiceList: [],
      availService: [],
      avail : false,
      titleTop: 'Create Job Order',
      title: '',
      modal: false,
      newService: [],
      selected: [],
      options: [],
      code: 0
    }
  },
  components: {
    'v-select': vSelect
  },
  created () {
    this.retrieveCustomerList()
    this.retrieveVendorList()
  },
  methods: {
    add () {
      this.addTransaction()
    },
    addModal () {
      this.retrieveServiceList()
      this.title = 'Add New Service'
      this.newService = []
      this.modal = true
    },
    addService () {
      const payload = {
        id_customer: this.customer._id,
        id_service: this.newService._id,
        add: true
      }
      this.$vs.loading()
      this.$store.dispatch('addCustomerService', payload)
        .then(() => {
          this.modal = false
          this.retrieveAvailServiceList()
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Success',
            text: 'New Service Added Successfully',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
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
    retrieveServiceList () {
      this.serviceList = []
      this.$store.dispatch('retrieveServiceList')
        .then((response) => {
          this.options = response.data.data
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
    async onInput () {
      this.availService = []
      if (this.customer.length !== 0) {
        this.serviceDisabled = false
        this.availServiceList = []
        await this.retrieveAvailServiceList()
      }
    },
    confirmAdd () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'primary',
        title: 'Confirmation',
        text: 'This user has no service available, Add new service to this customer?',
        accept: this.addModal,
        acceptText: 'Continue'
      })
    },
    codeDialog () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'info',
        title: 'Success',
        text: `Job order has been created successfully with code TRX-${this.codeGenerator(this.code)}`
      })
    },
    addTransaction () {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          const payload = {
            id_customer: this.customer._id,
            id_vendor: this.vendor._id,
            id_service: this.availServiceList,
            planned_amount: this.planned_amount,
            qty: this.qty
          }
          this.$store.dispatch('addTransaction', payload)
            .then((response) => {
              this.$socket.emit('updateTrx')
              this.$socket.emit('updateApproval1')
              this.code = response.data.code
              //console.log(response.data.code)
              this.codeDialog()
              this.availService = []
              this.customer = []
              this.$vs.loading.close()
              this.$vs.notify({
                title: 'Success',
                text: 'a new transaction has been created',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'success'
              })
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
    retrieveCustomerList () {
      this.$store.dispatch('retrieveCustomerList')
        .then((response) => {
          this.customerList = response.data.data
          this.$vs.loading.close()
        })
        .catch((error) => {
          this.$vs.notify({
            title: 'Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    },
    retrieveVendorList () {
      this.$vs.loading()
      this.$store.dispatch('retrieveVendorList')
        .then((response) => {
          this.vendorList = response.data.data
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
    codeGenerator (code) {
      const max = 5
      let out = ''
      const len = code.toString().length
      for (let n = len; n <= max; n++) {
        out = out.concat('0')
      }
      return out.concat(code.toString())
    },
    retrieveAvailServiceList () {
      const id = this.customer._id
      console.log(this.customer._id)
      this.$store.dispatch('retrieveAvailServiceList', id)
        .then(async (response) => {
          this.availServiceList = response.data.data
        })
        .catch((error) => {
          if (error.message === 'No service found for this customer') {
            this.confirmAdd()
          }
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Error',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    }
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