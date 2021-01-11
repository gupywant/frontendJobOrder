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
        <vx-card title="User List">
          <!--emplate slot="actions">
            <vs-button color="success" type="filled">Success</vs-button>
          </template-->
          <div slot="no-body" class="mt-4">
            <vs-table search max-items="5" pagination :data="userList" class="table-dark-inverted" stripe>
              <template slot="thead">
                <vs-th>NO</vs-th>
                <vs-th>IMAGE</vs-th>
                <vs-th>EMAIL</vs-th>
                <vs-th>NAME</vs-th>
                <vs-th>CREATED AT</vs-th>
                <vs-th>UPDATED AT</vs-th>
                <vs-th>STATUS</vs-th>
                <vs-th>DETAIL</vs-th>
              </template>

              <template slot-scope="{data}">
                <vs-tr :key="i" v-for="(tr, i) in data">
                  <vs-td :data="i">
                    <span>{{i+1}}</span>
                  </vs-td>
                  <vs-td :data="data[i].image">
                    <div class="con-images">
                      <img class="rounded-full shadow-md cursor-pointer block" width="40" height="40" :hover="hover" :key="i" :src="`${data[i].image}`"/>
                    </div>
                  </vs-td>
                  <vs-td :data="data[i].npm">
                    <span>{{data[i].email}}</span>
                  </vs-td>
                  <vs-td :data="data[i].nama">
                    <span>{{data[i].name}}</span>
                  </vs-td>
                  <vs-td :data="data[i].createdAt">
                    <span>{{format_date(data[i].createdAt)}}</span>
                  </vs-td>
                  <vs-td :data="data[i].updatedAt">
                    <span>{{format_date(data[i].updatedAt)}}</span>
                  </vs-td>
                  <vs-td :data="data[i]">
                    <vs-switch @click="statusUpdate(data[i])" color="success" :value="data[i].active" />
                  </vs-td>
                  <vs-td>
                    <vs-button :to="{name: 'user-view', params: { id: data[i]._id }}" color="primary" icon="create" type="border"></vs-button>
                  </vs-td>
                </vs-tr>
              </template>
            </vs-table>
          </div>
          <!--div>
            <vs-pagination :total="10" v-model="pageNow" prev-icon="arrow_back" next-icon="arrow_forward"></vs-pagination>
          </div-->
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
      userList: [],
      pageNow: 10,
      polling: null,
      hover: 'scale',
      id: '',
      name: '',
      image: '',
      active: '',
      password: '',
      role: '',
      department: ''
    }
  },
  async created () {
    this.loadData()
    this.$vs.loading()
    this.sockets.subscribe('updateUser', () => {
      this.retrieveUserList()
    })
    //this.loadData()
  },
  methods: {
    loadData () {
      this.retrieveUserList()
    },
    retrieveUserList () {
      this.userList = []
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
    },
    async statusUpdate (data) {
      this.name = data.name
      this.image = data.image
      this.active = !data.active
      this.role = 'admin'
      this.department = this.department
      this.password = '1234'//data.password
      this.id = data._id
      await this.editUserData()
    },
    editUserData () {
      const payload = {
        _id: this.id,
        name: this.name,
        image: this.image,
        active: this.active,
        role: this.role,
        department: this.department,
        password: '1234'//this.password
      }
      this.$store.dispatch('editUserData', payload)
        .then(() => {
          this.$socket.emit('updateUser')
          this.$vs.notify({
            title: 'Success',
            text: 'Update Success',
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
          this.retrieveUserList()
        })
        .catch((error) => { 
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