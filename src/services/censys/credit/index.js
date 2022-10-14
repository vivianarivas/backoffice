import apiClient from '@/services/axios'

export async function RecuperarHbConsultaTasaCredito(
    CodigoSucursal,
    CantidadCuotasPactadas,
    ImportePactado,
    CodigoPlantilla,
    IdMensaje,
  ) {
    let params = {
      CodigoSucursal: CodigoSucursal,
      CodigoMoneda: '',
      CodigoProducto: '',
      FechaLiquidacion: '',
      CodigoCuenta: '',
      CantidadCuotasPactadas: CantidadCuotasPactadas,
      ImportePactado: ImportePactado,
      Plazo: '',
      CodigoRutinaLiquidacion: '',
      CodigoPlantilla: CodigoPlantilla,
      IdMensaje: IdMensaje,
    }
    // debugger
    return apiClient
      .get('/api/HbConsultaTasaCredito/RecuperarHbConsultaTasaCredito', {
        params,
      })
      .then(response => {
        if (response) {
          let RecuperarHbConsultaTasaCredito = response.data
          return RecuperarHbConsultaTasaCredito
        }
        return false
      })
      .catch(err => console.log(err))
  }

  export async function RecuperarCuentaOperacionCreditoSimulacion(
    CodigoSucursal,
    CodigoMoneda,
    CodigoProducto,
    CodigoCuenta,
    FechaLiquidacion,
    CantidadCuotasPactadas,
    CodigoRutinaLiquidacion,
    ImportePactado,
    Plazo,
    Tasa,
    ValorResidual,
    Vencimiento,
    CodigoPlantilla,
    IdMensaje,
    TipoDocumento,
    NumeroDocumento,
    CodigoSistema,
    CodigoSubSistema,
    NumeroOperacion,
    NumeroLiquidacion,
    CodigoSolicitud,
    Amortizacion,
    TipdocUident,
  ) {
    let params = {
      CodigoSucursal: CodigoSucursal,
      CodigoMoneda: CodigoMoneda,
      CodigoProducto: CodigoProducto,
      CodigoCuenta: CodigoCuenta,
      FechaLiquidacion: FechaLiquidacion,
      CantidadCuotasPactadas: CantidadCuotasPactadas,
      CodigoRutinaLiquidacion: CodigoRutinaLiquidacion,
      ImportePactado: ImportePactado,
      Plazo: Plazo,
      Tasa: Tasa,
      ValorResidual: ValorResidual,
      vencimiento: Vencimiento,
      CodigoPlantilla: CodigoPlantilla,
      IdMensaje: IdMensaje,
      TipoDocumento:TipoDocumento,
      NumeroDocumento:NumeroDocumento,
      CodigoSistema:CodigoSistema,
      CodigoSubSistema:CodigoSubSistema,
      NumeroOperacion:NumeroOperacion,
      NumeroLiquidacion:NumeroLiquidacion,
      CodigoSolicitud:CodigoSolicitud,
      Amortizacion:Amortizacion,
      TipdocUident:TipdocUident
    }
    
    return apiClient
      .get('/api/BOCuentaCreditoSimulacion/RecuperarBOCuentaCreditoSimulacion', {
        params,
      })
      .then(response => {
        if (response) {
          debugger
          let RecuperarCuentaOperacionCreditoSimulacion = response.data
          return RecuperarCuentaOperacionCreditoSimulacion
        }
        return false
      })
      .catch(err => console.log(err))
  }

  export async function RecuperarHbConsultaCuotasCredito(
    CodigoSucursal,
    CodigoMoneda,
    CodigoCuenta,
    TipoDocumento,
    NumeroOperacion,
    FechaAjuste,
    IdMensaje,
  ) {
    let params = {
      CodigoSucursal: CodigoSucursal,
      CodigoMoneda: CodigoMoneda,
      CodigoCuenta: CodigoCuenta,
      TipoDocumento: TipoDocumento,
      NumeroOperacion: NumeroOperacion,
      FechaAjuste: FechaAjuste,
      IdMensaje: IdMensaje,
    }
    // debugger
    return apiClient
      .get('/api/HbConsultaCuotasCredito/RecuperarHbConsultaCuotasCredito', {
        params,
      })
      .then(response => {
        if (response) {
          let RecuperarHbConsultaCuotasCredito = response.data
          return RecuperarHbConsultaCuotasCredito
        }
        return false
      })
      .catch(err => console.log(err))
  }