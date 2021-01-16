<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="transaction-list">
    <div class="vx-row">
      <!-- CARD 1: JOB ORDER 
      <div class="vx-col w-full mb-4">
        <vx-card title="Job Order List">
            <vs-button color="success" type="filled">Success</vs-button>
          <div slot="no-body" class="mt-4">
            <vs-table max-items="3" v-model="selectedOrder" @selected="handleSelectedOrder" pagination :data="transactionList" class="table-dark-inverted" stripe>
              <template slot="thead">
                <vs-th>TRX CODE</vs-th>
                <vs-th>CUSTOMER EMAIL</vs-th>
                <vs-th>CUSTOMER NAME</vs-th>
                <vs-th>CREATED AT</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
                  <vs-td :data="data[i].code">
                    <span>TRX-{{codeGenerator(data[i].code)}}</span>
                  </vs-td>
                  <vs-td :data="data[i].customer_email">
                    <div class="con-images">
                      <span>{{data[i].customer_email}}</span>
                    </div>
                  </vs-td>
                  <vs-td :data="data[i].customer_name">
                    <span>{{data[i].customer_name}}</span>
                  </vs-td>
                  <vs-td :data="data[i].createdAt">
                    <span>{{format_date(data[i].createdAt)}}</span>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vx-card>
      </div>
      END OF JOB ORDER -->
      <!-- CARD 2: Approval 1 -->
      <div class="vx-col w-full mb-4">
        <vx-card title="Job Order List">
          <!--emplate slot="actions">
            <vs-button color="success" type="filled">Success</vs-button>
          </template-->
          <div slot="no-body" class="mt-4">
            <vs-table v-model="selectedApp1" @selected="handleSelectedApp1" max-items="3" pagination :data="approvalList" class="table-dark-inverted" stripe>
              <template slot="thead">
                <vs-th>TRX CODE</vs-th>
                <vs-th>CUSTOMER CODE</vs-th>
                <vs-th>VENDOR CODE</vs-th>
                <vs-th>TOTAL AMOUNT</vs-th>
                <vs-th>APP DATE</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
                  <vs-td :data="data[i].code">
                    <span>TRX-{{codeGenerator(data[i].code)}}</span>
                  </vs-td>
                  <vs-td :data="data[i].customer_code">
                    <div class="con-images">
                      <span>CUS-{{codeGenerator(data[i].customer_code)}}</span>
                    </div>
                  </vs-td>
                  <vs-td :data="data[i].vendor_code">
                    <span>VEN-{{codeGenerator(data[i].vendor_code)}}</span>
                  </vs-td>
                  <vs-td :data="data[i].total_amount">
                    <span>{{data[i].total_amount}}</span>
                  </vs-td>
                  <vs-td :data="data[i].createdAt">
                    <span>{{format_date(data[i].createdAt)}}</span>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vx-card>
      </div>
      <!-- END OF APPROVAL 1 -->
      <!-- CARD 2: Approval 2 -->
      <div class="vx-col w-full mb-4">
        <vx-card title="Approved 1">
          <!--emplate slot="actions">
            <vs-button color="success" type="filled">Success</vs-button>
          </template-->
          <div slot="no-body" class="mt-4">
            <vs-table v-model="selectedApp2" @selected="handleSelectedApp2" max-items="3" pagination :data="approvalList2" class="table-dark-inverted" stripe>
              <template slot="thead">
                <vs-th>TRX CODE</vs-th>
                <vs-th>CUSTOMER CODE</vs-th>
                <vs-th>VENDOR CODE</vs-th>
                <vs-th>TOTAL AMOUNT</vs-th>
                <vs-th>APPROVAL 1 DATE</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
                  <vs-td :data="data[i].code">
                    <span>TRX-{{codeGenerator(data[i].code)}}</span>
                  </vs-td>
                  <vs-td :data="data[i].customer_code">
                    <div class="con-images">
                      <span>CUS-{{codeGenerator(data[i].customer_code)}}</span>
                    </div>
                  </vs-td>
                  <vs-td :data="data[i].vendor_code">
                    <span>VEN-{{codeGenerator(data[i].vendor_code)}}</span>
                  </vs-td>
                  <vs-td :data="data[i].total_amount">
                    <span>{{data[i].total_amount}}</span>
                  </vs-td>
                  <vs-td :data="data[i].approval1_date">
                    <span>{{format_date(data[i].approval1_date)}}</span>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vx-card>
      </div>
      <!-- END OF APPROVAL 2 -->
      <!-- CARD 3: SETTLEMENT -->
      <div class="vx-col w-full mb-4">
        <vx-card title="Approved 2">
          <!--emplate slot="actions">
            <vs-button color="success" type="filled">Success</vs-button>
          </template-->
          <div slot="no-body" class="mt-4">
            <vs-table v-model="selectedApproval" @selected="handleSettlement" max-items="3" pagination :data="settlementList" class="table-dark-inverted" stripe>
              <template slot="thead">
                <vs-th>TRX CODE</vs-th>
                <vs-th>CUSTOMER CODE</vs-th>
                <vs-th>VENDOR CODE</vs-th>
                <vs-th>TOTAL AMOUNT</vs-th>
                <vs-th>APPROVAL 1 DATE</vs-th>
                <vs-th>APPROVAL 2 DATE</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
                  <vs-td :data="data[i].code">
                    <span>TRX-{{codeGenerator(data[i].code)}}</span>
                  </vs-td>
                  <vs-td :data="data[i].customer_code">
                    <div class="con-images">
                      <span>CUS-{{codeGenerator(data[i].customer_code)}}</span>
                    </div>
                  </vs-td>
                  <vs-td :data="data[i].vendor_code">
                    <span>VEN-{{codeGenerator(data[i].vendor_code)}}</span>
                  </vs-td>
                  <vs-td :data="data[i].total_amount">
                    <span>{{data[i].total_amount}}</span>
                  </vs-td>
                  <vs-td :data="data[i].approval1_date">
                    <span>{{format_date(data[i].approval1_date)}}</span>
                  </vs-td>
                  <vs-td :data="data[i].approval2_date">
                    <span>{{format_date(data[i].approval2_date)}}</span>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vx-card>
      </div>
      <!-- END OF SETTLEMENT -->
      <!-- CARD 4: SETTLE FINISH -->
      <div class="vx-col w-full mb-4">
        <vx-card title="Settled Job Order">
          <!--emplate slot="actions">
            <vs-button color="success" type="filled">Success</vs-button>
          </template-->
          <div slot="no-body" class="mt-4">
            <vs-table v-model="selectedSettled" @selected="handleSettledSelected" max-items="3" pagination :data="settledList" class="table-dark-inverted" stripe>
              <template slot="thead">
                <vs-th>TRX CODE</vs-th>
                <vs-th>CUSTOMER CODE</vs-th>
                <vs-th>VENDOR CODE</vs-th>
                <vs-th>TOTAL AMOUNT</vs-th>
                <vs-th>APPROVAL 1 DATE</vs-th>
                <vs-th>APPROVAL 2 DATE</vs-th>
                <vs-th>SETTLEMENT DATE</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
                  <vs-td :data="data[i].code">
                    <span>TRX-{{codeGenerator(data[i].code)}}</span>
                  </vs-td>
                  <vs-td :data="data[i].customer_code">
                    <div class="con-images">
                      <span>CUS-{{codeGenerator(data[i].customer_code)}}</span>
                    </div>
                  </vs-td>
                  <vs-td :data="data[i].vendor_code">
                    <div class="con-images">
                      <span>CUS-{{codeGenerator(data[i].vendor_code)}}</span>
                    </div>
                  </vs-td>
                  <vs-td :data="data[i].settlement_amount">
                    <span>{{data[i].settlement_amount}}</span>
                  </vs-td>
                  <vs-td :data="data[i].approval1_date">
                    <span>{{format_date(data[i].approval1_date)}}</span>
                  </vs-td>
                  <vs-td :data="data[i].approval2_date">
                    <span>{{format_date(data[i].approval2_date)}}</span>
                  </vs-td>
                  <vs-td :data="data[i].settlement_date">
                    <span>{{format_date(data[i].settlement_date)}}</span>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vx-card>
      </div>
      <!-- END OF SETTLE FINISH -->
      <!-- CARD 4: INVOICE -->
      <div class="vx-col w-full mb-4">
        <vx-card title="Invoice">
          <!--emplate slot="actions">
            <vs-button color="success" type="filled">Success</vs-button>
          </template-->
          <div slot="no-body" class="mt-4">
            <vs-table v-model="selectedInvoice" @selected="handleInvoice" max-items="3" pagination :data="invoiceList" class="table-dark-inverted" stripe>
              <template slot="thead">
                <vs-th>INVOICE CODE</vs-th>
                <vs-th>CUSTOMER CODE</vs-th>
                <vs-th>TYPE</vs-th>
                <vs-th>TOTAL AMOUNT</vs-th>
                <vs-th>CREATED DATE</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
                  <vs-td :data="data[i].code">
                    <span>INV-{{codeGenerator(data[i].code)}}</span>
                  </vs-td>
                  <vs-td :data="data[i].customer_code">
                    <div class="con-images">
                      <span>CUS-{{codeGenerator(data[i].customer_code)}}</span>
                    </div>
                  </vs-td>
                  <vs-td :data="data[i].type">
                    <span v-if="data[i].type === 1">Regular</span>
                    <span v-else>Non-Regular</span>
                  </vs-td>
                  <vs-td :data="data[i].total_amount">
                    <span>{{data[i].total_amount}}</span>
                  </vs-td>
                  <vs-td :data="data[i].createdAt">
                    <span>{{format_date(data[i].createdAt)}}</span>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vx-card>
      </div>
      <!-- END OF INVOICE -->
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      selectedOrder: [],
      selectedApp1: [],
      selectedApp2: [],
      selectedApproval: [],
      selectedSettled: [],
      selectedInvoice: [],
      data: null,
      transactionList: [],
      approvalList: [],
      approvalList2: [],
      settlementList: [],
      settledList: [],
      invoiceList: []
    }
  },
  async created () {
    console.log(this.$store.state.AppActiveUser)
    this.loadData()
    this.$vs.loading()
    await this.sockets.subscribe('updateTrx', () => {
      this.retrieveTransactionList()
    })
    await this.sockets.subscribe('updateApproval1', () => {
      this.retrieveApprovalList()
    })
    await this.sockets.subscribe('updateApproval2', () => {
      this.retrieveApprovalList2()
    })
    await this.sockets.subscribe('updateSettlement', () => {
      this.retrieveSettlementList()
    })
    await this.sockets.subscribe('updateInvoice', () => {
      this.retrieveInvoiceList()
    })
    //this.loadData()
  },
  methods: {
    codeGenerator (code) {
      const max = 5
      let out = ''
      const len = code.toString().length
      for (let n = len; n <= max; n++) {
        out = out.concat('0')
      }
      return out.concat(code.toString())
    },
    loadData () {
      this.retrieveTransactionList()
      this.retrieveApprovalList()
      this.retrieveApprovalList2()
      this.retrieveSettlementList()
      this.retrieveSettledList()
      this.retrieveInvoiceList()
    },
    handleSelectedOrder (tr) {
      this.$router.push({name: 'transaction-view', params: { id: tr._id }})
    },
    retrieveTransactionList () {
      this.userList = []
      this.$store.dispatch('retrieveTransactionList')
        .then((response) => {
          this.transactionList = response.data.data
          this.$vs.loading.close()
        })
        .catch((error) => {
          this.$vs.loading.close()
          console.log(error.message)
        })
    },
    handleSelectedApp1 (tr) {
      this.$router.push({name: 'transaction-approve', params: { id: tr._id }})
    },
    async retrieveApprovalList () {
      const approval = 1
      await this.$store.dispatch('retrieveApprovalList', approval)
        .then(async (response) => {
          this.approvalList = response.data.data
          this.$vs.loading.close()
        })
        .catch((error) => {
          this.$vs.loading.close()
          console.log(error.message)
        })
    },
    handleSelectedApp2 (tr) {
      this.$router.push({name: 'transaction-approve2', params: { id: tr._id }})
    },
    async retrieveApprovalList2 () {
      const approval = 2
      await this.$store.dispatch('retrieveApprovalList', approval)
        .then(async (response) => {
          this.approvalList2 = response.data.data
          this.$vs.loading.close()
        })
        .catch((error) => {
          this.$vs.loading.close()
          console.log(error.message)
        })
    },
    handleSettlement (tr) {
      this.$router.push({name: 'transaction-settlement-create', params: { id: tr._id }})
    },
    async retrieveSettlementList () {
      const approval = 3
      await this.$store.dispatch('retrieveApprovalList', approval)
        .then(async (response) => {
          this.settlementList = response.data.data
          this.$vs.loading.close()
        })
        .catch((error) => {
          this.$vs.loading.close()
          console.log(error.message)
        })
    },
    handleSettledSelected (tr) {
      this.$router.push({name: 'transaction-settled', params: { id: tr._id }})
    },
    async retrieveSettledList () {
      await this.$store.dispatch('retrieveSettledList')
        .then(async (response) => {
          this.settledList = await response.data.data
          console.log(this.settledList[0].id_code)
          this.$vs.loading.close()
        })
        .catch((error) => {
          this.$vs.loading.close()
          console.log(error.message)
        })
    },
    handleInvoice (tr) {
      this.$router.push({name: 'invoice-invoice', params: { id: tr._id }})
    },
    async retrieveInvoiceList () {
      await this.$store.dispatch('retrieveInvoiceList')
        .then(async (response) => {
          this.invoiceList = response.data.data
          this.$vs.loading.close()
        })
        .catch((error) => {
          this.$vs.loading.close()
          console.log(error.message)
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