<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="transaction-edit">
    <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">
        <vx-card :title="titleTop">
          <div slot="no-body" class="mt-4 ml-4 mr-4 mb-4">
            <vs-divider color="primary"></vs-divider>
            <div class="vx-row"> 
              <div class="vx-col w-full">
                <vx-input-group class="mb-6">
                  Customer
                  <v-select label="name" :options="customerList" :disabled="serviceDisabled" v-model="customer" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
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
                  <vs-table :data="registeredService" class="table-dark-inverted" stripe>
                    <template slot="thead">
                      <vs-th>Service Name</vs-th>
                      <vs-th>Description</vs-th>
                      <vs-th>Qty</vs-th>
                      <vs-th>Planned Amount</vs-th>
                    </template>

                    <template slot-scope="{data}">
                      <vs-tr :key="i" v-for="(tr, i) in data">
                        <vs-td>
                          <span>{{data[i].name}}</span>
                        </vs-td>
                        <vs-td>
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
                <vs-button class="ml-auto mt-2" @click="add()">Save</vs-button>
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
      serviceDisabled: true,
      customerList: [],
      customer: [],
      vendorList: [],
      vendor: [],
      availServiceList: [[]],
      avail : false,
      titleTop: 'Edit Job Order',
      title: '',
      modal: false,
      newService: [],
      selected: [],
      options: [],
      vendorCount: 1,
      qty: [[]],
      planned_amount: [[]],
      vendorLength: 0,
      registeredService: [],
      id_transaction_vendor: []
    }
  },
  components: {
    'v-select': vSelect
  },
  async created () {
    await this.retrieveCustomerList()
    await this.retrieveVendorList()
    await this.retrieveTransactionDetail()
  },
  methods: {
    add () {
      const err = 'Form not filled correctly'
      let count = 1
      try {
        this.vendor.forEach((item, i) => {
          if (this.vendor[i] === null) throw err
          if (item._id === undefined) throw err
          this.qty[i].forEach((qty) => {
            if (qty === null) throw err
            if (qty === '') throw err
          })
          this.planned_amount[i].forEach((amount) => {
            if (amount === null) throw err
            if (amount === '') throw err
          })
          if (count === this.vendorCount) {
            this.saveTransaction()
          }
          count++
        })
      } catch (err) {
        this.$vs.notify({
          title: 'Error',
          text: 'Make sure form is correct!!',
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      }
    },
    addVendor () {
      if (this.vendorCount < this.vendorLength) {
        this.qty.push([])
        this.planned_amount.push([])
        this.registeredService.forEach(() => {
          this.qty[this.vendorCount].push('0')
          this.planned_amount[this.vendorCount].push('0')
        })
        this.vendorCount += 1
        this.vendor.push({})
      } else {
        this.maxDialog()
      }
    },
    findSameVendor (n) {
      //console.log(this.vendor[n])
      const id_vendor_trx_temp = this.id_transaction_vendor[n] === undefined ? 1 : this.id_transaction_vendor[n].id_vendor_trx
      let foundVendor = 0
      this.vendor.forEach((item) => {
        if (item.name === this.vendor[n].name) {
          foundVendor += 1
        }
        if (foundVendor > 1) {
          this.vendor[n] = {}
          this.foundVendorDialog()
        }
      })
      if (foundVendor < 2) {
        this.vendor[n] = {_id: this.vendor[n]._id, name: this.vendor[n].name, id_vendor_trx: id_vendor_trx_temp}
      }
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
        id_code: this.$route.params.id,
        id_vendor: this.vendor[0]._id,
        id_service: this.newService._id,
        edit: true
      }
      this.$vs.loading()
      this.$store.dispatch('addCustomerService', payload)
        .then(async () => {
          this.modal = false
          for (let i = 0; i < this.vendor.length; i++) {
            this.qty[i].push('0')
            this.planned_amount[i].push('0')
          }
          await this.registeredService.push({
            id_service: this.newService._id,
            name: this.newService.name,
            description: this.newService.description,
            new: true
          })
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
    saveTransaction () {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          const payload = {
            _id: this.$route.params.id,
            id_customer: this.customer.id_customer,
            id_vendor: this.vendor,
            id_service: this.registeredService,
            planned_amount: this.planned_amount,
            qty: this.qty
          }
          this.$store.dispatch('editTransaction', payload)
            .then(() => {
              this.$vs.loading.close()
              this.$vs.notify({
                title: 'Success',
                text: 'Transaction has been updated',
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
    //All service list
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
    retrieveTransactionDetail () {
      const id = this.$route.params.id
      this.$vs.loading()
      this.$store.dispatch('retrieveTransactionDetail', id)
        .then(async (response) => {
          const serviceResp = response.data.service
          const seen = new Set()
          const filteredArr = serviceResp.filter(el => {
            const duplicate = seen.has(el.service_id)
            seen.add(el.service_id)
            return !duplicate
          })
          filteredArr.map(item => {
            this.registeredService.push({
              id_service: item.service_id,
              name: item.service_name,
              description: item.service_description,
              new: false
            })
          })
          let indexNow = 0
          for (let i = 0; i < response.data.service.length; i++) {
            if (response.data.service[i + 1] !== undefined) {
              if (response.data.service[i]._id === response.data.service[i + 1]._id) {
                this.qty[indexNow].push(response.data.service[i].qty)
                this.planned_amount[indexNow].push(response.data.service[i].planned_amount)
              } else {
                this.qty[indexNow].push(response.data.service[i].qty)
                this.planned_amount[indexNow].push(response.data.service[i].planned_amount)
                indexNow += 1
                this.qty.push([])
                this.planned_amount.push([])
              }
            } else {
              this.qty[indexNow].push(response.data.service[i].qty)
              this.planned_amount[indexNow].push(response.data.service[i].planned_amount) 
            }
          }
          this.customer = await {id_customer: response.data.data[0].customer_id, name: response.data.data[0].customer_name}
          response.data.data.forEach((item) => {
            this.vendor.push({_id: item.vendor_id, id_vendor_trx: item._id, name: item.vendor_name})
          })
          response.data.data.forEach((item) => {
            this.id_transaction_vendor.push({id_vendor_trx: item._id})
          })
          this.vendorCount = response.data.data.length
          this.$vs.loading.close()
        })
        .catch((error) => {
          this.transaction_not_found = true
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
        .then(async (response) => {
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