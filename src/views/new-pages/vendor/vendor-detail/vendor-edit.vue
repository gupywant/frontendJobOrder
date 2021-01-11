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

    <vs-alert color="danger" title="Vendor Not Found" :active.sync="user_not_found">
      <span>Vendor record with id: {{ $route.params.id }} not found. </span>
      <span>
        <span>Check </span><router-link :to="{name:'vendor-list'}" class="text-inherit underline">All Users</router-link>
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
                  <vs-input label="Email" v-validate="'required|min:5'" v-model="email" type="text" placeholder="Email" />
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

              <!-- Save & Reset Button -->
              <div class="vx-row">
                <div class="vx-col w-full">
                  <div class="mt-8 flex flex-wrap items-center justify-end">
                    <vs-button class="ml-auto mt-2" @click="updateUserData" :disabled="!validateForm">Save</vs-button>
                  </div>
                </div>
              </div>
            </div>
          </vs-tab>
        </vs-tabs>

      </div>

    </vx-card>
  </div>
</template>

<script>

export default {
  data () {
    return {
      email: '',
      name: '',
      phone: '',
      npwp: '',
      address: '',
      province: '',
      postalCode: '',
      country: '',
      attn: '',
      user_data: null,
      user_not_found: false,

      /*
        This property is created for fetching latest data from API when tab is changed

        Please check it's watcher
      */
      activeTab: 0
    }
  },
  methods: {
    updateUserData () {
      this.editUserData()
    },
    removeAvatar () {
      this.image = ''
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
          this.$store.dispatch('editVendorData', payload)
            .then(() => {
              this.$socket.emit('updateVendor')
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
      this.$store.dispatch('retrieveVendorDetail', id)
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
  }
}

</script>