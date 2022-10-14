import axios from 'axios'
import store from 'store'
import { notification } from 'antd'

const sendgrid = axios.create({
  baseURL: 'https://api.sendgrid.com/v3/',
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer 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',
  },
})

sendgrid.interceptors.response.use(undefined, error => {
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
  if (response.status == 202) {
    return true // accepted
  }
  if (response.status == 401) {
    return
  }
  if (response.status == 422) {
    notification.error({
      message: 'El Token ha expirado. Vuelva a intentarlo.',
    })
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

export default sendgrid

export async function mailsend(recipients, subject, body) {
  let params = {
    personalizations: [
      {
        to: recipients,
      },
    ],
    from: {
      email: 'mvilla@censys.com.ar',
      name: 'Banco Municipal de Rosario',
    },
    subject: subject,
    content: [
      {
        type: 'text/html',
        value: body,
      },
    ],
  }
  return sendgrid
    .post('/mail/send', params)
    .then(response => {
      //debugger
      if (response) {
        return true
      }
      return false
    })
    .catch(err => console.log(err))
}
