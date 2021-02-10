<!-- =========================================================================================
  File Name: UserEdit.vue
  Description: User Edit Page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="page-user-edit">

    <vs-alert color="danger" title="Customer Not Found" :active.sync="user_not_found">
      <span>Customer record with id: {{ $route.params.id }} not found. </span>
      <span>
        <span>Check </span><router-link :to="{name:'customer-list'}" class="text-inherit underline">All Customers</router-link>
      </span>
    </vs-alert>

    <vx-card v-if="user_data">

      <div slot="no-body" class="tabs-container px-6 pt-6">

        <vs-tabs v-model="activeTab" class="tab-action-btn-fill-conatiner">
          <vs-tab label="Edit" icon-pack="feather" icon="icon-user">
            <div class="tab-text">

              <!-- Content Row -->
              <div class="vx-row"> 
                <div class="vx-col w-1/2">  
                  <vx-input-group class="mb-6">
                    <vs-input label="Email" v-validate="'required|min:5'" v-model="email" name="email" type="text" placeholder="Email" />
                    <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>               
                  </vx-input-group>
                </div>
                <div class="vx-col w-1/2">  
                  <vx-input-group class="mb-6">
                    <vs-input name="name" label="Name" v-validate="'required|min:1'" v-model="name" type="text" placeholder="Name" />
                    <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>               
                  </vx-input-group>
                </div>
              </div>
              <div class="vx-row">
                <div class="vx-col w-1/2">
                  <vx-input-group class="mb-6">
                    <vs-input label="Phone" name="phone" v-validate="'required|min:10'" v-model="phone" type="text" placeholder="Phone" />
                    <span class="text-danger text-sm" v-show="errors.has('phone')">{{ errors.first('phone') }}</span>               
                  </vx-input-group>
                </div>
                <div class="vx-col w-1/2">
                  <vx-input-group class="mb-6">
                    <vs-input name="npwp" label="NPWP" v-validate="'required|min:10'" v-model="npwp" type="text" placeholder="NPWP" />
                    <span class="text-danger text-sm" v-show="errors.has('npwp')">{{ errors.first('npwp') }}</span>               
                  </vx-input-group>
                </div>
              </div>
              <div class="vx-row">
                <div class="vx-col w-1/3">
                  <vx-input-group class="mb-6">
                    <vs-input name="address" label="Address" v-validate="'required|min:1'" v-model="address" type="text" placeholder="address" />
                    <span class="text-danger text-sm" v-show="errors.has('address')">{{ errors.first('address') }}</span>               
                  </vx-input-group>
                </div>
                <div class="vx-col w-1/3">
                  <vx-input-group class="mb-6">
                    <vs-input name="province" label="Province" v-validate="'required|min:1'" v-model="province" type="text" placeholder="Province" />
                    <span class="text-danger text-sm" v-show="errors.has('province')">{{ errors.first('province') }}</span>               
                  </vx-input-group>
                </div>
                <div class="vx-col w-1/3">
                  <vx-input-group class="mb-6">
                    <vs-input name="country" label="Country" v-validate="'required|min:1'" v-model="country" type="text" placeholder="country" />
                    <span class="text-danger text-sm" v-show="errors.has('country')">{{ errors.first('country') }}</span>               
                  </vx-input-group>
                </div>
              </div>
              <div class="vx-row">
                <div class="vx-col w-1/2">
                  <vx-input-group class="mb-6">
                    <vs-input name="postal-code" label="Postal Code" v-validate="'required|min:1'" v-model="postal_code" type="text" placeholder="Postal Code" />
                    <span class="text-danger text-sm" v-show="errors.has('postal-code')">{{ errors.first('postal-code') }}</span>               
                  </vx-input-group>
                </div>
                <div class="vx-col w-1/2">
                  <vx-input-group class="mb-6">
                    <vs-input name="attn" label="Attn" v-validate="'required|min:1'" v-model="attn" type="text" placeholder="Attn" />
                    <span class="text-danger text-sm" v-show="errors.has('attn')">{{ errors.first('attn') }}</span>               
                  </vx-input-group>
                </div>
              </div>
              <vs-divider color="primary">Service</vs-divider>
              <div class="vx-row">
                <div class="vx-col w-full">
                  <vs-table search max-items="5" :data="selected" class="table-dark-inverted" stripe>
                    <template slot="thead">
                      <vs-th>NO</vs-th>
                      <vs-th>Service Name</vs-th>
                      <vs-th>Description</vs-th>
                      <vs-th style="width: 10%">Delete</vs-th>
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
                          <vs-button type="border" color="danger" icon-pack="feather" icon="icon-trash" @click="confirmDeleteRecord(data[i]._id)"></vs-button>
                        </vs-td>
                      </vs-tr>
                    </template>
                  </vs-table>
                  <br/>
                  <vs-button @click="addModal()" color="primary" type="filled">Add More Service</vs-button>
                </div>
              </div>
              <!-- Save & Reset Button -->
              <div class="vx-row">
                <div class="vx-col w-full">
                  <div class="mt-8 flex flex-wrap items-center justify-end">
                    <vs-button class="ml-auto mt-2" @click="editUserData()" :disabled="!validateForm">Save Changes</vs-button>
                  </div>
                </div>
              </div>
            </div>
          </vs-tab>
        </vs-tabs>
      </div>
    </vx-card>
     <!--popup modal -->
    <div class="centerx">
      <vs-popup class="holamundo"  :title="title" :active.sync="modal">
        <div class="vx-col w-full">  
          <vx-input-group class="mb-6">
            <v-select label="name" :options="options" v-model="newService" :dir="$vs.rtl ? 'rtl' : 'ltr'" />
          </vx-input-group>
        </div>
        <div>
          <vs-button @click="addService()" color="primary" type="filled">Submit</vs-button>
        </div>
      </vs-popup>
    </div>
    <!-- end off popup modal -->
  </div>
