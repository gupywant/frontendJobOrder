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

    <vs-alert color="danger" title="Vendor Not Found" :active.sync="user_not_found">
      <span>Vendor record with id: {{ $route.params.id }} not found. </span>
      <span>
        <span>Check </span><router-link :to="{name:'Vendor-list'}" class="text-inherit underline">All Users</router-link>
      </span>
    </vs-alert>

    <div id="user-data" v-if="user_data">

      <vx-card title="Vendor Detail" class="mb-base">

        <!-- Avatar -->
        <div class="vx-row">

          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">email</td>
                <td>{{ user_data.email }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Name</td>
                <td>{{ user_data.name }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Phone</td>
                <td>{{ user_data.phone }}</td>
              </tr>
              <tr>
                <td class="font-semibold">NPWP</td>
                <td v-if="user_data.npwp != null">{{ user_data.npwp }}</td>
                <td v-else>-</td>
              </tr>
              <tr>
                <td class="font-semibold">Attn</td>
                <td v-if="user_data.attn != null">{{ user_data.attn }}</td>
                <td v-else>-</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">Address</td>
                <td v-if="user_data.address != null">{{ user_data.address }}</td>
                <td v-else>-</td>
              </tr>
              <tr>
                <td class="font-semibold">Province</td>
                <td v-if="user_data.province != null">{{ user_data.province }}</td>
                <td v-else>-</td>
              </tr>
              <tr>
                <td class="font-semibold">Country</td>
                <td v-if="user_data.country != null">{{ user_data.country }}</td>
                <td v-else>-</td>
              </tr>
              <tr>
                <td class="font-semibold">Postal Code</td>
                <td v-if="user_data.postalCode != null">{{ user_data.postalCode }}</td>
                <td v-else>-</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 2 -->
          <div class="vx-col w-full flex" id="account-manage-buttons">
            <vs-button icon-pack="feather" icon="icon-edit" class="mr-4" :to="{name: 'vendor-edit', params: { id: $route.params.id }}">Edit</vs-button>
            <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash" @click="confirmDeleteRecord">Delete</vs-button>
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
      user_data: null,
      user_not_found: false
    }
  },
  methods: {
    confirmDeleteRecord () {
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm Delete',
        text: `You are about to delete "${this.user_data.email}"`,
        accept: this.deleteRecord,
        acceptText: 'Delete'
      })
    },
    deleteRecord () {
      /* Below two lines are just for demo purpose */
      this.$vs.loading()
      this.$store.dispatch('deleteVendor', this.$route.params.id)
        .then(() => {
          this.$socket.emit('updateVendor')
          this.$vs.loading.close()  
          this.$router.push({name:'vendor-list'})
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
    showDeleteSuccess () {
      this.$vs.notify({
        color: 'success',
        title: 'Vendor Deleted',
        text: 'The selected vendor was successfully deleted'
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
    this.$store.dispatch('retrieveVendorDetail', id)
      .then((response) => {
        this.$vs.loading.close()
        this.user_data = response.data.data
      })
      .catch((error) => {
        this.user_not_found = true
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
