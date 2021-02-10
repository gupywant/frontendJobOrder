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

    <vs-alert color="danger" title="User Not Found" :active.sync="user_not_found">
      <span>User record with id: {{ $route.params.id }} not found. </span>
      <span>
        <span>Check </span><router-link :to="{name:'user-list'}" class="text-inherit underline">All Users</router-link>
      </span>
    </vs-alert>

    <vx-card v-if="user_data">

      <div slot="no-body" class="tabs-container px-6 pt-6">

        <vs-tabs v-model="activeTab" class="tab-action-btn-fill-conatiner">
          <vs-tab label="Edit" icon-pack="feather" icon="icon-user">
            <div class="tab-text">
              <!-- Avatar Row -->
              <div class="vx-row">
                <div class="vx-col w-full">
                  <div class="flex items-start flex-col sm:flex-row">
                    <img :src="image" class="mr-8 rounded h-24 w-24" />
                    <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
                    <div>
                      <p class="text-lg font-medium mb-2 mt-4 sm:mt-0">{{ name  }}</p>
                      <input type="file" @change="handleImage" class="hidden" ref="update_avatar_input" accept="image/*">
                      <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                      <!--vs-button class="mr-4 mb-4">Change Avatar</vs-button-->
                      <vs-button type="border" class="mr-4" @click="$refs.update_avatar_input.click()">Change Avatar</vs-button>

                      <vs-button type="border" @click="removeAvatar" color="danger">Remove Avatar</vs-button>
                    </div>
                  </div>
                </div>
              </div>

              <!-- Content Row -->
              <div class="vx-row">
                <div class="vx-col md:w-1/2 w-full">
                  <vs-input class="w-full mt-4" label="Name" v-model="name" v-validate="'required|min:1'" name="name" />
                  <span class="text-danger text-sm" v-show="errors.has('name')">{{ errors.first('name') }}</span>               
                  <div class="mt-4">     
                    <vs-select class="w-full" label="Role" v-model="role">
                      <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in roleS" />
                    </vs-select>
                  </div>
                </div>

                <div class="vx-col md:w-1/2 w-full">

                  <div class="mt-4">
                    <vs-select class="w-full" label="Department" v-model="department">
                      <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in departmentS" />
                    </vs-select>
                  </div>

                  <div class="mt-4">
                    <vs-select class="w-full" label="Status" v-model="active">
                      <vs-select-item :key="index" :value="item.value" :text="item.text" v-for="(item,index) in activeS" />
                    </vs-select>
                  </div>
                </div>
              </div>

              <!-- Save & Reset Button -->
              <div class="vx-row">
                <div class="vx-col w-full">
                  <div class="mt-8 flex flex-wrap items-center justify-end">
                    <vs-button class="ml-auto mt-2" @click="updateUserData" :disabled="!validateForm">Save Changes</vs-button>
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
      activeS:[
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
      id: '',
      name: '',
      image: '',
      active: '',
      password: '',
      role: 'Admin',
      department: '',
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
            _id: this.id,
            name: this.name,
            image: this.image,
            active: this.active,
            role: this.role,
            department:this.department
          }
          this.$vs.loading()
          this.$store.dispatch('editUserData', payload)
            .then(() => {
              this.$socket.emit('updateUser')
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
      this.$store.dispatch('retrieveUserDetail', id)
        .then((response) => {
          this.$vs.loading.close()
          this.user_data = response.data.data
          this.name = this.user_data.name
          this.image = this.user_data.image
          this.active = this.user_data.active
          this.role = 'Admin'
          this.department = this.user_data.department
          this.password = '1234'//data.password
          this.id = this.user_data._id
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
      console.log(e)
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