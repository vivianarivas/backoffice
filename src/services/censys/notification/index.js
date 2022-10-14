import apiClient from '@/services/axios'

export async function ConsultaTipoNotificacion(CodigoSucursal, IdMensaje) {
    let params = {
      CodigoSucursal: CodigoSucursal,
      IdMensaje: IdMensaje,
    }
    return apiClient
      .get('/api/BOConsultaTipoNotificacion/RecuperarBOConsultaTipoNotificacion', { params })
      .then(response => {
        if (response) {
          // debugger;
          return response.data.output
        }
        return false
      })
      .catch(err => console.log(err))
  }


export async function RegistraNotificacion(TipoDocumento, NumeroDocumento, DescripcionMensaje,	
    FechaVencimientoMensaje, MensajeDestacado, TipoMenCod,	Url, Concepto,CodigoSucursal, IdMensaje) {
    let params = {
        TipoDocumento:TipoDocumento,
        NumeroDocumento:NumeroDocumento,	
        DescripcionMensaje:DescripcionMensaje,	
        FechaVencimientoMensaje:FechaVencimientoMensaje,	
        MensajeDestacado:MensajeDestacado,	
        TipoMenCod:TipoMenCod,	
        Url:Url,	
        Concepto:Concepto,
        CodigoSucursal: CodigoSucursal,
        IdMensaje: IdMensaje,
    }
    return apiClient
      .post('/api/BORegistraNotificacion/RegistrarBORegistraNotificacion',  params)
      .then(response => {
        if (response) {
          // debugger;
          return true
        }
        return false
      })
      .catch(err => console.log(err))
  } 


  export async function ConsultaNotificacion(TipoDocumento, NumeroDocumento,CodigoMensaje,CodigoSucursal, IdMensaje) {
    let params = {
      TipoDocumento: TipoDocumento,
      NumeroDocumento: NumeroDocumento,
      CodigoMensaje: CodigoMensaje,
      CodigoSucursal: CodigoSucursal,
      IdMensaje: IdMensaje,
    }
    return apiClient
      .get('/api/BOConsultaNotificacion/RecuperarBOConsultaNotificacion?', { params })
      .then(response => {
        // debugger
        if (response) {
          return  response.data.output
        }
        return false
      })
      .catch(err => console.log(err))
  }
  
  
  export async function logout() {
    return true
  }  