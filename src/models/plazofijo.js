import { history } from 'umi'
import { notification } from 'antd'
import * as oauth from '@/services/oauth'

// const mapAuthProviders = {
//   oauth: {
//     RecuperarCuentaOperacionPlazoFijoSimulacion: oauth.RecuperarCuentaOperacionPlazoFijoSimulacion,
//     RegistrarCuentaOperacionPlazoFijoLiquidacion:
//       oauth.RegistrarCuentaOperacionPlazoFijoLiquidacion,
//   },
// }

export default {
  namespace: 'plazofijo',
  state: {
    loading: false,
    loadingtasa: false,
    tasapf: {},
    tasanominal: 0,
    ImportePactado: 0,
    Plazo: 0,
    CodigoCuenta: null,
    simulacion: [],
    confirmacion: [],
    cuentapfsel: {},
    nrooperacionsel: 0,
    informepf: [],
    mensajesbanco: {},
  },
  reducers: {
    SET_STATE: (state, { payload }) => ({ ...state, ...payload }),
  },
  effects: {
    /*  
    *RECUPERAR_HB_CONSULTA_TASA_PLAZO_FIJO({ payload }, { put, call, select }) {
      const {
        CodigoSucursal,
        CodigoMoneda,
        CodigoProducto,
        CodigoRutinaLiquidacion,
        ImportePactado,
        Plazo,
        FechaLiquidacion,
        CodigoPlantilla,
        IdMensaje,
      } = payload
      yield put({
        type: 'SET_STATE',
        payload: {
          loadingtasa: true,
        },
      })
      // const { authProvider: autProviderName } = yield select(state => state.settings)
      // debugger
      const success = yield call(
        oauth.RecuperarHbConsultaTasaPlazoFijo,
        CodigoSucursal,
        CodigoMoneda,
        CodigoProducto,
        CodigoRutinaLiquidacion,
        ImportePactado,
        Plazo,
        FechaLiquidacion,
        CodigoPlantilla,
        IdMensaje,
      )
      if (success) {
        yield put({
          type: 'SET_STATE',
          payload: {
            tasapf: success.output[0],
            tasanominal: success.output[0].tasa,
          },
        })
        console.log(success)
        // debugger;
      } else {
        notification.warning({
          message: 'Error al obtener la Tasa',
          description: 'Hubo un error al obtener la tasa. Intente nuevamente',
        })
      }
      yield put({
        type: 'SET_STATE',
        payload: {
          loadingtasa: false,
        },
      })
    },

    *SIMULAR_PLAZOFIJO({ payload }, { put, call, select }) {
      const {
        CodigoSucursal,
        ImportePactado,
        Plazo,
        CodigoPlantilla,
        CodigoMoneda,
        CodigoCuenta,
        FechaLiquidacion,
        CodigoProducto,
        CodigoRutinaLiquidacion,
        CodigoFuncion,
        CodigoDatos,
        PlazoInteres,
        Proceso,
        CodigoRetencionImpuesto,
        CodigoImpuestoGanancia,
        CodigoPaisResidente,
        CodigoSistemaCuentaDebito,
        CodigoSucursalCuentaDebito,
        CodigoCuentaDebito,
        CodigoMonedaCuentaDebito,
        IdMensaje,
      } = payload
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: true,
        },
      })

      const success = yield call(
        oauth.RecuperarCuentaOperacionPlazoFijoSimulacion,
        CodigoSucursal,
        ImportePactado,
        Plazo,
        CodigoPlantilla,
        CodigoMoneda,
        CodigoCuenta,
        FechaLiquidacion,
        CodigoProducto,
        CodigoRutinaLiquidacion,
        CodigoFuncion,
        CodigoDatos,
        PlazoInteres,
        Proceso,
        CodigoRetencionImpuesto,
        CodigoImpuestoGanancia,
        CodigoPaisResidente,
        CodigoSistemaCuentaDebito,
        CodigoSucursalCuentaDebito,
        CodigoCuentaDebito,
        CodigoMonedaCuentaDebito,
        IdMensaje,
      )
      if (success) {
        yield put({
          type: 'SET_STATE',
          payload: {
            simulacion: success.output,
          },
        })
        // console.log(success)
        // debugger;
      } else {
        notification.warning({
          message: 'Error en la simulacion',
          description: 'Hubo un error al simular el Plazo Fijo. Intente nuevamente',
        })
      }
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: false,
        },
      })
    },
    *CONFIRMAR_PLAZOFIJO({ payload }, { put, call, select }) {

      const {
        CodigoSucursal,
        ImportePactado,
        Plazo,
        FechaLiquidacion,
        RenovacionAutomatica,
        CodigoSistemaCuentaDebito,
        CodigoCuentaDebito,
        CodigoPlantilla,
        IdMensaje,
        callback,
      } = payload
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: true,
        },
      })
      // const { authProvider: autProviderName } = yield select(state => state.settings)
      const success = yield call(
        oauth.RegistrarCuentaOperacionPlazoFijoLiquidacion,
        CodigoSucursal,
        ImportePactado,
        Plazo,
        FechaLiquidacion,
        RenovacionAutomatica,
        CodigoSistemaCuentaDebito,
        CodigoCuentaDebito,
        CodigoPlantilla,
        IdMensaje,
      )
      console.log(success)
      if (success) {
        yield put({
          type: 'SET_STATE',
          payload: {
            confirmacion: success,
          },
        })
        history.push('/apps/solicitudplazofijo/acreditacion')
      } else {
        notification.warning({
          message: 'Error en la solicitud',
          description: 'Hubo un error al intentar solicitar el Plazo Fijo. Intente nuevamente',
        })
      }
      setTimeout(Math.random() > 0.5 ? callback.resolve : callback.reject, 500)
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: false,
        },
      })
    },
    *RECUPERAR_HB_CONSULTA_PLAZOFIJO({ payload }, { put, call, select }) {
      const { CodigoSucursal, CodigoMoneda, CodigoCuenta, FechaAjuste, IdMensaje } = payload
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: true,
        },
      })
      // const { authProvider: autProviderName } = yield select(state => state.settings)
      const success = yield call(
        oauth.RecuperarHbConsultaPlazoFijo,
        CodigoSucursal,
        CodigoMoneda,
        CodigoCuenta,
        FechaAjuste,
        IdMensaje,
      )
      console.log(success)
      if (success) {
        yield put({
          type: 'SET_STATE',
          payload: {
            informepf: success.output,
          },
        })
      } else {
        notification.warning({
          message: 'Error en la solicitud',
          description: 'Hubo un error al realizar la busqueda de plazos fijos',
        })
      }
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: false,
        },
      })
    },
    *RECUPERAR_HB_CONSULTA_MENSAJES_BANCO({ payload }, { put, call, select }) {
      const {
        CodigoTipoImpresion,
        Fecha,
        CodigoPlantilla,
        CodigoSucursal,
        IdMensaje,
        setIsModalVisible,
      } = payload

      const success = yield call(
        oauth.RecuperarHbConsultaMensajesBanco,
        CodigoTipoImpresion,
        Fecha,
        CodigoPlantilla,
        CodigoSucursal,
        IdMensaje,
      )
      if (success) {
        yield put({
          type: 'SET_STATE',
          payload: {
            mensajesbanco: success.output[0],
          },
        })
        setIsModalVisible(true)
      } else {
        notification.success({
          message: 'Plazo Fijo',
          description: 'No encontramos Mensaje de Banco disponible ',
        })
      }

    },
    */
  },
  subscriptions: {

  },
}
