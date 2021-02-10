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
                  <v-select label="list" disabled v-validate="'required'" :options="customerList" @input="onInput()" v-model="customer" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                </vx-input-group>
              </div>
            </div>
            <vs-divider color="primary">Create Invoice</vs-divider>
            <div class="vx-row">
              <div class="vx-col w-full">
                <vs-table search max-items="5" :data="invoice" class="table-dark-inverted" stripe>
                  <template slot="thead">
                    <vs-th></vs-th>
                    <vs-th>Job Order</vs-th>
                    <vs-th>PO Ref.</vs-th>
                    <vs-th :style="`display: ${invoice[0].type === 1 ? 'none': 'unset'}`">Qty</vs-th>
                    <vs-th>Total Amount</vs-th>
                  </template>

                  <template slot-scope="{data}">
                    <vs-tr :key="i" v-for="(tr, i) in data">
                      <vs-td>
                        <vs-checkbox v-model="data[i].settlement"></vs-checkbox>
                      </vs-td>
                      <vs-td :data="data[i].transaction_code">
                        <span>TRX-{{ codeGenerator(data[i].transaction_code) }}</span>
                      </vs-td>
                      <vs-td>
                        <vs-input v-model="data[i].po_ref" type="text" readonly placeholder="PO Reference" />
                      </vs-td>
                      <vs-td :style="`display: ${invoice[0].type === 1 ? 'none': 'unset'}`">
                        <vs-input v-model="data[i].qty" type="text" readonly placeholder="Qty" />
                      </vs-td>
                      <vs-td>
                        <vs-input readonly v-bind:value="`${invoice[0].type === 1 ? data[i].amount: data[i].amount*data[i].qty}`" type="text" placeholder="Planned Amount" />
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
              </div>
              <div class="vx-col w-full">
                <vx-input-group class="mb-2 mt-6 w-1/4">
                  <vs-input label="PPN" readonly v-validate="'required|numeric'" v-model="invoice[0].ppn" type="text" placeholder="PPN" />
                </vx-input-group>
              </div>
              <div class="vx-col w-full">
                <vx-input-group class="mb-6 w-1/4">
                  <vs-input label="PPH" readonly v-validate="'required|numeric'" v-model="invoice[0].pph" type="text" placeholder="PPH" />
                </vx-input-group>
              </div>
            </div>
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
      avail : false,
      titleTop: 'Settlement Regular Invoice',
      title: '',
      modal: false,
      selected: [],
      options: [],
      code: 0,
      invoice: [],
      ppn: '',
      pph: ''
    }
  },
  components: {
    'v-select': vSelect
  },
  async created () {
    this.invoice.push({transaction_code: 0, ppn: 0, pph: 0, type: 1})
    await this.retrieveInvoiceCustomer()
    //this.retrieveInvoice()
  },
  methods: {
    async retrieveInvoiceCustomer () {
      await this.$store.dispatch('retrieveInvoice', this.$route.params.id)
        .then(async (response) => {
          this.invoice = await response.data.data
          this.customer.push({_id: response.data.data[0].id_customer, name: response.data.data[0].customer_name, list: `CUS-${this.codeGenerator(response.data.data[0].customer_code)}, ${response.data.data[0].customer_name}`})
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
    add () {
      //console.log(this.invoice)
      this.settleInvoice()
    },
    settleInvoice () {
      this.$vs.loading()
      const payload = {
        invoice: this.invoice,
        type: this.invoice[0].type
      }
      this.$store.dispatch('settleInvoice', payload)
        .then(async () => {
          //this.$socket.emit('updateInvoice')
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Success',
            text: 'Invoice saved successfully',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
          this.$router.push({name: 'invoice-settlement'})
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
    async onInput () {
      this.availService = []
      /*if (this.customer.length !== 0) {
        this.acceptedList = []
        await this.retrieveInvoiceAcceptedList()
      }*/
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