</template>

<script>
import vSelect from 'vue-select'

export default {
  data () {
    return {
      title: '',
      modal: false,
      email: '',
      name: '',
      phone: '',
      npwp: '',
      address: '',
      province: '',
      postal_code: '',
      country: '',
      attn: '',
      user_data: null,
      user_not_found: false,
      selected: [],
      options: [],
      newService: [],
      activeTab: 0,
      delete: ''
    }
  },
  components: {
    'v-select': vSelect
  },
  methods: {
    addModal () {
      this.title = 'Add New Service'
      this.newService = []
      this.modal = true
    },
    updateUserData () {
      this.editUserData()
    },
    removeAvatar () {
      this.image = ''
    },
    add () {
      console.log(this.newService._id)
    },
    addService () {
      const payload = {
        id_customer: this.$route.params.id, 
        id_service: this.newService._id,
        add: true
      }
      this.$vs.loading()
      this.$store.dispatch('addCustomerService', payload)
        .then(() => {
          this.modal = false
          this.retrieveUserService()
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Success',
            text: 'New Service Added Successfully',
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
    confirmDeleteRecord (id) {
      this.delete = id
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm Delete',
        text: 'Service will be deleted, it may affected to transaction. Continue to delete?',
        accept: this.deleteService,
        acceptText: 'Continue'
      })
    },
    deleteService () {
      const payload = {
        id_customer: this.$route.params.id,
        id_service: this.delete
      }
      this.$vs.loading()
      this.$store.dispatch('deleteCustomerService', payload)
        .then(() => {
          this.retrieveUserService()
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Danger',
            text: 'Service Deleted Successfully',
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
    editUserData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const payload = {
            id: this.$route.params.id,
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
          this.$store.dispatch('editCustomerData', payload)
            .then(() => {
              this.$socket.emit('updateCustomer')
              this.$vs.loading.close()
              this.$vs.notify({
                title: 'Success',
                text: 'Update Success',
                iconPack: 'feather',
                icon: 'icon-alert-circle',
                color: 'success'
              })
              this.retrieveUserDetail()
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
    retrieveUserDetail () {
      const id = this.$route.params.id
      this.$vs.loading()
      this.$store.dispatch('retrieveCustomerDetail', id)
        .then((response) => {
          this.$vs.loading.close()
          this.user_data = response.data.data
          this.name = this.user_data.name
          this.email = this.user_data.email
          this.phone = this.user_data.phone
          this.npwp = this.user_data.npwp
          this.address = this.user_data.address
          this.province = this.user_data.province
          this.country = this.user_data.country
          this.postal_code = this.user_data.postalCode
          this.attn = this.user_data.attn
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
    },
    retrieveUserService () {
      const id = this.$route.params.id
      this.$store.dispatch('retrieveCustomerServiceList', id)
        .then((response) => {
          this.selected = []
          response.data.data.map(item => this.selected.push({_id : item._id, name: item.name, description: item.description, select: true}))
        })
        .catch((error) => {
          this.$vs.loading.close()
          console.log(error)
        })
    },
    retrieveServiceList () {
      this.serviceList = []
      this.$store.dispatch('retrieveServiceList')
        .then((response) => {
          this.options = response.data.data
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
    insertAvatar () {
      this.$refs.update_avatar_input.click()
    },
    handleImage (e) {
      console.log(e.target.files[0])
      const selectedImage = e.target.files[0]
      this.createBase64Image(selectedImage)
    },
    createBase64Image (fileObject) {
      const reader = new FileReader()
      reader.onload = (fileObject) => {
        this.image = fileObject.target.result
      }
      reader.readAsDataURL(fileObject)
    },
    validateForm () {
      return !this.errors.any()
    }
  },
  created () {
    this.retrieveUserDetail()
    this.retrieveUserService()
    this.retrieveServiceList()
  }
}

</script>