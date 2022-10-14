import axios from 'axios'
import { notification } from 'antd'
import { history } from 'umi'

const apiClient = axios.create({
  baseURL: process.env.API_BASE_URL_PAGADETODO,
  headers: {
    'Access-Control-Allow-Origin': '*',
  },
  // timeout: 1000,
  // headers: { 'X-Custom-Header': 'foobar' }
})


apiClient.interceptors.response.use(undefined, error => {
  // Errors handling
  const { response } = error
  debugger
  if (!response) {
    notification.warning({
      message: 'Hubo un error! Intente nuevamente',
    })
  }
  const { data } = response
  // debugger
  if (response.status == 401) {
    notification.error({
      message: 'Ha expirado la sesión. Debe acceder nuevamente.',
    })
    history.push('/auth/login')
    return
  }
  if (!data) {
    notification.error({
      message: 'Hubo un error! Intente nuevamente',
    })
  } else if (data.error) {
    notification.error({
      message: data.error,
    })
  } else if (data.messageDetail) {
    notification.error({
      message: data.messageDetail,
    })
  } else if (data.message) {
    notification.error({
      message: data.message,
      description: data.exceptionMessage ? data.exceptionMessage : '',
    })
  }
})

export default apiClient
