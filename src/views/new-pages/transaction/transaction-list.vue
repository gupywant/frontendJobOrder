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
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">
        <vx-card title="Job Order List">
          <!--emplate slot="actions">
            <vs-button color="success" type="filled">Success</vs-button>
          </template-->
          <div slot="no-body" class="mt-4">
            <vs-table search max-items="5" pagination :data="transactionList" class="table-dark-inverted" stripe>
              <template slot="thead">
                <vs-th>TRX CODE</vs-th>
                <vs-th>CUSTOMER EMAIL</vs-th>
                <vs-th>CUSTOMER NAME</vs-th>
                <vs-th>CREATED AT</vs-th>
                <vs-th>UPDATED AT</vs-th>
                <vs-th>DETAIL</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :key="i" v-for="(tr, i) in data">
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
                  <vs-td :data="data[i].updatedAt">
                    <span>{{format_date(data[i].updatedAt)}}</span>
                  </vs-td>
                  <vs-td>
                    <vs-button :to="{name: 'transaction-view', params: { id: data[i]._id }}" color="primary" icon="create" type="border"></vs-button>
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
      data: null,
      transactionList: []
    }
  },
  async created () {
    this.loadData()
    this.$vs.loading()
    this.sockets.subscribe('updateTrx', () => {
      this.retrieveTransactionList()
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