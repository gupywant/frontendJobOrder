<!-- =========================================================================================
  File Name: DashboardAnalytics.vue
  Description: Dashboard Analytics
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="transaction-document">
    <div class="vx-row mb-5">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <!-- DOC UPLOAD -->
      <div class="vx-col w-1/2">
        <vx-card title="Documents Upload" class="pb-5">
          <!--emplate slot="actions">
            <vs-button color="success" type="filled">Success</vs-button>
          </template-->
          <div slot="no-body" class="mt-4 ml-4 mb-5">
            <div class="vx-row">
              <div class="vx-col w-1/2">
                <div class="flex items-start flex-col sm:flex-row">
                  <img v-img :src="image[0][0]" class="mr-8 rounded h-24 w-24" />
                  <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
                  <div>
                    <input type="file" @change="handleImage" class="hidden" ref="update_doc_a" accept="image/*">
                    <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                    <!--vs-button class="mr-4 mb-4">Change Avatar</vs-button-->
                    <vs-button type="border" class="mr-4" icon="add_a_photo" @click="$refs.update_doc_a.click(), now(0, 0)"></vs-button>
                    <vs-button type="border" @click="removeImage(0, 0)" icon="delete" color="danger"></vs-button>
                  </div>
                </div>
              </div>
              <div class="vx-col w-1/2">
                <div class="flex items-start flex-col sm:flex-row">
                  <img v-img :src="image[0][1]" class="mr-8 rounded h-24 w-24" />
                  <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
                  <div>
                    <input type="file" @change="handleImage" class="hidden" ref="update_doc_b" accept="image/*">
                    <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                    <!--vs-button class="mr-4 mb-4">Change Avatar</vs-button-->
                    <vs-button type="border" class="mr-4" icon="add_a_photo" @click="$refs.update_doc_b.click(), now(0, 1)"></vs-button>
                    <vs-button type="border" @click="removeImage(0, 1)" icon="delete" color="danger"></vs-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </vx-card>
      </div>
      <!-- END OF DOC UPLOAD -->
      <!-- PACKING LIST INVOICE UPLOAD -->
      <div class="vx-col w-1/2">
        <vx-card title="Packing List Invoice Upload" class="pb-5">
          <!--emplate slot="actions">
            <vs-button color="success" type="filled">Success</vs-button>
          </template-->
          <div slot="no-body" class="mt-4 ml-4 mb-5">
            <div class="vx-row">
              <div class="vx-col w-1/2">
                <div class="flex items-start flex-col sm:flex-row">
                  <img v-img :src="image[1][0]" class="mr-8 rounded h-24 w-24" />
                  <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
                  <div>
                    <input type="file" @change="handleImage" class="hidden" ref="update_pl_a" accept="image/*">
                    <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                    <!--vs-button class="mr-4 mb-4">Change Avatar</vs-button-->
                    <vs-button type="border" class="mr-4" icon="add_a_photo" @click="$refs.update_pl_a.click(), now(1, 0)"></vs-button>
                    <vs-button type="border" @click="removeImage(1, 0)" icon="delete" color="danger"></vs-button>
                  </div>
                </div>
              </div>
              <div class="vx-col w-1/2">
                <div class="flex items-start flex-col sm:flex-row">
                  <img v-img :src="image[1][1]" class="mr-8 rounded h-24 w-24" />
                  <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
                  <div>
                    <input type="file" @change="handleImage" class="hidden" ref="update_pl_b" accept="image/*">
                    <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                    <!--vs-button class="mr-4 mb-4">Change Avatar</vs-button-->
                    <vs-button type="border" class="mr-4" icon="add_a_photo" @click="$refs.update_pl_b.click(), now(1, 1)"></vs-button>
                    <vs-button type="border" @click="removeImage(1, 1)" icon="delete" color="danger"></vs-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </vx-card>
      </div>
    </div>
    <div class="vx-row mb-5">
      <div class="vx-col w-full">
        <vx-card title="Container and Seal Upload" class="pb-5">
          <!--emplate slot="actions">
            <vs-button color="success" type="filled">Success</vs-button>
          </template-->
          <div slot="no-body" class="mt-4 ml-4 mb-5">
            <div class="vx-row">
              <div class="vx-col w-1/4">
                <div class="flex items-start flex-col sm:flex-row">
                  <img v-img :src="image[2][0]" class="mr-8 rounded h-24 w-24" />
                  <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
                  <div>
                    <input type="file" @change="handleImage" class="hidden" ref="update_csm_a" accept="image/*">
                    <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                    <!--vs-button class="mr-4 mb-4">Change Avatar</vs-button-->
                    <vs-button type="border" class="mr-4" icon="add_a_photo" @click="$refs.update_csm_a.click(), now(2, 0)"></vs-button>
                    <vs-button type="border" @click="removeImage(2, 0)" icon="delete" color="danger"></vs-button>
                  </div>
                </div>
              </div>
              <div class="vx-col w-1/4">
                <div class="flex items-start flex-col sm:flex-row">
                  <img v-img :src="image[2][1]" class="mr-8 rounded h-24 w-24" />
                  <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
                  <div>
                    <input type="file" @change="handleImage" class="hidden" ref="update_csm_b" accept="image/*">
                    <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                    <!--vs-button class="mr-4 mb-4">Change Avatar</vs-button-->
                    <vs-button type="border" class="mr-4" icon="add_a_photo" @click="$refs.update_csm_b.click(), now(2, 1)"></vs-button>
                    <vs-button type="border" @click="removeImage(2, 1)" icon="delete" color="danger"></vs-button>
                  </div>
                </div>
              </div>
              <div class="vx-col w-1/4">
                <div class="flex items-start flex-col sm:flex-row">
                  <img v-img :src="image[3][0]" class="mr-8 rounded h-24 w-24" />
                  <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
                  <div>
                    <input type="file" @change="handleImage" class="hidden" ref="update_csm_c" accept="image/*">
                    <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                    <!--vs-button class="mr-4 mb-4">Change Avatar</vs-button-->
                    <vs-button type="border" class="mr-4" icon="add_a_photo" @click="$refs.update_csm_c.click(), now(3, 0)"></vs-button>
                    <vs-button type="border" @click="removeImage(3, 0)" icon="delete" color="danger"></vs-button>
                  </div>
                </div>
              </div>
              <div class="vx-col w-1/4">
                <div class="flex items-start flex-col sm:flex-row">
                  <img v-img :src="image[3][1]" class="mr-8 rounded h-24 w-24" />
                  <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
                  <div>
                    <input type="file" @change="handleImage" class="hidden" ref="update_csm_d" accept="image/*">
                    <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                    <!--vs-button class="mr-4 mb-4">Change Avatar</vs-button-->
                    <vs-button type="border" class="mr-4" icon="add_a_photo" @click="$refs.update_csm_d.click(), now(3, 1)"></vs-button>
                    <vs-button type="border" @click="removeImage(3, 1)" icon="delete" color="danger"></vs-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </vx-card>
      </div>
      <!-- END OF PACKING LIST INVOICE -->
    </div>
    <div class="vx-row mb-5">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <!-- DOC UPLOAD -->
      <div class="vx-col w-1/2">
        <vx-card title="Letter of Goods Release Upload" class="pb-5">
          <!--emplate slot="actions">
            <vs-button color="success" type="filled">Success</vs-button>
          </template-->
          <div slot="no-body" class="mt-4 ml-4 mb-5">
            <div class="vx-row">
              <div class="vx-col w-1/2">
                <div class="flex items-start flex-col sm:flex-row">
                  <img v-img :src="image[4][0]" class="mr-8 rounded h-24 w-24" />
                  <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
                  <div>
                    <input type="file" @change="handleImage" class="hidden" ref="update_rel_a" accept="image/*">
                    <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                    <!--vs-button class="mr-4 mb-4">Change Avatar</vs-button-->
                    <vs-button type="border" class="mr-4" icon="add_a_photo" @click="$refs.update_rel_a.click(), now(4, 0)"></vs-button>
                    <vs-button type="border" @click="removeImage(4, 0)" icon="delete" color="danger"></vs-button>
                  </div>
                </div>
              </div>
              <div class="vx-col w-1/2">
                <div class="flex items-start flex-col sm:flex-row">
                  <img v-img :src="image[4][1]" class="mr-8 rounded h-24 w-24" />
                  <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
                  <div>
                    <input type="file" @change="handleImage" class="hidden" ref="update_rel_b" accept="image/*">
                    <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                    <!--vs-button class="mr-4 mb-4">Change Avatar</vs-button-->
                    <vs-button type="border" class="mr-4" icon="add_a_photo" @click="$refs.update_rel_b.click(), now(4, 1)"></vs-button>
                    <vs-button type="border" @click="removeImage(4, 1)" icon="delete" color="danger"></vs-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </vx-card>
      </div>
      <!-- END OF DOC UPLOAD -->
      <!-- PACKING LIST INVOICE UPLOAD -->
      <div class="vx-col w-1/2">
        <vx-card title="Stuffing Upload" class="pb-5">
          <!--emplate slot="actions">
            <vs-button color="success" type="filled">Success</vs-button>
          </template-->
          <div slot="no-body" class="mt-4 ml-4 mb-5">
            <div class="vx-row">
              <div class="vx-col w-1/2">
                <div class="flex items-start flex-col sm:flex-row">
                  <img v-img :src="image[5][0]" class="mr-8 rounded h-24 w-24" />
                  <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
                  <div>
                    <input type="file" @change="handleImage" class="hidden" ref="update_stf_a" accept="image/*">
                    <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                    <!--vs-button class="mr-4 mb-4">Change Avatar</vs-button-->
                    <vs-button type="border" class="mr-4" icon="add_a_photo" @click="$refs.update_stf_a.click(), now(5, 0)"></vs-button>
                    <vs-button type="border" @click="removeImage(5, 0)" icon="delete" color="danger"></vs-button>
                  </div>
                </div>
              </div>
              <div class="vx-col w-1/2">
                <div class="flex items-start flex-col sm:flex-row">
                  <img v-img :src="image[5][1]" class="mr-8 rounded h-24 w-24" />
                  <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
                  <div>
                    <input type="file" @change="handleImage" class="hidden" ref="update_stf_b" accept="image/*">
                    <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                    <!--vs-button class="mr-4 mb-4">Change Avatar</vs-button-->
                    <vs-button type="border" class="mr-4" icon="add_a_photo" @click="$refs.update_stf_b.click(), now(5, 1)"></vs-button>
                    <vs-button type="border" @click="removeImage(5, 1)" icon="delete" color="danger"></vs-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </vx-card>
      </div>
    </div>
    <div class="vx-row mb-5">
      <!-- CARD 9: DISPATCHED ORDERS -->
      <!-- DOC UPLOAD -->
      <div class="vx-col w-1/2">
        <vx-card title="Yellow Card Upload" class="pb-5">
          <!--emplate slot="actions">
            <vs-button color="success" type="filled">Success</vs-button>
          </template-->
          <div slot="no-body" class="mt-4 ml-4 mb-5">
            <div class="vx-row">
              <div class="vx-col w-1/2">
                <div class="flex items-start flex-col sm:flex-row">
                  <img v-img :src="image[6][0]" class="mr-8 rounded h-24 w-24" />
                  <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
                  <div>
                    <input type="file" @change="handleImage" class="hidden" ref="update_yel_a" accept="image/*">
                    <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                    <!--vs-button class="mr-4 mb-4">Change Avatar</vs-button-->
                    <vs-button type="border" class="mr-4" icon="add_a_photo" @click="$refs.update_yel_a.click(), now(6, 0)"></vs-button>
                    <vs-button type="border" @click="removeImage(6, 0)" icon="delete" color="danger"></vs-button>
                  </div>
                </div>
              </div>
              <div class="vx-col w-1/2">
                <div class="flex items-start flex-col sm:flex-row">
                  <img v-img :src="image[6][1]" class="mr-8 rounded h-24 w-24" />
                  <!-- <vs-avatar :src="data.avatar" size="80px" class="mr-4" /> -->
                  <div>
                    <input type="file" @change="handleImage" class="hidden" ref="update_yel_b" accept="image/*">
                    <!-- Toggle comment of below buttons as one for actual flow & currently shown is only for demo -->
                    <!--vs-button class="mr-4 mb-4">Change Avatar</vs-button-->
                    <vs-button type="border" class="mr-4" icon="add_a_photo" @click="$refs.update_yel_b.click(), now(6, 1)"></vs-button>
                    <vs-button type="border" @click="removeImage(6, 1)" icon="delete" color="danger"></vs-button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </vx-card>
      </div>
      <!-- END OF DOC UPLOAD -->
       <div class="vx-col w-1/2">

        <vx-card title="Save Image" class="pb-5">
          <!--emplate slot="actions">
            <vs-button color="success" type="filled">Success</vs-button>
          </template-->
          <div slot="no-body" class="mt-4 mb-5 pl-5">
            <div class="mt-8">
              <vs-button class="ml-auto mt-2" @click="uploadImage()">Save</vs-button>
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
      typeNow: 99,
      imageNow: 99,
      image: [['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', ''], ['', '']]
    }
  },
  components: {
  },
  async created () {
    this.$vs.loading()
    this.loadData()
  },
  methods: {
    now (m, n) {
      this.typeNow = m
      this.imageNow = n
    },
    removeImage (m, n) {
      this.image[m].splice(n, 1, '')
    },
    async handleImage (e) {
      const selectedImage = e.target.files[0]
      this.textt = await this.createBase64Image(selectedImage, this.imageNow)
    },
    async createBase64Image (fileObject, n) {
      const reader = new FileReader()
      reader.onload = fileObject => {
        this.image[this.typeNow].splice(n, 1, fileObject.target.result)
      }
      reader.readAsDataURL(fileObject)
    },
    codeGenerator (code) {
      const max = 5
      let out = ''
      const len = code.toString().length
      for (let n = len; n <= max; n++) {
        out = out.concat('0')
      }
      return out.concat(code.toString())
    },
    loadData () {
      this.retrieveImage()
    },
    async retrieveImage () {
      await this.$store.dispatch('retrieveImage', this.$route.params.id)
        .then(async (response) => {
          const i = await response.data.data[0]
          this.image = await [
            [i.doc1, i.doc2], 
            [i.pli1, i.pli2],
            [i.csm1, i.csm2],
            [i.csm3, i.csm4],
            [i.rel1, i.rel2],
            [i.stf1, i.stf2],
            [i.yel1, i.yel2]
          ]
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
    async uploadImage () {
      this.$vs.loading()
      const payload = {
        id: this.$route.params.id,
        image: this.image
      }
      await this.$store.dispatch('uploadImage', payload)
        .then(async (response) => {
          this.$vs.loading.close()
          this.$vs.notify({
            title: 'Success',
            text: response.data.message,
            iconPack: 'feather',
            icon: 'icon-alert-circle',
            color: 'success'
          })
        })
        .catch((error) => {
          console.log(error)
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
    format_date (value) {
      if (value) {
        return moment(String(value)).format('D MMM YYYY')
      }
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