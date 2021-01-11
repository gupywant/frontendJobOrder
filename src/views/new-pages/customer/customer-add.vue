<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="user-add">
    <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">
        <vx-card title="Create Customer">
          <div slot="no-body" class="mt-4 ml-4 mr-4 mb-4"> 
            <div class="vx-row"> 
              <div class="vx-col w-1/2">  
                <vx-input-group class="mb-6">
                  <vs-input label="Email" v-validate="'required|email|min:5'" data-vv-as="email" v-model="email" type="email" placeholder="Email" />
                </vx-input-group>
              </div>
              <div class="vx-col w-1/2">  
                <vx-input-group class="mb-6">
                  <vs-input label="Name" v-validate="'required|min:1'" v-model="name" type="text" placeholder="Name" />
                </vx-input-group>
              </div>
            </div>
            <div class="vx-row">
              <div class="vx-col w-1/2">
                <vx-input-group class="mb-6">
                  <vs-input label="Phone" v-validate="'required|min:10'" v-model="phone" type="text" placeholder="Phone" />
                </vx-input-group>
              </div>
              <div class="vx-col w-1/2">
                <vx-input-group class="mb-6">
                  <vs-input label="NPWP" v-validate="'required|min:10'" v-model="npwp" type="text" placeholder="NPWP" />
                </vx-input-group>
              </div>
            </div>
            <div class="vx-row">
              <div class="vx-col w-1/3">
                <vx-input-group class="mb-6">
                  <vs-input label="Address" v-validate="'required|min:1'" v-model="address" type="text" placeholder="address" />
                </vx-input-group>
              </div>
              <div class="vx-col w-1/3">
                <vx-input-group class="mb-6">
                  <vs-input label="Province" v-validate="'required|min:1'" v-model="province" type="text" placeholder="Province" />
                </vx-input-group>
              </div>
              <div class="vx-col w-1/3">
                <vx-input-group class="mb-6">
                  <vs-input label="Country" v-validate="'required|min:1'" v-model="country" type="text" placeholder="country" />
                </vx-input-group>
              </div>
            </div>
            <div class="vx-row">
              <div class="vx-col w-1/2">
                <vx-input-group class="mb-6">
                  <vs-input label="Postal Code" v-validate="'required|min:1'" v-model="postal_code" type="text" placeholder="Postal Code" />
                </vx-input-group>
              </div>
              <div class="vx-col w-1/2">
                <vx-input-group class="mb-6">
                  <vs-input label="Attn" v-validate="'required|min:1'" v-model="attn" type="text" placeholder="Attn" />
                </vx-input-group>
              </div>
            </div>
            <vs-divider color="primary">Service</vs-divider>
            <div class="vx-row">
              <div class="vx-col w-full">
                <vs-table search max-items="5" :data="options" class="table-dark-inverted" stripe>
                  <template slot="thead">
                    <vs-th>NO</vs-th>
                    <vs-th>Service Name</vs-th>
                    <vs-th>Description</vs-th>
                    <vs-th style="width: 10%">Select</vs-th>
                  </template>

                  <template slot-scope="{data}">
                    <vs-tr :key="i" v-for="(tr, i) in data">
                      <vs-td :data="i">
                        <span>{{i+1}}</span>
                      </vs-td>
                      <vs-td :data="data[i].name">
                        <span>{{data[i].name}}</span>
                      </vs-td>
                      <vs-td :data="data[i].description">
                        <span v-if="data[i].description.length >= 10">{{data[i].description.substr(0,10)}}..</span>
                        <span v-else>{{data[i].description.substr(0,10)}}</span>
                      </vs-td>
                      <vs-td>
                        <vs-checkbox v-model="data[i].select"></vs-checkbox>
                      </vs-td>
                    </vs-tr>
                  </template>
                </vs-table>
                <br/>
              </div>
            </div>
          </div>
          <div class="vx-row">
            <div class="vx-col w-full">
              <div class="mt-8 flex flex-wrap items-center justify-end">
                <vs-button class="ml-auto mt-2" @click="addUser()">Submit</vs-button>
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
      email: '',
      name: '',
      phone: '',
      npwp: '',
      address: '',
      province: '',
      postal_code: '',
      country: '',
      attn: '',
      selected: [],
      options: [],
      optionsId: []
    }
  },
  components: {
    'v-select': vSelect
  },
  created () {
    this.popup = false
    this.retrieveServiceList()
  },
  methods: {
    addUser () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const payload = {
            _id: this.$route.params.id,
            email: this.email,
            name: this.name,
            phone: this.phone,
            npwp: this.npwp,
            address: this.address,
            province: this.province,
            postalCode: this.postal_code,
            country: this.country,
            attn: this.attn
          }
          this.$vs.loading()
          this.$store.dispatch('addCustomer', payload)
            .then((response) => {
              const payloads = {
                id_customer: response.data.data._id,
                selected: this.options,
                edit: false
              }
              this.$store.dispatch('addCustomerService', payloads)
                .then(() => {
                  this.$socket.emit('updateCustomer')
                  this.$vs.loading.close()
                  this.$vs.notify({
                    title: 'Success',
                    text: 'a new customer with some of service has been created',
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
    retrieveServiceList () {
      this.serviceList = []
      this.$store.dispatch('retrieveServiceList')
        .then((response) => {
          response.data.data.map(item => this.options.push({_id : item._id, name: item.name, description: item.description, select: false}))
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