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
              <div class="vx-col w-1/2">
                <vx-input-group class="mb-6">
                  Customer
                  <v-select label="name" :options="customerList" :disabled="serviceDisabled" @input="onInput()" v-model="customer" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                </vx-input-group>
              </div>
              <div class="vx-col w-1/2">
                <vx-input-group class="mb-6">
                  Vendor
                  <v-select label="name" :options="vendorList" disabled v-model="vendor" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                </vx-input-group>
              </div>
            </div>
          </div>
          <vs-divider color="primary">Service</vs-divider>
            <div class="vx-row">
              <div class="vx-col w-full">
                <vs-table search max-items="5" :data="availServiceList" class="table-dark-inverted" stripe>
                  <template slot="thead">
                    <vs-th>Service Name</vs-th>
                    <vs-th>Description</vs-th>
                    <vs-th>Sattlement Qty</vs-th>
                    <vs-th>Sattlement Amount</vs-th>
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
                        <vs-input style="width: 50px;" readonly v-validate="'required|numeric'" v-model="settlement[i].qty" type="text" placeholder="Planned Amount" />
                      </vs-td>
                      <vs-td>
                        <vs-input v-validate="'required|numeric'" readonly v-model="settlement[i].settlement_amount" type="text" placeholder="Planned Amount" />
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
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
      departmentS:[
        {text:'CSO', value:'0'},
        {text:'Marketing', value:'1'},
        {text:'Operational', value:'2'}
      ],
      department: null,
      x: null,
      planned_amount: [],
      serviceDisabled: true,
      customerList: [],
      customer: [],
      vendorList: [],
      vendor: [],
      availServiceList: [],
      availService: [],
      settlement: [],
      avail : false,
      titleTop: 'Settled Job Order Detail',
      title: '',
      modal: false,
      newService: [],
      selected: [],
      options: []
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
          await response.data.data.map((item) => {
            this.availServiceList.push({id_service: item.service_id, name: item.service_name, description: item.service_description, qty: item.qty, planned_amount: item.planned_amount})
          })
          await response.data.data.map((item) => {
            this.settlement.push({id_service: item.service_id, qty: item.qty, settlement_amount: item.planned_amount})
          })
          this.customer = await {id_customer: response.data.data[0].customer_id, name: response.data.data[0].customer_name}
          this.vendor = {_id: response.data.data[0].vendor_id, name: response.data.data[0].vendor_name}
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