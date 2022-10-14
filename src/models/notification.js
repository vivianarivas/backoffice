import { history } from 'umi'
import { notification } from 'antd'
import * as endpoint from '@/services/censys/notification'
import { handleSend } from '@/services/onesignal'

export default {
  namespace: 'notification',
  state: {
    tiposNotificacion:[],
    notificaciones:[],
    notificacion:{}
  },
  reducers: {
    SET_STATE: (state, { payload }) => ({ ...state, ...payload }),
  },
  effects: {
    *CONSULTA_TIPO_NOTIFICACION({  }, { put, call, select }) {
      const CodigoSucursal = '20'
      const IdMensaje = 'test'
      const response = yield call(
        endpoint.ConsultaTipoNotificacion,
        CodigoSucursal,
        IdMensaje
      )
      if (response) {
        yield put({
          type: 'SET_STATE',
          payload: {
            tiposNotificacion: response,
          },
        })
      }
    },
    *REGISTRA_NOTIFICACION({ payload }, { put, call, select }) {
      const { TipoDocumento, NumeroDocumento, DescripcionMensaje,	FechaVencimientoMensaje, MensajeDestacado, TipoMenCod,Concepto,	Url } = payload
      const codigoSucursal = 20
      const idMensaje = 'test'
      // debugger
      const response = yield call(
        endpoint.RegistraNotificacion,
        TipoDocumento,
        NumeroDocumento,
        DescripcionMensaje,
        FechaVencimientoMensaje,
        MensajeDestacado, 
        TipoMenCod,
        Url,
        Concepto,
        codigoSucursal,
        idMensaje,
      )
      //debugger
      if (response) {
        handleSend(MensajeDestacado,DescripcionMensaje)
        notification.success({
          message: 'Notificación Registrada',
          description: 'Registro Exitoso',
        })
        yield put({
          type: 'CONSULTAR_NOTIFICACION',
          payload: {
            tipoDocumento:TipoDocumento,
            numeroDocumento:NumeroDocumento
          },
        })
      }
      
    },
    *CONSULTAR_NOTIFICACION({ payload }, { put, call, select }) {
      const { tipoDocumento, numeroDocumento} = payload
      const codigoMensaje=''
      const codigoSucursal = '20'
      const idMensaje = 'test'
      // debugger
      const response = yield call(
        endpoint.ConsultaNotificacion,
        tipoDocumento,
        numeroDocumento,
        codigoMensaje,
        codigoSucursal,
        idMensaje,
      )
      //debugger
      if (response) {
        yield put({
          type: 'SET_STATE',
          payload: {
            notificaciones: response,
          },
        })
      }
      
    },
    *LOGOUT(_, { put, call, select }) {
      const { authProvider } = yield select(state => state.settings)
      yield call(endpoint.logout)
      yield put({
        type: 'SET_STATE',
        payload: {
          tiposNotificacion:[],
          notificaciones:[],
          notificacion:{}
        },
      })
    }
  },
  subscriptions: {

  },
}
