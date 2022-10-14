import apiClient from '@/services/axios'

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

  export async function BOConsultaBuscaClienteMail(Email,CodigoSucursal, IdMensaje) {
    let params = {
      Email:Email,
      CodigoSucursal: CodigoSucursal,
      IdMensaje: IdMensaje,
    }
    return apiClient
      .get('/api/BOConsultaUsuPorEmail/RecuperarBOConsultaUsuPorEmail', { params })
      .then(response => {
        if (response) {
          // debugger;
          return response.data.output
        }
        return false
      })
      .catch(err => console.log(err))
  }

  export async function BOConsultaBuscaClienteTelefono(Telefono,CodigoSucursal, IdMensaje) {
    let params = {
      Telefono:Telefono,
      CodigoSucursal: CodigoSucursal,
      IdMensaje: IdMensaje,
    }
    return apiClient
      .get('/api/BOConsultaUsuPorTel/RecuperarBOConsultaUsuPorTel', { params })
      .then(response => {
        if (response) {
          // debugger;
          return response.data.output
        }
        return false
      })
      .catch(err => console.log(err))
  }

  export async function BOConsultaBuscaCliente(
    ConceptoBusca,
    Origen,
    FormatoSalida,
    Evalua,
    ConceptoEval,
    TipoDocumento,
    NumeroDocumento,
    TipoBusca,
    Denominacion,
    LlamadoDesde,
    CantidadFilas,
    CodigoCuenta,
    CodigoVinculo,
    CodigoPaisOrigen,
    CodigoBancoOrigen,
    CodigoSucursalOrigen,
    TipoDocumentoPrinc,
    NumeroDocumentoPrinc,
    ConsideraPrioridad,
    TipoDocAlfa,
    NumeroDocAlfa,
    CodigoSistema,
    CodigoSucursal,
    IdMensaje
    ) {
    let params = {
      ConceptoBusca,
      Origen,
      FormatoSalida,
      Evalua,
      ConceptoEval,
      TipoDocumento,
      NumeroDocumento,
      TipoBusca,
      Denominacion,
      LlamadoDesde,
      CantidadFilas,
      CodigoCuenta,
      CodigoVinculo,
      CodigoPaisOrigen,
      CodigoBancoOrigen,
      CodigoSucursalOrigen,
      TipoDocumentoPrinc,
      NumeroDocumentoPrinc,
      ConsideraPrioridad,
      TipoDocAlfa,
      NumeroDocAlfa,
      CodigoSistema,
      CodigoSucursal,
      IdMensaje
    }
    return apiClient
      .get('/api/BOConsultaBuscaCliente/RecuperarBOConsultaBuscaCliente', { params })
      .then(response => {
        if (response) {
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

export async function BOConsultaUsuarioHB(
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
    .get('/api/BOConsultaUsuarioHB/RecuperarBOConsultaUsuarioHB', { params })
    .then(response => {
      if (response) {
        return response.data.output[0]
      }
      return false
    })
    .catch(err => console.log(err))
}

export async function RecuperaAgenteOficalySituacion(
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
    .get('/api/BORecuperaAgenteOficalySituacion/RecuperarBORecuperaAgenteOficalySituacion', { params })
    .then(response => {
      if (response) {
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
        let CuentaUltimosMovimientos = response.data.output
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


export async function BlanqueoClaveHB(
  TipoDocumento,
  NumeroDocumento,
  CodigoSucursal,
  IdMensaje
  ) {
  let body = {
    TipoDocumento: TipoDocumento,
    NumeroDocumento: NumeroDocumento,
    CodigoSucursal: CodigoSucursal,
    IdMensaje: IdMensaje
  }
  return apiClient
    .put('/api/BOBlanqueoClaveHB/ModificarBOBlanqueoClaveHB',  body )
    .then(response => {
      debugger
      if (response) {
        return response
      }
      return false
    })
    .catch(err => console.log(err))
}



export async function logout() {
  return true
  //   return apiClient
  //     .get('/auth/logout')
  //     .then(() => {
  //       store.remove('accessToken')
  //       return true
  //     })
  //     .catch(err => console.log(err))
}
