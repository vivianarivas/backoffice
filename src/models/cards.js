import { history } from 'umi'
import { notification } from 'antd'
import * as oauth from '@/services/oauthtuco'

export default {
  namespace: 'card',
  state: {
    tarjetas:[],
    resumenes:[],
    nroCuenta:'',
    CuentaSocio:'',
    descripcionMarca:'',
    entidadDescripcion:'',
    TarjetaResumen:{}
  },
  reducers: {
    SET_STATE: (state, { payload }) => ({ ...state, ...payload }),
  },
  effects: {
    *LOGIN({ }, { put, call, select }) {
      const success = yield call(oauth.login)
      if (success) {
        yield put({
          type: 'CONSULTA_TIPO_DOCUMENTO',
        })
      }
      if (!success) {
        notification.error({
          message: 'Error',
          description: 'Se produjo un error al recuerar las tarjetas',
        })
      }
    },

    *CONSULTA_TIPO_DOCUMENTO({  }, { put, call, select }) {
      const CodigoSucursal = '0'
      const IdMensaje = 'ConsultaTarjeta'
      const response = yield call(
        oauth.ConsultaProductoTarjeta,
        CodigoSucursal,
        IdMensaje
      )
      if (response) {
        yield put({
          type: 'SET_STATE',
          payload: {
            tarjetas: response,
          },
        })
      }
    },

    *TU_VENCIMIENTO_CIERRE_MARGEN({ payload }, { put, call, select }) {
      const { CuentaSocio } = payload
      const CodigoSucursal = '0'
      const IdMensaje = 'PeriodoTarjeta'
      const response = yield call(
        oauth.TUVencimientoCierreMargen,
        CuentaSocio,
        CodigoSucursal,
        IdMensaje
      )
      if (response) {
        response.forEach((movimiento, i) => {
          movimiento.id = i + 1;
        });
        yield put({
          type: 'SET_STATE',
          payload: {
            resumenes: response,
          },
        })
      }
    },

    *SET_RESUMEN({ payload }, { put, call, select }) {
      const { nroCuenta, CuentaSocio ,descripcionMarca,entidadDescripcion} = payload
      yield put({
        type: 'SET_STATE',
        payload: {
          nroCuenta:nroCuenta,
          CuentaSocio:CuentaSocio,
          descripcionMarca:descripcionMarca,
          entidadDescripcion:entidadDescripcion,
          TarjetaResumen:{}
        },
      })
    },

    *CONSULTA_TARJETA_RESUMEN_CAB({ }, { put, call, select }) {
      const nroCuenta = yield select(state => state.card.nroCuenta)
      const CodigoSucursal = '0'
      const IdMensaje = 'ResumenCabecera'
      const response = yield call(
        oauth.HbConsultaTarjetaResumenCab,
        nroCuenta,
        CodigoSucursal,
        IdMensaje
      )
      if (response) {
        const cabecera =response
        const TarjetaResumen = yield select(state => state.card.TarjetaResumen)
        yield put({
          type: 'SET_STATE',
          payload: {
            TarjetaResumen:{...TarjetaResumen,cabecera}
          },
        })
      }
    },

    *CONSULTA_TARJETA_RESUMEN_DET({ payload}, { put, call, select }) {
      const { idFacturacion } = payload
      const {nroCuenta,CuentaSocio} = yield select(state => state.card)
      const CodigoSucursal = '0'
      const IdMensaje = 'ResumenDetalle'
      const response = yield call(
        oauth.HbConsultaTarjetaResumenDet,
        nroCuenta,
        idFacturacion,
        CuentaSocio,
        CodigoSucursal,
        IdMensaje
      )
      if (response) {
        const TarjetaResumen = yield select(state => state.card.TarjetaResumen)
        response.forEach((movimiento, i) => {
          movimiento.id = i + 1;
        });
        response.forEach((movimiento) => {
          if(movimiento.comprobante==null){
            movimiento.comprobante=0
          }
        });
        const detalle =response
        yield put({
          type: 'SET_STATE',
          payload: {
            TarjetaResumen:{...TarjetaResumen,detalle}
          },
        })
      }
    },
    *LIMPIAR_DATOS_TARJETAS(_, { put, call, select }) {
      yield put({
        type: 'SET_STATE',
        payload: {
          tarjetas:[]
        },
      })
      yield put({
        type: 'LIMPIAR_DATOS_RESUMENES',
      })
    },
    *LIMPIAR_DATOS_RESUMENES(_, { put, call, select }) {
      yield put({
        type: 'SET_STATE',
        payload: {
          resumenes:[],
          nroCuenta:'',
          CuentaSocio:'',
          descripcionMarca:'',
          entidadDescripcion:'',
          TarjetaResumen:{}
        },
      })
    }

  },
  subscriptions: {

  },
}
