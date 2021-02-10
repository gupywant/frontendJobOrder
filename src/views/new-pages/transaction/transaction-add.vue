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
            <vs-divider color="info"></vs-divider>
            <div class="vx-row"> 
              <div class="vx-col w-full">
                <vx-input-group class="mb-6">
                  Customer
                  <v-select label="name" v-validate="'required'" :options="customerList" @input="onInput()" v-model="customer" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                </vx-input-group>
              </div>
            </div>
            <div :key="j" v-for="j in vendorCount">
              <vs-divider color="primary">Vendor {{ j }}</vs-divider>
              <div class="vx-row">
                <div class="vx-col w-full">
                  <vx-input-group class="mb-6">
                    Vendor
                    <v-select label="name" v-validate="'required'" @input="findSameVendor(j - 1)" :options="vendorList" v-model="vendor[j-1]" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                  </vx-input-group>
                </div>
              </div>
              <div class="vx-row">
                <div class="vx-col w-full">
                  <vs-table max-items="5" :data="availServiceList" class="table-dark-inverted" stripe>
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
                          <vs-input v-validate="'numeric'" v-model="qty[j-1][i]" type="text" placeholder="Quantity" />
                        </vs-td>
                        <vs-td>
                          <vs-input v-validate="'numeric'" v-model="planned_amount[j-1][i]" type="text" placeholder="Planned Amount" />
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
                </div>
              </div>
            </div>
            <vs-divider color="info"></vs-divider>
            <vs-button @click="addModal()" color="primary" style="margin-right: 5px" type="filled">Add More Service</vs-button>
            <vs-button @click="addVendor()" color="primary" type="border">Add More Vendor</vs-button>
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
      qty: [[]],
      planned_amount: [[]],
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
      code: 0,
      vendorCount: 1,
      vendorLength: 0
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
      console.log(this.vendor[0])
      console.log(this.qty[0][0])
      console.log(this.planned_amount[0][0])
      this.addTransaction()
    },
    addVendor () {
      if (this.vendorCount < this.vendorLength) {
        this.qty.push([])
        this.planned_amount.push([])
        this.vendorCount += 1
        this.vendor.push({})
      } else {
        this.maxDialog()
      }
    },
    findSameVendor (n) {
      let foundVendor = 0
      this.vendor.map((item) => {
        console.log(`find ${item.name} | current ${this.vendor[n].name}`)
        if (item.name === this.vendor[n].name) {
          foundVendor += 1
        }
        if (foundVendor > 1) {
          this.vendor[n] = {}
          this.foundVendorDialog()
        }
      })
    },
    foundVendorDialog () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'info',
        title: 'Warning',
        cancelText: 'Ok',
        text: 'This vendor already selected'
      })
    },
    maxDialog () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'info',
        title: 'Warning',
        cancelText: 'Ok',
        text: 'You have been reached the maximum vendor fields'
      })
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
        cancelText: 'Ok',
        text: `Job order has been created successfully with code TRX-${this.codeGenerator(this.code)}`
      })
    },
    addTransaction () {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          const payload = {
            id_customer: this.customer._id,
            vendor: this.vendor,
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
          this.vendorLength = response.data.data.length
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
          console.log(this.availServiceList)
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