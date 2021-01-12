/*=========================================================================================
  File Name: actions.js
  Description: Vuex Store - actions
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
==========================================================================================*/
import axios from 'axios'
import router from '@/router'

axios.defaults.baseURL = 'https://uat-api.getrans.co.id/v1'
axios.defaults.headers = { 'Access-Control-Allow-Origin' : '*'}

/////////////////////////////
///add by gupy wantoro
////////////////////////////
const afterLogin = axios.create({
  baseURL: 'https://uat-api.getrans.co.id/v1',
  headers: { 'Access-Control-Allow-Origin' : '*'}
})

/* local configuration
axios.defaults.baseURL = 'http://localhost:3000'
axios.defaults.headers = { 'Access-Control-Allow-Origin' : '*'}

/////////////////////////////
///add by gupy wantoro
////////////////////////////
const afterLogin = axios.create({
  baseURL: 'http://localhost:3000',
  headers: { 'Access-Control-Allow-Origin' : '*'}
})
*/
//Axios after login code
afterLogin.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('accessToken')
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)
/////////////////////////////
///end of add by gupy wantoro
////////////////////////////

const actions = {

  /////////////////////////////
  ///add by gupy wantoro
  ////////////////////////////
  retrieveImage (context, id) {
    return new Promise((resolve, reject) => {
      afterLogin.get(`/api/v1/transaction/image/${id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status === 500) {
            reject({message: 'Ups Something went Wrong, please make sure if service exist'})
          } else {
            reject(error)
          }
          reject({message: 'Ups Something went Wrong, please try again'})
          reject(error)
          resolve(error)
        })
    })
  },
  uploadImage (context, payload) {
    return new Promise((resolve, reject) => {
      afterLogin.post(`/api/v1/transaction/image/${payload.id}`, payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status === 500) {
            reject({message: 'Ups Something went Wrong, please make sure if service exist'})
          } else {
            reject(error)
          }
          reject({message: 'Ups Something went Wrong, please try again'})
          reject(error)
          resolve(error)
        })
    })
  },
  cancelInvoice (context, id) {
    return new Promise((resolve, reject) => {
      afterLogin.delete(`/api/v1/invoice/cancel/${id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status === 500) {
            reject({message: 'Ups Something went Wrong, please make sure if service exist'})
          } else {
            reject(error)
          }
          reject({message: 'Ups Something went Wrong, please try again'})
          reject(error)
          resolve(error)
        })
    })
  },
  retrieveInvoice (context, id) {
    return new Promise((resolve, reject) => {
      afterLogin.get(`/api/v1/invoice/${id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  retrieveInvoiceList () {
    return new Promise((resolve, reject) => {
      afterLogin.get('/api/v1/invoice')
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  addInvoice (context, payload) {
    return new Promise((resolve, reject) => {
      afterLogin.post('/api/v1/invoice', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          if (error.response.status === 400) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  retrieveInvoiceAcceptedList (context, id) {
    return new Promise((resolve, reject) => {
      afterLogin.get(`/api/v1/transaction/invoice/accepted/${id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  retrieveAcceptedList () {
    return new Promise((resolve, reject) => {
      afterLogin.get('/api/v1/transaction/accepted')
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  settlementTransaction (context, payload) {
    return new Promise((resolve, reject) => {
      afterLogin.post('/api/v1/transaction/settlement', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          if (error.response.status === 400) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  retrieveCancelList () {
    return new Promise((resolve, reject) => {
      afterLogin.get('/api/v1/transaction/cancel/')
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  cancelTransaction (context, id) {
    return new Promise((resolve, reject) => {
      afterLogin.delete(`/api/v1/transaction/cancel/${id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status === 500) {
            reject({message: 'Ups Something went Wrong, please make sure if service exist'})
          } else {
            reject(error)
          }
          reject({message: 'Ups Something went Wrong, please try again'})
          reject(error)
          resolve(error)
        })
    })
  },
  approve1 (context, id) {
    return new Promise((resolve, reject) => {
      afterLogin.put(`/api/v1/transaction/approving1/${id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status === 500) {
            reject({message: 'Ups Something went Wrong, please make sure if service exist'})
          } else {
            reject(error)
          }
          reject({message: 'Ups Something went Wrong, please try again'})
          reject(error)
          resolve(error)
        })
    })
  },
  approve2 (context, id) {
    return new Promise((resolve, reject) => {
      afterLogin.put(`/api/v1/transaction/approving2/${id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status === 500) {
            reject({message: 'Ups Something went Wrong, please make sure if service exist'})
          } else {
            reject(error)
          }
          reject({message: 'Ups Something went Wrong, please try again'})
          reject(error)
          resolve(error)
        })
    })
  },
  getApprovalSetting () {
    return new Promise((resolve, reject) => {
      afterLogin.get('/api/v1/approvalSetting/')
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status === 404) {
            reject({message: 'Set new approval now'})
          } else {
            reject({message: 'Ups Something went Wrong, please try again'})
          }
          reject(error)
          resolve(error)
        })
    })
  },
  saveApprovalSetting (context, payload) {
    return new Promise((resolve, reject) => {
      afterLogin.post('/api/v1/approvalSetting/', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          reject({message: 'Ups Something went Wrong, please try again'})
          reject(error)
          resolve(error)
        })
    })
  },
  deleteCustomerService (context, payload) {
    return new Promise((resolve, reject) => {
      afterLogin.post(`/api/v1/customerService/${payload.id_customer}`, payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status === 500) {
            reject({message: 'Ups Something went Wrong, please make sure if service exist'})
          } else {
            reject(error)
          }
          reject({message: 'Ups Something went Wrong, please try again'})
          reject(error)
          resolve(error)
        })
    })
  },
  retrieveApprovalList (context, approval) {
    console.log(approval)
    return new Promise((resolve, reject) => {
      afterLogin.get(`/api/v1/transaction/approval/${approval}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  deleteTransaction (context, id) {
    return new Promise((resolve, reject) => {
      afterLogin.delete(`/api/v1/transaction/${id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status === 500) {
            reject({message: 'Ups Something went Wrong, please make sure if service exist'})
          } else {
            reject(error)
          }
          reject({message: 'Ups Something went Wrong, please try again'})
          reject(error)
          resolve(error)
        })
    })
  },
  editTransaction (context, payload) {
    return new Promise((resolve, reject) => {
      afterLogin.put(`/api/v1/transaction/${payload._id}`, payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          if (error.response.status === 400) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  retrieveTransactionDetail (context, id) {
    return new Promise((resolve, reject) => {
      afterLogin.get(`/api/v1/transaction/${id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  retrieveTransactionList () {
    return new Promise((resolve, reject) => {
      afterLogin.get('/api/v1/transaction')
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  addTransaction (context, payload) {
    return new Promise((resolve, reject) => {
      afterLogin.post('/api/v1/transaction', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          if (error.response.status === 400) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  retrieveAvailServiceList (context, id) {
    return new Promise((resolve, reject) => {
      afterLogin.get(`/api/v1/customerServiceAvail/${id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  deleteAllCustomerService (context, id) {
    return new Promise((resolve, reject) => {
      afterLogin.delete(`/api/v1/customerDeleteAll/${id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status === 500) {
            reject({message: 'Ups Something went Wrong, please make sure if service exist'})
          } else {
            reject(error)
          }
          reject({message: 'Ups Something went Wrong, please try again'})
          reject(error)
          resolve(error)
        })
    })
  },
  retrieveCustomerServiceList (context, id) {
    return new Promise((resolve, reject) => {
      afterLogin.get(`/api/v1/customerService/${id}`)
        .then((response) => {
          context.commit('retrieveCustomerServiceList', response)
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  addCustomerService (context, payload) {
    return new Promise((resolve, reject) => {
      afterLogin.post('/api/v1/customerService', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          if (error.response.status === 400) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  editServiceData (context, payload) {
    return new Promise((resolve, reject) => {
      afterLogin.put(`/api/v1/service/${payload.id}`, payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  deleteService (context, id) {
    return new Promise((resolve, reject) => {
      afterLogin.delete(`/api/v1/service/${id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status === 500) {
            reject({message: 'Ups Something went Wrong, please make sure if service exist'})
          } else {
            reject(error)
          }
          reject({message: 'Ups Something went Wrong, please try again'})
          reject(error)
          resolve(error)
        })
    })
  },
  addService (context, payload) {
    return new Promise((resolve, reject) => {
      afterLogin.post('/api/v1/service', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          if (error.response.status === 400) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  retrieveServiceList (context) {
    return new Promise((resolve, reject) => {
      afterLogin.get('/api/v1/service')
        .then((response) => {
          context.commit('retrieveServiceList', response)
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  deleteVendor (context, id) {
    return new Promise((resolve, reject) => {
      afterLogin.delete(`/api/v1/vendor/${id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status === 500) {
            reject({message: 'Ups Something went Wrong, please make sure if user exist'})
          } else {
            reject(error)
          }
          reject({message: 'Ups Something went Wrong, please try again'})
          reject(error)
          resolve(error)
        })
    })
  },
  editVendorData (context, payload) {
    return new Promise((resolve, reject) => {
      afterLogin.put(`/api/v1/vendor/${payload.id}`, payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  retrieveVendorDetail (context, id) {
    return new Promise((resolve, reject) => {
      afterLogin.get(`/api/v1/vendor/${id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status === 500) {
            reject({message: 'Ups Something went Wrong, please make sure if user exist'})
          } else {
            reject(error)
          }
          reject({message: 'Ups Something went Wrong, please try again'})
          reject(error)
          resolve(error)
        })
    })
  },
  addVendor (context, payload) {
    return new Promise((resolve, reject) => {
      afterLogin.post('/api/v1/vendor', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  retrieveVendorList (context) {
    return new Promise((resolve, reject) => {
      afterLogin.get('/api/v1/vendors')
        .then((response) => {
          context.commit('retrieveVendorList', response)
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  deleteCustomer (context, id) {
    return new Promise((resolve, reject) => {
      afterLogin.delete(`/api/v1/customer/${id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status === 500) {
            reject({message: 'Ups Something went Wrong, please make sure if user exist'})
          } else {
            reject(error)
          }
          reject({message: 'Ups Something went Wrong, please try again'})
          reject(error)
          resolve(error)
        })
    })
  },
  editCustomerData (context, payload) {
    return new Promise((resolve, reject) => {
      afterLogin.put(`/api/v1/customer/${payload.id}`, payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  retrieveCustomerDetail (context, id) {
    return new Promise((resolve, reject) => {
      afterLogin.get(`/api/v1/customer/${id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status === 500) {
            reject({message: 'Ups Something went Wrong, please make sure if user exist'})
          } else {
            reject(error)
          }
          reject({message: 'Ups Something went Wrong, please try again'})
          reject(error)
          resolve(error)
        })
    })
  },
  addCustomer (context, payload) {
    return new Promise((resolve, reject) => {
      afterLogin.post('/api/v1/customer', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  retrieveCustomerList (context) {
    return new Promise((resolve, reject) => {
      afterLogin.get('/api/v1/customers')
        .then((response) => {
          context.commit('retrieveCustomerList', response)
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  deleteUser (context, id) {
    return new Promise((resolve, reject) => {
      afterLogin.delete(`/api/v1/user/${id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status === 500) {
            reject({message: 'Ups Something went Wrong, please make sure if user exist'})
          } else {
            reject(error)
          }
          reject({message: 'Ups Something went Wrong, please try again'})
          reject(error)
          resolve(error)
        })
    })
  },
  addUser (context, payload) {
    return new Promise((resolve, reject) => {
      afterLogin.post('/api/v1/users/add', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  editUserData (context, payload) {
    return new Promise((resolve, reject) => {
      afterLogin.post('/api/v1/user/update', payload)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  retrieveUserDetail (context, id) {
    return new Promise((resolve, reject) => {
      afterLogin.get(`/api/v1/user?id=${id}`)
        .then((response) => {
          resolve(response)
        })
        .catch((error) => {
          if (error.response.status === 500) {
            reject({message: 'Ups Something went Wrong, please make sure if user exist'})
          } else {
            reject(error)
          }
          reject({message: 'Ups Something went Wrong, please try again'})
          reject(error)
          resolve(error)
        })
    })
  },
  retrieveUserList (context) {
    return new Promise((resolve, reject) => {
      afterLogin.get('/api/v1/users')
        .then((response) => {
          context.commit('retrieveUserList', response)
          resolve(response)
        })
        .catch((error) => {
          let pesan = 'Ups Something went Wrong, please try again'
          if (error.response.status === 404) {
            pesan = error.response.data.description
          }
          reject({message: pesan})
          reject(error)
        })
    })
  },
  destroyToken (context) {
    //axios.defaults.headers.common['Authorization'] = `Bearer ${context.state.token}`

    if (context.getters.isLogedIn) {
      localStorage.removeItem('accessToken')
      localStorage.removeItem('userInfo')

      context.commit('destroyToken')
    }
  },
  retrieveToken (context, payload) {
    /*
    //used when server down for develop mode only
    localStorage.setItem('accessToken', 'response.data.data.token')
    console.log(payload)
    // Set bearer token in axios
    context.commit('retrieveToken', 'response.data.data.token')

    //push to required admin area
    router.push({ name: 'dashboard-analytics'})
    */
    return new Promise((resolve, reject) => {
      axios.post('login', payload)
        .then(response => {
          if (response.data.data.auth) {
            // Set accessToken
            const userInfo = `{"uid":34, "displayName":"${response.data.data.name}", "about":"non", "photoURL":"${response.data.data.image}", "status":"online", "userRole":"admin", "email":"admin@admin.com", "providerId":"jwt"}`
            localStorage.setItem('accessToken', response.data.data.token)

            //set user info for acl
            localStorage.setItem('userInfo', userInfo)

            // Set bearer token in axios
            context.commit('retrieveToken', response.data.data.token)

            //push to required admin area
            router.push({ name: 'dashboard-analytics'})
          } else {
            reject({message: 'Wrong Email or Password'})
          }
          resolve(response)
        })
        .catch(error => { 
          if (error.response.status === 401) {
            reject({message: 'Wrong Email or Password'})
          } else {
            reject(error)
          }
        })
    })
  },
  /////////////////////////////
  ///end of add by gupy wantoro
  ////////////////////////////

  // /////////////////////////////////////////////
  // COMPONENTS
  // /////////////////////////////////////////////

  // Vertical NavMenu
  updateVerticalNavMenuWidth ({ commit }, width) {
    commit('UPDATE_VERTICAL_NAV_MENU_WIDTH', width)
  },

  // VxAutoSuggest
  updateStarredPage ({ commit }, payload) {
    commit('UPDATE_STARRED_PAGE', payload)
  },

  // The Navbar
  arrangeStarredPagesLimited ({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_LIMITED', list)
  },
  arrangeStarredPagesMore ({ commit }, list) {
    commit('ARRANGE_STARRED_PAGES_MORE', list)
  },

  // /////////////////////////////////////////////
  // UI
  // /////////////////////////////////////////////

  toggleContentOverlay ({ commit }) {
    commit('TOGGLE_CONTENT_OVERLAY')
  },
  updateTheme ({ commit }, val) {
    commit('UPDATE_THEME', val)
  },

  // /////////////////////////////////////////////
  // User/Account
  // /////////////////////////////////////////////

  updateUserInfo ({ commit }, payload) {
    commit('UPDATE_USER_INFO', payload)
  },
  updateUserRole ({ dispatch }, payload) {
    // Change client side
    payload.aclChangeRole(payload.userRole)

    // Make API call to server for changing role

    // Change userInfo in localStorage and store
    dispatch('updateUserInfo', {userRole: payload.userRole})
  }
}

export default actions
