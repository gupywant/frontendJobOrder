<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="transaction-settled">
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
                    <v-select :disabled="serviceDisabled" label="name" v-validate="'required'" @input="findSameVendor(j - 1)" :options="vendorList" v-model="vendor[j-1]" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                  </vx-input-group>
                </div>
              </div>
              <div class="vx-row">
                <div class="vx-col w-full">
                  <vs-table :data="registeredService" class="table-dark-inverted" stripe>
                    <template slot="thead">
                      <vs-th>Service Name</vs-th>
                      <vs-th>Description</vs-th>
                      <vs-th>Settlement Qty</vs-th>
                      <vs-th>Settlement Planned Amount</vs-th>
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
                          <vs-input style="width: 50px" :readonly="serviceDisabled" v-validate="'numeric'" v-model="qty[j-1][i]" type="text" placeholder="Quantity" />
                        </vs-td>
                        <vs-td>
                          <vs-input :readonly="serviceDisabled" v-validate="'numeric'" v-model="planned_amount[j-1][i]" type="text" placeholder="Planned Amount" />
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
                </div>
              </div>
            </div>
          </div>
          <!-- Save & Reset Button -->
          <div class="vx-row">
            <div class="vx-col w-full">
              <div class="mt-8 flex flex-wrap items-center justify-end">
                <vs-button class="ml-auto mt-2" :to="{name: 'dashboard-analytics'}">Close</vs-button>
              </div>
            </div>
          </div>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import vSelect from 'vue-select'
export default {
  data () {
    return {
      serviceDisabled: true,
      customerList: [],
      customer: [],
      vendorList: [],
      vendor: [],
      availServiceList: [],
      availService: [],
      settlement: [],
      avail : false,
      titleTop: 'Job Order Settlement',
      title: '',
      options: [],
      vendorCount: 0,
      qty: [[]],
      planned_amount: [[]],
      registeredService: [],
      id_transaction_vendor: [],
      settlementQty: [[]],
      settlementPlanned_amount: [[]]
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
      this.addTransaction()
    },
    retrieveTransactionDetail () {
      const id = this.$route.params.id
      this.$vs.loading()
      this.$store.dispatch('retrieveSettledDetail', id)
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
                this.settlementQty[indexNow].push('0')
                this.qty[indexNow].push(response.data.service[i].qty)
                this.planned_amount[indexNow].push(response.data.service[i].planned_amount)
                this.settlementPlanned_amount[indexNow].push('0')
              } else {
                this.qty[indexNow].push(response.data.service[i].qty)
                this.settlementQty[indexNow].push('0')
                this.planned_amount[indexNow].push(response.data.service[i].planned_amount)
                this.settlementPlanned_amount[indexNow].push('0')
                indexNow += 1
                this.qty.push([])
                this.settlementQty.push([])
                this.planned_amount.push([])
                this.settlementPlanned_amount.push([])
              }
            } else {
              this.qty[indexNow].push(response.data.service[i].qty)
              this.settlementQty[indexNow].push('0')
              this.planned_amount[indexNow].push(response.data.service[i].planned_amount) 
              this.settlementPlanned_amount[indexNow].push('0')
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
    onInput () {
      this.availService = []
      if (this.customer.length !== 0) {
        this.serviceDisabled = false
        this.availServiceList = []
        this.retrieveAvailServiceList()
      }
    },
    saveTransaction () {
      this.$validator.validateAll().then(async (result) => {
        if (result) {
          const payload = {
            _id: this.$route.params.id,
            id_customer: this.customer.id_customer,
            id_vendor: this.vendor._id,
            id_service: this.settlement
          }
          this.$vs.loading()
          this.$store.dispatch('settlementTransaction', payload)
            .then(async () => {
              await this.$socket.emit('updateSettlement')
              this.$router.push({name: 'transaction-settlement-list'})
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
      const id = this.customer.id_customer
      console.log(this.customer)
      this.$store.dispatch('retrieveAvailServiceList', id)
        .then(async (response) => {
          this.availServiceList = await response.data.data
          this.titleTop = `Transaction Edit - Code : TRX-${this.codeGenerator(response.data.data[0].code)}`
          await response.data.amount.map(item => this.planned_amount.push(item.planned_amount))
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
.col-input-table{
  width: 5%;
}
</style>