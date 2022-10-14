// import apiClient from '@/services/axiosPagadeTodo'
import store from 'store'
import apiClient from '../../axiosPagadetodo'

export async function access_token() {
  store.remove('accessTokenPagadeTodo')
  let atdata = `_operation=access_token&grant_type=client_credentials&client_id=${process.env.API_CLIENT_ID_PAGADETODO}&client_secret=${process.env.API_CLIENT_SECRET_PAGADETODO}`
  return apiClient
    .post('', atdata)
    .then(response => {
      if (response) {
        const { access_token } = response.data
        if (access_token) {
          console.log(access_token)
          store.set('accessTokenPagadeTodo', access_token)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function ConsultaApiPagaDeTodo() {
  return apiClient
    .get('/index.php?_operation=ping')
    .then(response => {
      if (response) {
        //
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function login() {
  store.remove('idPagadeTodo')
  store.remove('sessionIdPagadeTodo')
  const accessTokenPagadeTodo = store.get('accessTokenPagadeTodo')
  let atdata = `_operation=login&access_token=${accessTokenPagadeTodo}&p_username=${process.env.API_CLIENT_ID_PAGADETODO}&p_password=${process.env.PASSWORD_PAGADETODO}`
  return apiClient
    .post('', atdata)
    .then(response => {
      if (response) {
        const { id, sessionid } = response.data.result.login
        if (id && sessionid) {
          store.set('idPagadeTodo', id)
          store.set('sessionIdPagadeTodo', sessionid)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function getSaldoCliente() {
  const idPagadeTodo = store.get('idPagadeTodo')
  const sessionIdPagadeTodo = store.get('sessionIdPagadeTodo')
  const accessTokenPagadeTodo = store.get('accessTokenPagadeTodo')
  let atdata = `_operation=getSaldoCliente&access_token=${accessTokenPagadeTodo}&pvid=${idPagadeTodo}&sessionid=${sessionIdPagadeTodo}`
  return apiClient
    .post('', atdata)
    .then(response => {
      if (response) {
        return response.data.result.saldo_bolsa
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function getCargasRealizadas() {
  const idPagadeTodo = store.get('idPagadeTodo')
  const sessionIdPagadeTodo = store.get('sessionIdPagadeTodo')
  const accessTokenPagadeTodo = store.get('accessTokenPagadeTodo')
  let atdata = `_operation=getCargasRealizadas&access_token=${accessTokenPagadeTodo}&pvid=${idPagadeTodo}&sessionid=${sessionIdPagadeTodo}&fecha=2021-09-01`
  return apiClient
    .post('', atdata)
    .then(response => {
      if (response) {
        return response.data.result
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function logout() {
  return true
}
