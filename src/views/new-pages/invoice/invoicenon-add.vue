<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="invoice-add">
    <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">
        <vx-card :title="titleTop">
          <div slot="no-body" class="mt-4 ml-4 mr-4 mb-4">
            <vs-divider color="primary"></vs-divider>
            <div class="vx-row"> 
              <div class="vx-col w-full">
                <vx-input-group class="mb-12">
                  Customer
                  <v-select label="list" v-validate="'required'" :options="customerList" @input="onInput()" v-model="customer" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                </vx-input-group>
              </div>
            </div>
            <vs-divider color="primary">Create Invoice</vs-divider>
            <div class="vx-row">
              <div class="vx-col w-full">
                <vs-table search max-items="5" :data="acceptedList" class="table-dark-inverted" stripe>
                  <template slot="thead">
                    <vs-th></vs-th>
                    <vs-th>Job Order</vs-th>
                    <vs-th>PO Ref.</vs-th>
                    <vs-th>Qty</vs-th>
                    <vs-th>Amount</vs-th>
                    <vs-th>Total</vs-th>
                  </template>

                  <template slot-scope="{data}">
                    <vs-tr :key="i" v-for="(tr, i) in data">
                      <vs-td>
                        <vs-checkbox v-model="data[i].select"></vs-checkbox>
                      </vs-td>
                      <vs-td :data="i">
                        <span>{{data[i].code}}</span>
                      </vs-td>
                      <vs-td>
                        <vs-input v-model="data[i].ref" type="text" placeholder="PO Reference" />
                      </vs-td>
                      <vs-td>
                        <vs-input style="width: 100px;" v-model="data[i].qty" type="number" placeholder="Qty" />
                      </vs-td>
                      <vs-td>
                        <vs-input v-model="data[i].settlement_amount" type="number" placeholder="Amount" />
                      </vs-td>
                      <vs-td>
                        <vs-input readonly v-validate="'required|numeric'" v-bind:value="`${data[i].settlement_amount*data[i].qty}`" type="number" placeholder="Total Amount" />
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
              </div>
              <div class="vx-col w-full">
                <vx-input-group class="mb-2 mt-6 w-1/4">
                  <vs-input label="PPN" v-validate="'required|numeric'" v-model="ppn" type="text" placeholder="PPN" />
                </vx-input-group>
              </div>
              <div class="vx-col w-full">
                <vx-input-group class="mb-6 w-1/4">
                  <vs-input label="PPH" v-validate="'required|numeric'" v-model="pph" type="text" placeholder="PPH" />
                </vx-input-group>
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
      titleTop: 'Create Non-Regular Invoice',
      title: '',
      modal: false,
      selected: [],
      options: [],
      code: 0,
      //invoice
      accepted: [],
      acceptedList: [],
      ppn: '',
      pph: ''
    }
  },
  components: {
    'v-select': vSelect
  },
  created () {
    this.retrieveCustomerList()
  },
  methods: {
    add () {
      const err = 'Form not filled correctly'
      const selectErr = 'Select minimum one job order to submit'
      let count = 1
      let selected = 0
      try {
        if (this.pph === '' || this.ppn === '') throw err
        if (this.customer.length === 0) throw err
        this.acceptedList.forEach((item) => {
          if (item.select === true) {
            if (item.ref === '') throw err
            if (item.qty === '') throw err
          } else {
            selected++
          }
          if (count === this.acceptedList.length) {
            if (selected === this.acceptedList.length) {
              throw selectErr
            } else {
              //console.log(this.acceptedList)
              this.addInvoice()
            }
          }
          count++
        })
      } catch (err) {
        this.$vs.notify({
          title: 'Error',
          text: err,
          iconPack: 'feather',
          icon: 'icon-alert-circle',
          color: 'danger'
        })
      }
    },
    addInvoice () {
      this.$validator.validateAll().then(result => {
        if (result) {
          this.$vs.loading()
          const payload = {
            customer: this.customer,
            code: this.acceptedList,
            ppn: this.ppn,
            pph: this.pph,
            type: 2
          }
          this.$store.dispatch('addInvoice', payload)
            .then(async (response) => {
              this.$socket.emit('updateInvoice')
              this.$vs.loading.close()
              this.$vs.notify({
                title: 'Success',
                text: 'Invoice created successfully',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'success'
              })
              this.$router.push({name: 'invoice-invoice', params: { id: response.data.id }})
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
        .then(async (response) => {
          await response.data.data.map((item) => {
            this.customerList.push({_id: item._id, name: item.name, list: `CUS-${this.codeGenerator(item.code)}, ${item.name}`})
          })
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
    async retrieveInvoiceAcceptedList () {
      this.$vs.loading()
      await this.$store.dispatch('retrieveInvoiceAcceptedList', this.customer._id)
        .then(async (response) => {
          const seen = new Set()
          const filteredArr = await response.data.data.filter(el => {
            const duplicate = seen.has(el._id)
            seen.add(el._id)
            return !duplicate
          })
          await filteredArr.map(item => {
            this.acceptedList.push({
              _id: item._id,
              code: `TRX-${this.codeGenerator(item.code)}`, 
              ref: '',
              qty: '',
              settlement_amount: item.settlement_amount
            })
          })
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
        this.acceptedList = []
        await this.retrieveInvoiceAcceptedList()
      }
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