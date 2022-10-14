import { history } from 'umi'
import { notification } from 'antd'
import * as oauth from '@/services/censys/credit'

export default {
  namespace: 'creditos',
  state: {
    loading: false,
    loadingtasa: false,
    tasanominal: 75,
    tasacredito: [],
    simulacioncuotacero: [],
    simulacion: [],
    confirmacion: {},
    informedeuda: [],
    cuentacreditosel: {},
    nrooperacionsel: 0,
    cuotascreditos: [],
    mensajesbanco: {},
  },
  reducers: {
    SET_STATE: (state, { payload }) => ({ ...state, ...payload }),
  },
  effects: {
    *RECUPERAR_HB_CONSULTA_TASA_CREDITO({ payload }, { put, call, select }) {
      const {
        CodigoSucursal,
        CantidadCuotasPactadas,
        ImportePactado,
        CodigoPlantilla,
        IdMensaje,
      } = payload

      const { loadingtasa } = yield select(state => state.creditos)
      if (loadingtasa === true) {
        return
      }

      yield put({
        type: 'SET_STATE',
        payload: {
          loadingtasa: true,
        },
      })
      const success = yield call(
        oauth.RecuperarHbConsultaTasaCredito,
        CodigoSucursal,
        CantidadCuotasPactadas,
        ImportePactado,
        CodigoPlantilla,
        IdMensaje,
      )
      if (success) {
        // debugger
        yield put({
          type: 'SET_STATE',
          payload: {
            tasacredito: success.output[0],
            tasanominal: success.output[0].tasa,
          },
        })
        // formSimulacionCredito.setFieldValue({tasa:success[0].tasa})
        // console.log(success[0].tasa);
        // debugger;
      } else {
        notification.warning({
          message: 'Error en la simulacion de crédito',
          description: 'Hubo un error al intentar obtener la tasa. Intente nuevamente',
        })
      }
      yield put({
        type: 'SET_STATE',
        payload: {
          loadingtasa: false,
        },
      })
    },
    *SIMULAR_CREDITO({ payload }, { put, call, select }) {
      const {
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
        TipdocUident
      } = payload
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: true,
        },
      })
      const { authProvider: autProviderName } = yield select(state => state.settings)
      const success = yield call(
        oauth.RecuperarCuentaOperacionCreditoSimulacion,
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
      )
      if (success) {
        let cero = success.output[0]
        success.output.splice(0, 1)
        let resto = success.output
        yield put({
          type: 'SET_STATE',
          payload: {
            simulacioncuotacero: cero,
            simulacion: resto,
          },
        })
        // console.log(success);
        // debugger;
      } else {
        notification.warning({
          message: 'Error en la simulacion',
          description: 'Hubo un error al intentar la simulacion. Intente nuevamente',
        })
      }
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: false,
        },
      })
    },
    *RECUPERAR_HB_CONSULTA_CUOTAS_CREDITO({ payload }, { put, call, select }) {
      const {
        CodigoSucursal,
        CodigoMoneda,
        CodigoCuenta,
        TipoDocumento,
        NumeroOperacion,
        FechaAjuste,
        IdMensaje,
      } = payload
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: true,
        },
      })
      const { authProvider: autProviderName } = yield select(state => state.settings)
      const success = yield call(
        oauth.RecuperarHbConsultaCuotasCredito,
        CodigoSucursal,
        CodigoMoneda,
        CodigoCuenta,
        TipoDocumento,
        NumeroOperacion,
        FechaAjuste,
        IdMensaje,
      )
      if (success) {
        yield put({
          type: 'SET_STATE',
          payload: {
            cuotascreditos: success.output,
          },
        })
      } else {
        notification.success({
          message: 'Créditos',
          description: 'No encontramos cuotas para el Crédito Nº ' + NumeroOperacion,
        })
      }
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: false,
        },
      })
    },
  },
  subscriptions: {
    // setup: ({ dispatch }) => {
    //   dispatch({
    //     type: 'SET_STATE',
    //     payload: {
    //       simulacioncuotacero: [],
    //       simulacion: [],
    //     },
    //   })
    // },
  },
}
