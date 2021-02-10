<!-- =========================================================================================
  File Name: UserView.vue
  Description: User View page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-user-view">

    <vs-alert color="danger" title="Job Order Not Found" :active.sync="transaction_not_found">
      <span>Job Order record with id: {{ $route.params.id }} not found. </span>
      <span>
        <span>Check </span><router-link :to="{name:'transaction-list'}" class="text-inherit underline">All Transactions</router-link>
      </span>
    </vs-alert>

    <div id="transaction-data" v-if="transaction_data">

      <vx-card title="Job Order Detail" class="mb-base">

        <!-- Avatar -->
        <div class="vx-row">

          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">Customer Email</td>
                <td>{{ transaction_data[0].customer_email }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Customer Name</td>
                <td>{{ transaction_data[0].customer_name }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">Updated At</td>
                <td>{{format_date(transaction_data[0].updatedAt) }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Created At</td>
                <td>{{format_date(transaction_data[0].createdAt) }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 2 -->
          <div class="vx-col w-full flex" id="account-manage-buttons">
            <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" :to="{name: 'transaction-edit', params: { id: $route.params.id }}">Edit</vs-button>
            <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash" @click="confirmDeleteRecord">Delete</vs-button>
          </div>

        </div>
        <vs-divider color="primary"><span>TRX-{{codeGenerator(transaction_data[0].code)}}</span></vs-divider>
        <div class="vx-row">
          <div class="vx-col w-full mb-10" :key="j" v-for="(vendor, j) in transaction_data">
            <vs-table max-items="5" :data="service[j]" class="table-dark-inverted" stripe>
              <template slot="thead">
                <vs-th></vs-th>
                <vs-th>Service Name</vs-th>
                <vs-th>Qty</vs-th>
                <vs-th>Planned Amount</vs-th>
              </template>
              <template slot-scope="{data}">
                <vs-tr>
                  <vs-td :rowspan="data.length + 1" style="text-align: center; vertical-align:middle">
                    <span style="font-weight: bold;"> {{vendor.vendor_name}} </span>
                  </vs-td>
                </vs-tr>
                <vs-tr :key="i" v-for="(tr, i) in data">
                  <vs-td :data="i">
                    <span>{{service[j][i].name}}</span>
                  </vs-td>
                  <vs-td>
                    <span>{{service[j][i].qty}}</span>
                  </vs-td>
                  <vs-td>
                    <span>{{service[j][i].planned_amount}}</span>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
        </div>
      </vx-card>
    </div>
  </div>
</template>

<script>
import moment from 'moment'

export default {
  data () {
    return {
      transaction_data: null,
      transaction_not_found: false,
      service: [[]]
    }
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
    confirmDeleteRecord () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm Delete',
        text: 'You are about to delete a transaction',
        accept: this.deleteRecord,
        acceptText: 'Delete'
      })
    },
    deleteRecord () {
      /* Below two lines are just for demo purpose */
      this.$vs.loading()
      this.$store.dispatch('deleteTransaction', this.$route.params.id)
        .then(async () => {
          this.$vs.loading.close()
          this.$router.push({name:'transaction-list'})
          this.showDeleteSuccess()
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
    deteteAllService () {
      this.$store.dispatch('deleteAllCustomerService', this.$route.params.id)
        .then(() => {
        })
        .catch((error) => { 
          console.log(error)
        })
    },
    showDeleteSuccess () {
      this.$vs.notify({
        color: 'success',
        title: 'Transaction Deleted',
        text: 'The selected transaction was successfully deleted'
      })
    },
    format_date (value) {
      if (value) {
        return moment(String(value)).format('D MMM YYYY')
      }
    }
  },
  created () {
    const id = this.$route.params.id
    this.$vs.loading()
    this.$store.dispatch('retrieveTransactionDetail', id)
      .then(async (response) => {
        this.transaction_data = response.data.data
        let indexNow = 0
        for (let i = 0; i < response.data.service.length; i++) {
          if (response.data.service[i + 1] !== undefined) {
            if (response.data.service[i]._id === response.data.service[i + 1]._id) {
              this.service[indexNow].push({name: response.data.service[i].service_name, qty: response.data.service[i].qty, planned_amount: response.data.service[i].planned_amount})
            } else {
              this.service[indexNow].push({name: response.data.service[i].service_name, qty: response.data.service[i].qty, planned_amount: response.data.service[i].planned_amount})
              indexNow += 1
              this.service.push([])
            }
          } else {
            this.service[indexNow].push({name: response.data.service[i].service_name, qty: response.data.service[i].qty, planned_amount: response.data.service[i].planned_amount})
          }
        }
        this.$vs.loading.close()
      })
      .catch((error) => {
        console.log(error)
        this.transaction_not_found = false
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

</script>

<style lang="scss">
#avatar-col {
  width: 10rem;
}

#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: .8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width:370px) {
          display: block;
        }
      }
    }
  }
}

// #account-info-col-1 {
//   // flex-grow: 1;
//   width: 30rem !important;
//   @media screen and (min-width:1200px) {
//     & {
//       flex-grow: unset !important;
//     }
//   }
// }


@media screen and (min-width:1201px) and (max-width:1211px),
only screen and (min-width:636px) and (max-width:991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }

}

</style>