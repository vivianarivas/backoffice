import { history } from 'umi'
import { notification } from 'antd'
import * as oauth from '@/services/oauth'

export default {
  namespace: 'user',
  state: {
    id: '',
    name: '',
    username: '',
    role: '',
    email: '',
    avatar: '',
    denominacionCliente: '',
    numeroDocumento: '',
    tipoDocumento: '',
    imagenFoto: '',
    imagenFirma: '',
    authorized: process.env.REACT_APP_AUTHENTICATED || false, // false is default value
    loading: false,
    /*tiposDocumentos:[],
    datosGenerales: {},
    cuentasfiltro: [],
    cuentasPlazoFijo:[],
    cuentaPlazoFijo:[],
    cuentasCredito:[],
    cuentaCredito:[],
    cuentaCreditoCuota:[],
    cuentaSeleccionada: {},
    CuentaUltimosMovimientos: [],
    Movimiento: {}*/
  },
  reducers: {
    SET_STATE: (state, { payload }) => ({ ...state, ...payload }),
  },
  effects: {
    *LOGIN({ payload }, { put, call, select }) {
      const { email, password } = payload
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: true,
        },
      })
      const success = yield call(oauth.login, email, password)
      if (success) {
        yield put({
          type: 'SET_STATE',
          payload: {
            username: email,
          },
        })
        yield put({
          type: 'LOAD_CURRENT_ACCOUNT',
        })
        yield history.push('/')
      }
      if (!success) {
        yield put({
          type: 'SET_STATE',
          payload: {
            loading: false,
          },
        })
        notification.error({
          message: 'Error Login',
          description: 'El usuario y contraseña que has introducido es incorrecta.',
        })
      }
    },
    *REGISTER({ payload }, { put, call, select }) {
      const { email, password, name } = payload
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: true,
        },
      })
      const { authProvider } = yield select(state => state.settings)
      const success = yield call(oauth.register, email, password, name)
      if (success) {
        yield put({
          type: 'LOAD_CURRENT_ACCOUNT',
        })
        yield history.push('/')
        notification.success({
          message: 'Succesful Registered',
          description: 'You have successfully registered!',
        })
      }
      if (!success) {
        yield put({
          type: 'SET_STATE',
          payload: {
            loading: false,
          },
        })
      }
    },
    *LOAD_CURRENT_ACCOUNT(_, { put, call, select }) {
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: true,
        },
      })
      // debugger
      const CodigoSucursal = '20'
      const IdMensaje = 'test'
      const { authProvider } = yield select(state => state.settings)
      const response = yield call(
        oauth.RecuperarBancaDigitalClientePerfil,
        CodigoSucursal,
        IdMensaje,
      )
      if (response) {
        response.authorized = true
        response.id = response.numeroDocumento
        response.avatar = response.imagenFoto
        const {
          id,
          email,
          name,
          avatar,
          role,
          denominacionCliente,
          numeroDocumento,
          tipoDocumento,
          imagenFirma,
          imagenFoto,
          authorized,
        } = response
        const nameTemp="User Back Office"
        yield put({
          type: 'SET_STATE',
          payload: {
            id,
            email,
            name:nameTemp,
            avatar,
            role,
            denominacionCliente,
            numeroDocumento,
            tipoDocumento,
            imagenFirma,
            imagenFoto,
            authorized,
          },
        })
        notification.success({
          message: 'Inicio de sesión exitoso',
          description: 'Bienvenido ' + nameTemp + '!',
        })
      }
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: false,
        },
      })
    },
    /**CONSULTA_TIPO_DOCUMENTO({  }, { put, call, select }) {
      const CodigoSucursal = '20'
      const IdMensaje = 'test'
      const response = yield call(
        oauth.ConsultaTipoDocumento,
        CodigoSucursal,
        IdMensaje
      )
      if (response) {
        yield put({
          type: 'SET_STATE',
          payload: {
            tiposDocumentos: response,
          },
        })
      }
    },
    *RECUPERAR_CLIENTES_DATOS_GENERALES({ payload }, { put, call, select }) {
      const { tipoDocumento, numeroDocumento } = payload
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: true,
        },
      })
      // debugger
      const CodigoSucursal = '20'
      const IdMensaje = 'test'
      const { authProvider } = yield select(state => state.settings)
      const response = yield call(
        oauth.RecuperarClienteDatosGenerales,
        tipoDocumento,
        numeroDocumento,
        CodigoSucursal,
        IdMensaje
      )
      if (response) {
        const temp={
          estado :"Cliente Activo(CCL)",
          agente:"Cliente Normal",
          oficial:"AA LOPEZ, BIBIANA",
          grupoAfinidad:"PERFIL GENÉRICO BANCA PERSONAL",
          situacion:"SITUACÍON 1",
          bloqueo:"SIN BLOQUEO" 
        }
        const datos = yield select(state => state.user.datosGenerales)
        const datosTemp={...response,...temp}
        const datosG ={...datos,...datosTemp}
        yield put({
          type: 'SET_STATE',
          payload: {
            datosGenerales:datosG
          },
        })
        yield put({
          type: 'RECUPERAR_HB_CONSULTA_CUENTA',
            payload: {
              tipoDocumento,
              numeroDocumento 
          },
        })
      }
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: false,
        },
      })
    },
    *RECUPERAR_CLIENTES_DATOS_GENERALES_BO({ payload }, { put, call, select }) {
      const { tipoDocumento, numeroDocumento } = payload
      const CodigoSucursal = '20'
      const IdMensaje = 'test'
      // debugger
      const response = yield call(
        oauth.RecuperarClienteDatosGeneralesBO,
        tipoDocumento,
        numeroDocumento,
        CodigoSucursal,
        IdMensaje,
      )
      if (response) {
        const datos = yield select(state => state.user.datosGenerales)
        const datosG ={...datos,...response}
        yield put({
          type: 'SET_STATE',
          payload: {
            datosGenerales:datosG
          },
        })

        yield put({
          type: 'RECUPERAR_CLIENTES_DATOS_GENERALES',
            payload: {
              tipoDocumento,
              numeroDocumento
          },
        })
      }
      return response
    },
  
    *RECUPERAR_HB_CONSULTA_CUENTA({ payload }, { put, call, select }) {
      const { tipoDocumento, numeroDocumento } = payload
      const concepto='TODO'
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: true,
        },
      })
      yield put({
        type: 'SET_STATE',
        payload: {
          cuentasPlazoFijo:[],
          cuentaPlazoFijo:[],
          cuentasCredito:[],
          cuentaCredito:[],
          cuentaCreditoCuota:[],
        },
      })
      const codigoSucursal = '20'
      const codigoProceso = 'null'
      const idMensaje = 'test'
      // debugger
      const response = yield call(
        oauth.RecuperarHbConsultaCuenta,
        tipoDocumento,
        numeroDocumento,
        codigoProceso,
        concepto,
        codigoSucursal,
        idMensaje,
      )
      if (response) {
        const filter=response.filter(item=>item.sintetico=="ca"||item.sintetico=="cc")
        const filterPF=response.filter(item=>item.sintetico=="pf")
        const filterCR=response.filter(item=>item.sintetico=="cr")
        yield put({
          type: 'SET_STATE',
          payload: {
            cuentasfiltro: filter,
            cuentasPlazoFijo:filterPF,
            cuentasCredito:filterCR,
          },
        })
      }
      yield put({
        type: 'SET_STATE',
        payload: {
          loading: false,
        },
      })
      return response
    },
    *CUENTA_ACTUAL({ payload }, { put, call, select }) {
      yield put({
        type: 'SET_STATE',
        payload: {
          cuentaSeleccionada:payload
        },
      })
    },
    *LIMPIAR_DATOS_GENERALES(_, { put, call, select }) {
      yield put({
        type: 'SET_STATE',
        payload: {
          datosGenerales: {},
          ultimosmovimientos: [],
          cuentasfiltro: [],
          cuentasPlazoFijo:[],
          cuentasCredito:[],
          cuentaSeleccionada: {},
          CuentaUltimosMovimientos: [],
          Movimiento: {}
        },
      })
    },
    *CUENTA_ULTIMOS_MOVIMIENTOS({ payload }, { put, call, select }) {
      const { tipoDocumento, numeroDocumento,codigoCuenta ,codigoSistema,codigoMoneda} = payload
      const fechaFin = '2020-06-19'
      const codigoSucursal = '20'
      const idMensaje = 'test'
      // debugger
      const response = yield call(
        oauth.CuentaUltimosMovimientos,
        tipoDocumento,
        numeroDocumento,
        codigoSistema,
        codigoMoneda,
        codigoCuenta, 
        fechaFin,
        codigoSucursal,
        idMensaje,
      )
      //debugger
      if (response) {
        yield put({
          type: 'SET_STATE',
          payload: {
            CuentaUltimosMovimientos: response.output
          },
        })
      }
      
    },

    *CUENTA_ULTIMOS_MOVIMIENTOS_ENTRE_FECHAS({ payload }, { put, call, select }) {
      const { tipoDocumento, numeroDocumento,codigoCuenta,fechaInicio,fechaFin } = payload
      const codigoSistema = '3'
      const codigoMoneda = '0'
      const codigoSucursal = '20'
      const idMensaje = 'test'
      // debugger
      const response = yield call(
        oauth.CuentaUltimosMovimientosEntreFechas,
        tipoDocumento,
        numeroDocumento,
        codigoSistema,
        codigoMoneda,
        codigoCuenta, 
        codigoSucursal,
        fechaInicio,
        fechaFin,
        idMensaje,
      )
      //debugger
      if (response) {
        yield put({
          type: 'SET_STATE',
          payload: {
            CuentaUltimosMovimientos: response
          }
        })
      }
    },

    *RECUPERAR_PLAZO_FIJO({ payload }, { put, call, select }) {
      const { tipoDocumento, numeroDocumento,codigoCuenta } = payload
      const codigoSistema = '4'
      const CodigoSubSistema='0'
      const codigoMoneda = '0'
      const codigoSucursal = '20'
      const FechaAjuste='null'
      const idMensaje = 'test'
      // debugger
      const response = yield call(
        oauth.ConsultaPlazoFijo,
        tipoDocumento,
        numeroDocumento,
        codigoSistema,
        CodigoSubSistema,
        FechaAjuste,
        codigoMoneda,
        codigoCuenta, 
        codigoSucursal,
        idMensaje,
      )
      //debugger
      if (response) {
        yield put({
          type: 'SET_STATE',
          payload: {
            cuentaPlazoFijo: response
          }
        })
      }
    },

    *RECUPERAR_INFORME_DEUDA({ payload }, { put, call, select }) {
      const { tipoDocumento, numeroDocumento,codigoCuenta } = payload
      const codigoSistema = '2'
      const CodigoSubSistema='0'
      const codigoMoneda = '0'
      const codigoSucursal = '20'
      const FechaAjuste='null'
      const idMensaje = 'test'
      // debugger

      const response = yield call(
        oauth.InformeDeuda,
        tipoDocumento,
        numeroDocumento,
        codigoSistema,
        CodigoSubSistema,
        FechaAjuste,
        codigoMoneda,
        codigoCuenta, 
        codigoSucursal,
        idMensaje,
      )
      //debugger
      if (response) {
        yield put({
          type: 'SET_STATE',
          payload: {
            cuentaCredito: response,
          }
        })
      }
    },
    *CONSULTA_CUAOTAS_CREDITO({ payload }, { put, call, select }) {
      const { tipoDocumento, numeroDocumento,codigoCuenta ,numeroOperacion} = payload
      const codigoSistema = '2'
      const CodigoSubSistema='0'
      const codigoMoneda = '0'
      const codigoSucursal = '20'
      const FechaAjuste='null'
      const idMensaje = 'test'

      const response = yield call(
        oauth.ConsultaCuotasCredito,
        tipoDocumento,
        numeroDocumento,
        codigoSistema,
        CodigoSubSistema,
        FechaAjuste,
        codigoMoneda,
        codigoCuenta,
        numeroOperacion, 
        codigoSucursal,
        idMensaje,
      )
      //debugger
      if (response) {
        yield put({
          type: 'SET_STATE',
          payload: {
            cuentaCreditoCuota: response
          }
        })
      }
    },*/
    *LOGOUT(_, { put, call, select }) {
      const { authProvider } = yield select(state => state.settings)
      yield call(oauth.logout)
      yield put({
        type: 'SET_STATE',
        payload: {
          id: '',
          name: '',
          role: '',
          email: '',
          avatar: '',
          denominacionCliente: '',
          numeroDocumento: '',
          tipoDocumento: '',
          imagenFoto: '',
          imagenFirma: '',
          authorized: false,
          loading: false,
          /*tiposDocumentos:[],
          datosGenerales: {},
          ultimosmovimientos: [],
          cuentasfiltro: [],
          cuentasPlazoFijo:[],
          cuentaPlazoFijo:[],
          cuentasCredito:[],
          cuentaCredito:[],
          cuentaCreditoCuota:[],
          cuentaSeleccionada: {},
          CuentaUltimosMovimientos: [],
          Movimiento: {}*/
        },
      })
    },
  },
  subscriptions: {
    // setup: ({ dispatch }) => {
    //   dispatch({
    //     type: 'LOAD_CURRENT_ACCOUNT',
    //   })
    // },
  },
}
