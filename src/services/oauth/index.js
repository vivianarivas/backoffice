/*
1- login
2- RecuperarBancaDigitalClientePerfil
3- RecuperarClienteDatosGenerales
4- RecuperarHbConsultaCuenta
*/

import apiClient from '@/services/axios'
import store from 'store'
/*
 * Usuario
 */
export async function login(email, password) {
  store.remove('accessToken')
  // let user64 = new Buffer.from('hb:'+email + ':' + password).toString('base64')
  let user64 = new Buffer.from(email + ':' + password).toString('base64')
  let logindata = `grant_type=client_credentials&client_id=${process.env.API_CLIENT_ID}&client_secret=${process.env.API_CLIENT_SECRET}`
  return apiClient
    .post('/Token', logindata, {
      headers: { Authorization: 'Basic ' + user64 },
    })
    .then(response => {
      if (response) {
        let accessToken = response.data
        if (accessToken) {
          store.set('usdata', user64)
          store.set('accessToken', accessToken)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function register(dni, password, name) {
  return apiClient
    .post('/register', {
      dni,
      password,
      name,
    })
    .then(response => {
      if (response) {
        const { accessToken } = response.data
        if (accessToken) {
          store.set('accessToken', accessToken)
        }
        return response.data
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function RecuperarBancaDigitalClientePerfil(CodigoSucursal, IdMensaje) {
  let params = {
    CodigoSucursal: CodigoSucursal,
    IdMensaje: IdMensaje,
  }
  return apiClient
    .get('/api/BancaDigitalClientePerfil/RecuperarBancaDigitalClientePerfil', { params })
    .then(response => {
      if (response) {
        // debugger;
        let clientePerfil = response.data.output[0]
        if (clientePerfil) {
          clientePerfil.name = clientePerfil.denominacionCliente
          store.set('clientePerfil', clientePerfil)
        }
        return clientePerfil
      }
      return false
    })
    .catch(err => console.log(err))
}
/*
export async function ConsultaTipoDocumento(CodigoSucursal, IdMensaje) {
  let params = {
    CodigoSucursal: CodigoSucursal,
    IdMensaje: IdMensaje,
  }
  return apiClient
    .get('/api/HbConsultaTipoDocumento/RecuperarHbConsultaTipoDocumento', { params })
    .then(response => {
      if (response) {
        // debugger;
        return response.data.output
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function RecuperarClienteDatosGenerales(
  TipoDocumento,
  NumeroDocumento,
  CodigoSucursal,
  IdMensaje
  ) {
  let params = {
    TipoDocumento: TipoDocumento,
    NumeroDocumento: NumeroDocumento,
    CodigoSucursal: CodigoSucursal,
    IdMensaje: IdMensaje
  }
  return apiClient
    .get('/api/ClienteDatosGenerales/RecuperarClienteDatosGenerales', { params })
    .then(response => {
      if (response) {
        return response.data.output[0]
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function RecuperarClienteDatosGeneralesBO(  TipoDocumento,NumeroDocumento,CodigoSucursal, IdMensaje) {
  let params = {
    TipoDocumento: TipoDocumento,
    NumeroDocumento: NumeroDocumento,
    CodigoSucursal: CodigoSucursal,
    IdMensaje: IdMensaje,
  }
  return apiClient
    .get('/api/BOPerfilCliente/RecuperarBOPerfilCliente', { params })
    .then(response => {
      if (response) {
        //debugger;
        return response.data.output[0]
      }
      return false
    })
    .catch(err => console.log(err))
}


export async function RecuperarHbConsultaCuenta(TipoDocumento, NumeroDocumento,CodigoProceso, Concepto,CodigoSucursal, IdMensaje) {
  let params = {
    TipoDocumento: TipoDocumento,
    NumeroDocumento: NumeroDocumento,
    CodigoProceso:CodigoProceso,
    CodigoSucursal: CodigoSucursal,
    Concepto: Concepto,
    IdMensaje: IdMensaje,
  }
  return apiClient
    .get('/api/HbConsultaCuentaDoc/RecuperarHbConsultaCuentaDoc', { params })
    .then(response => {
      //debugger
      if (response) {
        let RecuperarHbConsultaCuenta = response.data.output
        return RecuperarHbConsultaCuenta
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function CuentaUltimosMovimientos(TipoDocumento, NumeroDocumento,CodigoSistema, CodigoMoneda,CodigoCuenta, FechaFin,CodigoSucursal, IdMensaje) {
  let params = {
    TipoDocumento: TipoDocumento,
    NumeroDocumento: NumeroDocumento,
    CodigoSistema: CodigoSistema,
    CodigoMoneda: CodigoMoneda,
    CodigoCuenta:CodigoCuenta,
    FechaFin: FechaFin,
    CodigoSucursal: CodigoSucursal,
    IdMensaje: IdMensaje,
  }
  return apiClient
    .get('/api/BOCuentaUltimosMovimientos/RecuperarBOCuentaUltimosMovimientos', { params })
    .then(response => {
      // debugger
      if (response) {
        let CuentaUltimosMovimientos = response.data
        return CuentaUltimosMovimientos
      }
      return false
    })
    .catch(err => console.log(err))
}


export async function CuentaUltimosMovimientosEntreFechas(TipoDocumento, NumeroDocumento,CodigoSistema, CodigoMoneda,CodigoCuenta,CodigoSucursal,FechaInicio, FechaFin, IdMensaje) {
  let params = {
    TipoDocumento: TipoDocumento,
    NumeroDocumento: NumeroDocumento,
    CodigoSistema: CodigoSistema,
    CodigoMoneda: CodigoMoneda,
    CodigoCuenta:CodigoCuenta,
    FechaInicio:FechaInicio,
    FechaFin: FechaFin,
    CodigoSucursal: CodigoSucursal,
    IdMensaje: IdMensaje,
  }
  return apiClient
    .get('/api/BOCuentaMovimientoEntreFechas/RecuperarBOCuentaMovimientoEntreFechas', { params })
    .then(response => {
      // debugger
      if (response) {
        let CuentaUltimosMovimientos = response.data.output
        return CuentaUltimosMovimientos
      }
      return false
    })
    .catch(err => console.log(err))
}



export async function ConsultaPlazoFijo(TipoDocumento, NumeroDocumento,CodigoSistema,CodigoSubSistema,FechaAjuste, CodigoMoneda,CodigoCuenta,CodigoSucursal, IdMensaje) {
  let params = {
    TipoDocumento: TipoDocumento,
    NumeroDocumento: NumeroDocumento,
    CodigoSistema: CodigoSistema,
    CodigoSubSistema:CodigoSubSistema,
    CodigoMoneda: CodigoMoneda,
    CodigoCuenta:CodigoCuenta,
    FechaAjuste: FechaAjuste,
    CodigoSucursal: CodigoSucursal,
    IdMensaje: IdMensaje,
  }
  return apiClient
    .get('/api/BOconsultaPlazoFijo/RecuperarBOconsultaPlazoFijo', { params })
    .then(response => {
      //debugger
      if (response) {
        return response.data.output
         
      }
      return false
    })
    .catch(err => console.log(err))
}


export async function InformeDeuda(TipoDocumento, NumeroDocumento,CodigoSistema,CodigoSubSistema,FechaAjuste, CodigoMoneda,CodigoCuenta,CodigoSucursal, IdMensaje) {
  let params = {
    TipoDocumento: TipoDocumento,
    NumeroDocumento: NumeroDocumento,
    CodigoSistema: CodigoSistema,
    CodigoSubSistema:CodigoSubSistema,
    CodigoMoneda: CodigoMoneda,
    CodigoCuenta:CodigoCuenta,
    FechaAjuste: FechaAjuste,
    CodigoSucursal: CodigoSucursal,
    IdMensaje: IdMensaje,
  }
  return apiClient
    .get('/api/BOInformeDeuda/RecuperarBOInformeDeuda', { params })
    .then(response => {
      //debugger
      if (response) {
        return response.data.output
         
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function ConsultaCuotasCredito(TipoDocumento, NumeroDocumento,CodigoSistema,CodigoSubSistema,FechaAjuste, CodigoMoneda,CodigoCuenta,NumeroOperacion,CodigoSucursal, IdMensaje) {
  let params = {
    TipoDocumento: TipoDocumento,
    NumeroDocumento: NumeroDocumento,
    CodigoSistema: CodigoSistema,
    CodigoSubSistema:CodigoSubSistema,
    FechaAjuste: FechaAjuste,
    CodigoMoneda: CodigoMoneda,
    CodigoCuenta:CodigoCuenta,
    NumeroOperacion:NumeroOperacion,
    CodigoSucursal: CodigoSucursal,
    IdMensaje: IdMensaje,
  }
  return apiClient
    .get('/api/BOConsultaCuotasCredito/RecuperarBOConsultaCuotasCredito', { params })
    .then(response => {
      //debugger
      if (response) {
        return response.data.output
         
      }
      return false
    })
    .catch(err => console.log(err))
}
*/

export async function logout() {
  store.remove('accessToken')
  store.remove('clientePerfil')
  store.remove('accessTokenPdT')
  return true
  //   return apiClient
  //     .get('/auth/logout')
  //     .then(() => {
  //       store.remove('accessToken')
  //       return true
  //     })
  //     .catch(err => console.log(err))
}
