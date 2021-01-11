<!-- =========================================================================================
    File Name: Invoice.vue
    Description: Invoice Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div id="invoice-page">

        <div class="flex flex-wrap items-center justify-between">
          <vx-input-group class="mb-base mr-3">
            <vs-input v-model="mailTo" placeholder="Email" />

            <template slot="append">
              <div class="append-text btn-addon">
                <vs-button type="border" @click="mailTo = ''" class="whitespace-no-wrap">Send Invoice</vs-button>
              </div>
            </template>
          </vx-input-group>
          <div class="flex items-center">
            <vs-button class="mb-base mr-3" type="border" icon-pack="feather" icon="icon icon-download">Download</vs-button>
            <vs-button class="mb-base mr-3" icon-pack="feather" icon="icon icon-file" @click="printInvoice">Print</vs-button>
          </div>
        </div>

        <vx-card id="invoice-container">

            <!-- INVOICE METADATA -->
            <div class="vx-row leading-loose p-base">
                <div class="vx-col w-1/2 mt-base">
                    <img src="@/assets/images/logo/logo.png" alt="vuexy-logo">
                </div>
                <div class="vx-col w-1/2 text-right">
                    <h1>Invoice</h1>
                    <div class="invoice__invoice-detail mt-6">
                        <h6>INVOICE NO.</h6>
                        <p>{{ invoiceDetails.invoiceNo }}</p>

                        <h6 class="mt-4">INVOICE DATE</h6>
                        <p>{{ invoiceDetails.invoiceDate | date(true) }}</p>
                    </div>
                </div>
                <div class="vx-col w-1/2 mt-12">
                    <h5>Recipient</h5>
                    <div class="invoice__recipient-info my-4">
                        <p>{{ recipientDetails.fullName }}</p>
                        <p>{{ recipientDetails.addressLine1 }}</p>
                        <p>{{ recipientDetails.addressLine2 }}</p>
                        <p>{{ recipientDetails.zipcode }}</p>
                    </div>
                    <div class="invoice__recipient-contact ">
                        <p class="flex items-center">
                            <feather-icon icon="MailIcon" svgClasses="h-4 w-4"></feather-icon>
                            <span class="ml-2">{{ recipientDetails.mailId }}</span>
                        </p>
                        <p class="flex items-center">
                            <feather-icon icon="PhoneIcon" svgClasses="h-4 w-4"></feather-icon>
                            <span class="ml-2">{{ recipientDetails.mobile }}</span>
                        </p>
                    </div>
                </div>
                <div class="vx-col w-1/2 mt-base text-right mt-12">
                    <h5>{{ companyDetails.name }}</h5>
                    <div class="invoice__company-info my-4">
                        <p>{{ companyDetails.addressLine1 }}</p>
                        <p>{{ companyDetails.addressLine2 }}</p>
                        <p>{{ companyDetails.zipcode }}</p>
                    </div>
                    <div class="invoice__company-contact">
                        <p class="flex items-center justify-end">
                            <feather-icon icon="MailIcon" svgClasses="h-4 w-4"></feather-icon>
                            <span class="ml-2">{{ companyDetails.mailId }}</span>
                        </p>
                        <p class="flex items-center justify-end">
                            <feather-icon icon="PhoneIcon" svgClasses="h-4 w-4"></feather-icon>
                            <span class="ml-2">{{ companyDetails.mobile }}</span>
                        </p>
                    </div>

                </div>
            </div>

            <!-- INVOICE CONTENT -->
            <div class="p-base">
                <!-- INVOICE TASKS TABLE -->
                <vs-table hoverFlat :data="invoice">
                    <!-- HEADER -->
                    <template slot="thead">
                        <vs-th class="pointer-events-none">JOB ORDER</vs-th>
                        <vs-th class="pointer-events-none">PO REF.</vs-th>
                        <vs-th class="pointer-events-none">VENDOR CODE</vs-th>
                        <vs-th v-if="invoice[0].type === 2" class="pointer-events-none">QTY</vs-th>
                        <vs-th v-if="invoice[0].type === 2" class="pointer-events-none">AMOUNT</vs-th>
                        <vs-th class="pointer-events-none">TOTAL AMOUNT</vs-th>
                    </template>

                    <!-- DATA -->
                    <template slot-scope="{data}">
                        <vs-tr v-for="(tr, i) in data" :key="i">
                            <vs-td :data="data[i].transaction_code">TRX-{{ codeGenerator(data[i].transaction_code) }}</vs-td>
                            <vs-td :data="data[i].po_ref">{{ data[i].po_ref }}</vs-td>
                            <vs-td :data="data[i].vendor_code">VEN-{{ codeGenerator(data[i].vendor_code) }}</vs-td>
                            <vs-td v-if="data[i].type === 2" :data="data[i].qty">{{ data[i].qty }}</vs-td>
                            <vs-td v-if="data[i].type === 2" :data="data[i].amount">{{ data[i].amount }}</vs-td>
                            <vs-td v-if="data[i].type === 2">{{ data[i].amount * data[i].qty }}</vs-td>
                             <vs-td v-else>{{ data[i].amount * 1 }}</vs-td>
                        </vs-tr>
                    </template>
                </vs-table>

                <!-- INVOICE SUMMARY TABLE -->
                <vs-table hoverFlat class="w-1/2 ml-auto mt-4">
                    <vs-tr>
                        <vs-th class="pointer-events-none">PPN</vs-th>
                        <vs-td>{{ invoice[0].ppn }}</vs-td>
                    </vs-tr>
                    <vs-tr>
                        <vs-th class="pointer-events-none">PPH</vs-th>
                        <vs-td>{{ invoice[0].pph }}</vs-td>
                    </vs-tr>
                    <vs-tr>
                        <vs-th class="pointer-events-none">TOTAL</vs-th>
                        <vs-td>{{ invoice[0].total_amount }}</vs-td>
                    </vs-tr>
                </vs-table>
            </div>

            <!-- INVOICE FOOTER -->
            <div class="invoice__footer text-right p-base">
                <p class="mb-4">Transfer the amounts to the business amount below. Please include invoice number on your check.</p>
                <p>
                    <span class="mr-8">BANK: <span class="font-semibold">FTSBUS33</span></span>
                    <span>IBAN: <span class="font-semibold"> G882-1111-2222-3333 </span></span>
                </p>
            </div>
        </vx-card>
    </div>
