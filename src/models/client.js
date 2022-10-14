import { history } from 'umi'
import { notification } from 'antd'
import * as endpoint from '@/services/censys/client'
import * as sendgrid from '@/services/sendgrid'

export default {
  namespace: 'client',
  state: {
    loading: false,
    tiposDocumentos:[],
    clientes:[],
    datosGenerales: {},
    datosHB: {},
    datosOtros: {},
    cuentasfiltro: [],
    cuentasPlazoFijo:[],
    cuentaPlazoFijo:[],
    cuentasCredito:[],
    cuentaCredito:[],
    cuentaCreditoCuota:[],
    cuentaSeleccionada: {},
    CuentaUltimosMovimientos: [],
    Movimiento: {}
  },
  reducers: {
    SET_STATE: (state, { payload }) => ({ ...state, ...payload }),
  },
  effects: {
    *CONSULTA_TIPO_DOCUMENTO({  }, { put, call, select }) {
        const CodigoSucursal = '20'
        const IdMensaje = 'test'
        const response = yield call(
          endpoint.ConsultaTipoDocumento,
          CodigoSucursal,
          IdMensaje
        )
        if (response) {
          //const filter=response.filter(tipo=>tipo.tipoDocumento==1||tipo.tipoDocumento==5||tipo.tipoDocumento==6)
          const aux=[{tipoDocumento:"NOMBRE",sintetico:"APELLIDO Y NOMBRE"},{tipoDocumento:"CUENTA",sintetico:"CUENTA"},{tipoDocumento:"EMAIL",sintetico:"EMAIL"},{tipoDocumento:"TELEFONO",sintetico:"TELEFONO"},...response]
          yield put({
            type: 'SET_STATE',
            payload: {
              tiposDocumentos: aux,
            },
          })
        }
      },
      *CONSULTA_BUSCAR_CLIENTE({ payload }, { put, call, select }) {
        const {conceptoBusca, tipoDocumento, numeroDocumento ,denominacion,cuenta} = payload
        const ConceptoBusca=conceptoBusca
        const Origen="L"
        const FormatoSalida="PANEL"
        const Evalua="SI"
        const ConceptoEval='null'
        const TipoDocumento=tipoDocumento
        const NumeroDocumento=numeroDocumento
        const TipoBusca="APROXIMADO"
        const Denominacion=denominacion
        const LlamadoDesde='IBS'
        const CantidadFilas='null'
        const CodigoCuenta=cuenta
        const CodigoVinculo='null'
        const CodigoPaisOrigen='null'
        const CodigoBancoOrigen='null'
        const CodigoSucursalOrigen='null'
        const TipoDocumentoPrinc='null'
        const NumeroDocumentoPrinc='null'
        const ConsideraPrioridad='null'
        const TipoDocAlfa='null'
        const NumeroDocAlfa='null'
        const CodigoSistema= '0'
        const CodigoSucursal = '20'
        const IdMensaje = 'test'
        // debugger
        const response = yield call(
          endpoint.BOConsultaBuscaCliente,
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
        )
        if (response) {
          response.forEach((movimiento, i) => {
            movimiento.id = i + 1;
          });
          yield put({
            type: 'SET_STATE',
            payload: {
              clientes:response
            },
          })
        }
        return response
      },
      *CONSULTA_BUSCAR_CLIENTE_EMAIL({ payload }, { put, call, select }) {
        const {Email} = payload
        const CodigoSucursal = '20'
        const IdMensaje = 'test'
        // debugger
        const response = yield call(
          endpoint.BOConsultaBuscaClienteMail,
          Email,
          CodigoSucursal,
          IdMensaje
        )
        if (response) {
          response.forEach((output, i) => {
            output.id = i + 1;
          });
          yield put({
            type: 'SET_STATE',
            payload: {
              clientes:response
            },
          })
        }
        return response
      },
      *CONSULTA_BUSCAR_CLIENTE_TELEFONO({ payload }, { put, call, select }) {
        const {Telefono} = payload
        const CodigoSucursal = '20'
        const IdMensaje = 'test'
        // debugger
        const response = yield call(
          endpoint.BOConsultaBuscaClienteTelefono,
          Telefono,
          CodigoSucursal,
          IdMensaje
        )
        if (response) {
          response.forEach((output, i) => {
            output.id = i + 1;
          });
          yield put({
            type: 'SET_STATE',
            payload: {
              clientes:response
            },
          })
        }
        return response
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
          endpoint.RecuperarClienteDatosGenerales,
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
          const datos = yield select(state => state.client.datosGenerales)
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
          endpoint.RecuperarClienteDatosGeneralesBO,
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
          yield put({
            type: 'CONSULTA_USUARIO_HB_BO',
              payload: {
                tipoDocumento,
                numeroDocumento
            },
          })
          yield put({
            type: 'RECUPERAR_AGENTE_OFICIAL_SITUACION',
              payload: {
                tipoDocumento,
                numeroDocumento
            },
          })
        }
        return response
      },

      *CONSULTA_USUARIO_HB_BO({ payload }, { put, call, select }) {
        const { tipoDocumento, numeroDocumento } = payload
        const CodigoSucursal = '20'
        const IdMensaje = 'test'
        // debugger
        const response = yield call(
          endpoint.BOConsultaUsuarioHB,
          tipoDocumento,
          numeroDocumento,
          CodigoSucursal,
          IdMensaje,
        )
        if (response) {
          yield put({
            type: 'SET_STATE',
            payload: {
              datosHB:response
            },
          })
        }
        return response
      },

      *RECUPERAR_AGENTE_OFICIAL_SITUACION({ payload }, { put, call, select }) {
        const { tipoDocumento, numeroDocumento } = payload
        const CodigoSucursal = '20'
        const IdMensaje = 'test'
        // debugger
        const response = yield call(
          endpoint.RecuperaAgenteOficalySituacion,
          tipoDocumento,
          numeroDocumento,
          CodigoSucursal,
          IdMensaje,
        )
        if (response) {
          yield put({
            type: 'SET_STATE',
            payload: {
              datosOtros:response
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
        const codigoProceso = '18'
        const idMensaje = 'test'
        // debugger
        const response = yield call(
          endpoint.RecuperarHbConsultaCuenta,
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
            Movimiento: {},
            datosHB:{},
            datosHB: {},
          },
        })
      },
      *MAIL_SEND({ payload }, { put, call, select }) {
        const {email, denominacionCliente}=payload
        let codigomail = Math.floor(100000 + Math.random() * 900000)
        yield put({
          type: 'SET_STATE',
          payload: {
            codigomail: codigomail,
          },
        })
        let subject = 'Test'
        let body =
          '<p>Hola desde Testing!</p>' +
          '<p>La contraseña de su Cuenta fue actualizada.</p>' +
          '<p>Si usted no realiz&oacute; este cambio, por favor visite nuestro Centro de ayuda para m&aacute;s informaci&oacute;n.</p>' +
          '<br/>' +
          '<p>' +
          'Atentamente.<br/>' +
          'El equipo de BMRos.' +
          '</p>'
        let recipients = [
          {
            email: email,
            name: denominacionCliente,
          },
        ]
        const successemail = yield call(sendgrid.mailsend, recipients, subject, body)
        if (successemail) {
          notification.success({
            message: 'Enviamos el código a tu casilla de Email!',
          })
        } else {
          notification.error({
            message: 'Error al enviar el código por Email',
          })
        }
        },
      *CUENTA_ULTIMOS_MOVIMIENTOS({ payload }, { put, call, select }) {
        const { tipoDocumento, numeroDocumento,codigoCuenta ,codigoSistema,codigoMoneda} = payload
        const fechaFin = '2020-06-19'
        const codigoSucursal = '20'
        const idMensaje = 'test'
        // debugger
        const response = yield call(
          endpoint.CuentaUltimosMovimientos,
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
          response.forEach((movimiento, i) => {
            movimiento.id = i + 1;
          });
          yield put({
            type: 'SET_STATE',
            payload: {
              CuentaUltimosMovimientos: response
            },
          })
        }
        
      },
  
      *CUENTA_ULTIMOS_MOVIMIENTOS_ENTRE_FECHAS({ payload }, { put, call, select }) {
        const { tipoDocumento, numeroDocumento,codigoCuenta,fechaInicio,fechaFin,codigoSistema,codigoMoneda } = payload
        const codigoSucursal = '20'
        const idMensaje = 'test'
        // debugger
        const response = yield call(
          endpoint.CuentaUltimosMovimientosEntreFechas,
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
          response.forEach((movimiento, i) => {
            movimiento.id = i + 1;
          });
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
          endpoint.ConsultaPlazoFijo,
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
          endpoint.InformeDeuda,
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
          endpoint.ConsultaCuotasCredito,
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
      },
      *BLANQUEO_CLAVE({ payload }, { put, call, select }) {
        const { tipoDocumento, numeroDocumento } = payload
        const CodigoSucursal = '20'
        const IdMensaje = 'test'
        // debugger
        const response = yield call(
          endpoint.BlanqueoClaveHB,
          tipoDocumento,
          numeroDocumento,
          CodigoSucursal,
          IdMensaje,
        )
        return response
      },
      *LOGOUT(_, { put, call, select }) {
        const { authProvider } = yield select(state => state.settings)
        yield call(endpoint.logout)
        yield put({
          type: 'SET_STATE',
          payload: {
            loading: false,
            tiposDocumentos:[],
            datosGenerales: {},
            datosHB:{},
            datosHB: {},
            cuentasfiltro: [],
            cuentasPlazoFijo:[],
            cuentaPlazoFijo:[],
            cuentasCredito:[],
            cuentaCredito:[],
            cuentaCreditoCuota:[],
            cuentaSeleccionada: {},
            CuentaUltimosMovimientos: [],
            Movimiento: {}
          },
        })
      },

  },
  subscriptions: {

  },
}
