import Vue from 'vue'
import { AclInstaller, AclCreate, AclRule } from 'vue-acl'
import router from '@/router'

Vue.use(AclInstaller)

let initialRole = 'admin'

const userInfo = JSON.parse(localStorage.getItem('userInfo'))
if (userInfo && userInfo.userRole) initialRole = userInfo.userRole

export default new AclCreate({
  initial  : initialRole,
  notfound : '/login',
  router,
  acceptLocalRules : true,
  globalRules: {
    admin  : new AclRule('admin').generate(),
    auth : new AclRule('auth').generate()
  }
})