</template>

<script>

export default{
  data () {
    return {
      invoice: [{ppn: 0, pph: 0, total_amount: 0}],
      mailTo: '',
      companyDetails: {
        name: 'Microsion Technologies Pvt. Ltd.',
        addressLine1: '9 N. Sherwood Court',
        addressLine2: 'Elyria, OH',
        zipcode: '94203',
        mailId: 'hello@pixinvent.net',
        mobile: '+91 999 999 9999'
      },
      recipientDetails: {
        fullName: 'Peter Stark',
        addressLine1: '8577 West West Drive ',
        addressLine2: 'Holbrook, NY',
        zipcode: '90001',
        mailId: 'peter@mail.com',
        mobile: '+91 988 888 8888'
      },
      invoiceDetails: {
        invoiceNo: '001/2019',
        invoiceDate: 'Mon Dec 10 2018 07:46:00 GMT+0000 (GMT)'
      }
    }
  },
  async created () {
    await this.retrieveInvoice()
  },
  methods: {
    printInvoice () {
      window.print()
    },
    async retrieveInvoice () {
      await this.$store.dispatch('retrieveInvoice', this.$route.params.id)
        .then(async (response) => {
          this.invoice = response.data.data
          console.log(response.data.data)
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
    codeGenerator (code) {
      const max = 5
      let out = ''
      const len = code.toString().length
      for (let n = len; n <= max; n++) {
        out = out.concat('0')
      }
      return out.concat(code.toString())
    }
  }/*,
  mounted () {
    this.$emit('setAppClasses', 'invoice-page')
  }*/
}
</script>

<style lang="scss">
@media print {
  .invoice-page {
    * {
      visibility: hidden;
    }

    #content-area {
      margin: 0 !important;
    }

    .vs-con-table {
      .vs-con-tbody {
        overflow: hidden !important;
      }
    }

    #invoice-container,
    #invoice-container * {
      visibility: visible;
    }
    #invoice-container {
      position: absolute;
      left: 0;
      top: 0;
      box-shadow: none;
    }
  }
}

@page {
  size: auto;
}
</style>