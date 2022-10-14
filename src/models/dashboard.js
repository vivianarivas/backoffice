import * as endpoint from '@/services/censys/dashboard'
import { notification } from 'antd'


export default {
  namespace: 'dashboard',
  state: {
    apiSMS:{},
    apiSMSSALDO:"",
    cargasRealizada:[]
  },
  reducers: {
    SET_STATE: (state, { payload }) => ({ ...state, ...payload }),
  },
  effects: {
    *ACCESS_TOKEN({ payload }, { put, call, select }) {
      const params={
        _operation:"access_token",
        grant_type:"client_credentials",
        client_credentials:"censys",
        client_secret:"c25867ddaed4801f6840d81a9b078af47dfeeaa1c18e12cb300022faa7ef5f28"
      }

      const success = yield call(endpoint.access_token, params)
      if (success) {
        yield put({
          type: 'LOGIN',
        })
      }
      if (!success) {
        notification.error({
          message: 'Error Pagadetodo.com',
          description: 'Se produjo un error en la api Pagadetodo',
        })
      }
    },
    *LOGIN({  }, { put, call, select }) {
      const response = yield call(
        endpoint.login
      )
      if (response) {
        yield put({
          type: 'GET_SALDO_CLIENTE',
        })
      }
    },

    *GET_SALDO_CLIENTE({  }, { put, call, select }) {
      const response = yield call(
        endpoint.getSaldoCliente
      )
      if (response) {
        yield put({
          type: 'SET_STATE',
          payload: {
            apiSMSSALDO:response,
          },
        })
        yield put({
          type: 'GET_CARGAS_REALIZADAS',
        })
      }
    },


    *GET_CARGAS_REALIZADAS({  }, { put, call, select }) {
      const response = yield call(
        endpoint.getCargasRealizadas
      )
      if (response) {
        yield put({
          type: 'SET_STATE',
          payload: {
            cargasRealizada:response,
          },
        })
      }
    },


    *CONSULTA_API_PAGA_DE_TODO({  }, { put, call, select }) {
      const response = yield call(
        endpoint.ConsultaApiPagaDeTodo
      )
      if (response) {
        yield put({
          type: 'SET_STATE',
          payload: {
            apiSMS: response,
          },
        })
      }
    }
    ,
    *LOGOUT(_, { put, call, select }) {
      const { authProvider } = yield select(state => state.settings)
      yield call(endpoint.logout)
      yield put({
        type: 'SET_STATE',
        payload: {
          apiSMS:{},
          apiSMSSALDO:{},
        },
      })
    }
  },
  subscriptions: {

  },
}
