<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="transaction-document">
    <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">
        <vx-card title="Documents upload">
          <!--emplate slot="actions">
            <vs-button color="success" type="filled">Success</vs-button>
          </template-->
          <div slot="no-body" class="mt-4">
            <vs-table search v-model="selected" @selected="handleSelected" max-items="5" pagination :data="approvalList" class="table-dark-inverted" stripe>
              <template slot="thead">
                <vs-th>NO</vs-th>
                <vs-th>TRX CODE</vs-th>
                <vs-th>CUSTOMER CODE</vs-th>
                <vs-th>VENDOR CODE</vs-th>
                <vs-th>TOTAL AMOUNT</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :data="tr" :key="i" v-for="(tr, i) in data">
                  <vs-td :data="i">
                    <span>{{i+1}}</span>
                  </vs-td>
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
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      selected: [],
      data: null,
      approvalList: []
    }
  },
  async created () {
    this.loadData()
    this.$vs.loading()
    this.sockets.subscribe('updateSettlement', () => {
      this.retrieveAcceptedlList()
    })
    //this.loadData()
  },
  methods: {
    handleSelected (tr) {
      this.$router.push({name: 'transaction-documents-upload', params: { id: tr._id }})
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
    loadData () {
      this.retrieveAcceptedlList()
    },
    async retrieveAcceptedlList () {
      const approval = 3
      await this.$store.dispatch('retrieveApprovalList', approval)
        .then(async (response) => {
          this.approvalList = response.data.data
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