import apiClient from '@/services/axiostuco'
import store from 'store'
/*
 *
 */
export async function login() {
  store.remove('accessTokenTuco')
  // let user64 = new Buffer.from('hb:'+'mrodriguez' + ':' + 'censys').toString('base64')
  let user64 = new Buffer.from('mrodriguez' + ':' + 'censys').toString('base64')
  let logindata = `grant_type=client_credentials&client_id=${process.env.API_CLIENT_ID_TUCO}&client_secret=${process.env.API_CLIENT_SECRET_TUCO}`
  return apiClient
    .post('/Token', logindata, {
      headers: { Authorization: 'Basic ' + user64 },
    })
    .then(response => {
      if (response) {
        let accessToken = response.data
        if (accessToken) {
          store.set('accessTokenTuco', accessToken)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function ConsultaProductoTarjeta(CodigoSucursal, IdMensaje) {
  let params = {
    CodigoSucursal: CodigoSucursal,
    IdMensaje: IdMensaje,
  }
  return apiClient
    .get('/api/HbConsultaProductoTarjeta/RecuperarHbConsultaProductoTarjeta', { params })
    .then(response => {
      //debugger
      if (response) {
        return response.data.output
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function TUVencimientoCierreMargen(CuentaSocio, CodigoSucursal, IdMensaje) {
  let params = {
    CuentaSocio: CuentaSocio,
    CodigoSucursal: CodigoSucursal,
    IdMensaje: IdMensaje,
  }
  return apiClient
    .get('/api/TUVencimientoCierreMargen/RecuperarTUVencimientoCierreMargen', { params })
    .then(response => {
      //debugger
      if (response) {
        return response.data.output
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function HbConsultaTarjetaResumenCab(NroCuenta, CodigoSucursal, IdMensaje) {
  let params = {
    NroCuenta: NroCuenta,
    CodigoSucursal: CodigoSucursal,
    IdMensaje: IdMensaje,
  }
  return apiClient
    .get('/api/HbConsultaTarjetaResumenCab/RecuperarHbConsultaTarjetaResumenCab', { params })
    .then(response => {
      //debugger
      if (response) {
        return response.data.output[0]
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function HbConsultaTarjetaResumenDet(
  NroCuenta,
  IdFacturacion,
  CuentaSocio,
  CodigoSucursal,
  IdMensaje,
) {
  let params = {
    NroCuenta: NroCuenta,
    IdFacturacion: IdFacturacion,
    CuentaSocio: CuentaSocio,
    CodigoSucursal: CodigoSucursal,
    IdMensaje: IdMensaje,
  }
  return apiClient
    .get('/api/HbConsultaTarjetaResumenDet/RecuperarHbConsultaTarjetaResumenDet', { params })
    .then(response => {
      //debugger
      if (response) {
        return response.data.output
      }
      return false
    })
    .catch(err => console.log(err))
}
