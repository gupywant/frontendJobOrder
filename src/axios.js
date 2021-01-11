// axios
import axios from 'axios'

const baseURL = 'http://139.255.161.189:3000'

export default axios.create({
  baseURL
  // You can add your headers here
})
