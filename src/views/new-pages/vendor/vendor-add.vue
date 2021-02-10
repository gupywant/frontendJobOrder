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
        <vx-card title="Create Vendor">
          <div slot="no-body" class="mt-4 ml-4 mr-4 mb-4"> 
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
          </div>
          <div class="vx-row">
            <div class="vx-col w-full">
              <div class="mt-8 flex flex-wrap items-center justify-end">
                <vs-button class="ml-2 mt-2" @click="addUser()">Create</vs-button>
              </div>
            </div>
          </div>
        </vx-card>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {
      //
      email: '',
      name: '',
      phone: '',
      npwp: '',
      address: '',
      province: '',
      postal_code: '',
      country: '',
      attn: ''
    }
  },
  components: {
  },
  created () {
    this.popup = false
    //this.retrieveUserList()
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
          this.$store.dispatch('addVendor', payload)
            .then(() => {
              this.$socket.emit('updateVendor')
              this.email = ''
              this.name = ''
              this.phone = ''
              this.npwp = ''
              this.address = ''
              this.province = ''
              this.country = ''
              this.postal_code = ''
              this.attn = ''
              this.$vs.loading.close()
              this.$vs.notify({
                title: 'Success',
                text: 'a new vendor has been created',
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