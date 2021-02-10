<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="user-list">
    <div class="vx-row">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <div class="vx-col w-full">
        <vx-card title="Create User">
          <div slot="no-body" class="mt-4 ml-4 mr-4 mb-4"> 
            <div class="vx-row"> 
              <div class="vx-col w-1/2">  
                <vx-input-group class="mb-6">
                  <vs-input label="Email" required v-validate="'required|min:5'" name="email" v-model="email" type="text" placeholder="Email" />
                  <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>               
                </vx-input-group>
              </div>
              <div class="vx-col w-1/2">  
                <vx-input-group class="mb-6">
                  <vs-input label="Name" v-validate="'required|min:1'" v-model="name" name="name" type="text" placeholder="Name" />
                  <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span> 
                </vx-input-group>
              </div>
            </div>
            <div class="vx-row">
              <div class="vx-col w-1/2">  
                <vx-input-group class="mb-6">
                  <vs-input label="Password" v-validate="'required|min:6'" name="password" v-model="password" type="password" placeholder="Password" />
                  <span class="text-danger text-sm" v-show="errors.has('password')">{{ errors.first('password') }}</span> 
                </vx-input-group>
              </div>
              <div class="vx-col w-1/2">  
                <vx-input-group class="mb-6">
                  <vs-select class="w-full" label="Status" v-model="active">
                    <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in status" />
                  </vs-select>
                </vx-input-group>
              </div>
            </div>
            <div class="vx-row">
              <div class="vx-col w-1/2">  
                <vx-input-group class="mb-6">
                  <vs-select class="w-full" label="Role" v-model="role">
                    <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in roleS" />
                  </vs-select>
                </vx-input-group>
              </div>
              <div class="vx-col w-1/2">  
                <vx-input-group class="mb-6">
                  <vs-select class="w-full" label="Department" v-model="department">
                    <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in departmentS" />
                  </vs-select>
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
import moment from 'moment'

export default {
  data () {
    return {
      status:[
        {text:'Active', value:true},
        {text:'Inactive', value:false}
      ],
      departmentS:[
        {text:'CSO', value:'CSO'},
        {text:'Marketing', value:'Marketing'},
        {text:'Operational', value:'Operational'}
      ],
      roleS:[
        {text:'Admin', value:'Admin'},
        {text:'CS', value:'CS'},
        {text:'Finance', value:'Finance'},
        {text:'Operation', value:'Operation'}
      ],
      //
      email: '',
      name: '',
      image: '',
      active: true,
      password: '',
      role: 'Admin',
      department: 'CSO'
    }
  },
  components: {
  },
  created () {
    this.popup = false
    //this.retrieveUserList()
  },
  methods: {
    add () {
      
    },
    addUser () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const payload = {
            email: this.email,
            name: this.name,
            image: '',
            active: this.active,
            role: this.role,
            department:this.department,
            password: this.password
          }
          this.$vs.loading()
          this.$store.dispatch('addUser', payload)
            .then(() => {
              this.email = ''
              this.name = ''
              this.password = ''
              this.$socket.emit('updateUser')
              this.$vs.loading.close()
              this.$vs.notify({
                title: 'Success',
                text: 'a new user account has been created',
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
    },
    format_date (value) {
      if (value) {
        return moment(String(value)).format('D MMM YYYY')
      }
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