import apisauce from 'apisauce'

// eslint-disable-next-line no-undef
const baseURL =
  window.location.href.indexOf('dank') > 1 ?
  'http://54.209.247.137' : (
    window.location.href.indexOf('ngrok') > 1 ?
    'http://9681a504.ngrok.io':
    'http://localhost:8000'
  )

const Api = apisauce.create({
  timeout: 10000,
  baseURL,
})

export default Api
