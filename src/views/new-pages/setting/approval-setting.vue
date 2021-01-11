<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="approval-setting">
    <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">
        <vx-card :title="titleTop">
          <div slot="no-body" class="mt-4 ml-4 mr-4 mb-4">
            <vs-divider color="primary">Approval 1</vs-divider>
            <div class="vx-row"> 
              <div class="vx-col w-1/2">
                <vx-input-group class="mb-6">
                  Approval 1
                  <v-select :disabled="true" value="Approval 1" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                </vx-input-group>
              </div>
              <div class="vx-col w-1/2">
                <vx-input-group class="mb-6">
                  User
                  <v-select label="name" v-validate="'required'" :options="userList" v-model="approval1" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                </vx-input-group>
              </div>
            </div>
            <vs-divider color="primary">Approval 2</vs-divider>
            <div class="vx-row"> 
              <div class="vx-col w-1/2">
                <vx-input-group class="mb-6">
                  Approval 2
                  <v-select :disabled="true" value="Approval 2" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                </vx-input-group>
              </div>
              <div class="vx-col w-1/2">
                <vx-input-group class="mb-6">
                  User
                  <v-select label="name" v-validate="'required'" :options="userList" v-model="approval2" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
                </vx-input-group>
              </div>
            </div>
          </div>
          <!-- Save & Reset Button -->
          <div class="vx-row">
            <div class="vx-col w-full">
              <div class="mt-8 flex flex-wrap items-center justify-end">
                <vs-button class="ml-auto mt-2" @click="save()">Save</vs-button>
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
      userList: [],
      approval1: [],
      approval2: [],
      titleTop: 'Approval Setting',
      title: ''
    }
  },
  components: {
    'v-select': vSelect
  },
  created () {
    this.retrieveUserList()
    this.getApproval()
  },
  methods: {
    save () {
      console.log(this.approval1._id)
      console.log(this.approval2)
      this.saveApproval()
    },
    saveApproval () {
      const payload = {
        approval1: this.approval1._id,
        approval2: this.approval2._id,
        add: true
      }
      this.$vs.loading()
      this.$store.dispatch('saveApprovalSetting', payload)
        .then(() => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Success',
            text: 'Approval saved Successfully',
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
    getApproval () {
      this.$vs.loading()
      this.$store.dispatch('getApprovalSetting')
        .then((response) => {
          console.log(response)
          this.$vs.loading.close()
          this.approval1 = {'_id': response.data.data[0].id_user, 'name': response.data.data[0].name}
          this.approval2 = {'_id': response.data.data[1].id_user, 'name': response.data.data[1].name}
        })
        .catch((error) => { 
          console.log(error)
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Approvals are empty',
            text: error.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'danger'
          })
        })
    },
    retrieveUserList () {
      this.$vs.loading()
      this.$store.dispatch('retrieveUserList')
        .then((response) => {
          this.userList = response.data.data
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