import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { Input, Select, Form} from 'antd'
import FormClientDocumento from './item/documento'
import FormClientDenominacion from './item/denominacion'
import FormClientCuenta from './item/cuenta'
import FormClientEmail from './item/email'
import FormClientTelefono from './item/telefono'


const mapStateToProps = ({ client,card, dispatch }) => ({
  client,
  card,
  dispatch
})

const FormClient = ({ client,card,dispatch ,handle}) => {

    const {Option}=Select;
    const [placeholder,setPlaceholder]=useState('Número DNI')
    const [restric,setRestric]=useState(8)
    const [tipoDocumento,setTipoDocumento]=useState(1)
    const [tipo,setTipo]=useState("DOCUMENTO") //DOCUMENTO- NOMBRE - CUENTA

    useEffect(()=>{
        const recuperarTipoDocumento=()=>{
          dispatch({
            type: 'client/CONSULTA_TIPO_DOCUMENTO'
          })
        }
        recuperarTipoDocumento()
      },[])

    
    const handleChance = (value, event) =>{
      setPlaceholder('Número '+event.children)
      formCliente.setFieldsValue({
        nDocumento: undefined,
        Denominacion:"",
        Telefono: undefined
      })
      if(value==1){
        setRestric(8)
      }
      else{
        setRestric(11)
      }

      setTipoDocumento(value)

      if(value!="NOMBRE"&&value!="CUENTA"){
        setTipo("DOCUMENTO")
      }
      if(value=="NOMBRE"){
        setTipo("NOMBRE")
      }
      if(value=="CUENTA"){
        setTipo("CUENTA")
      }
      if(value=="EMAIL"){
        setTipo("EMAIL")
      }
      if(value=="TELEFONO"){
        setTipo("TELEFONO")
      }
      clear()
    }

    const clear=()=>{
      dispatch({
        type: 'client/SET_STATE',
        payload:{
          clientes:[],
          datosGenerales: {},
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
        }
      })
    }



    const [formCliente] = Form.useForm()

    return (
        <div>
          <div className="col-lg-12">
            <div className="mb-3">
                <h5 className="mb-4">
                    <strong>Buscar Cliente</strong>
                </h5>
                    <div className="row">
                        <div className="col-lg-2 col-md-12 mb-1 mt-1">
                            <Select  placeholder="Tipo Documento" onChange={handleChance} style={{ width: 200 }} defaultValue='DNI'>
                                {client.tiposDocumentos.map(item => (
                                <Option key={item.tipoDocumento} value={item.tipoDocumento}>{item.sintetico}</Option>
                                ))}
                            </Select>
                        </div>
                        <div className="col-lg-8 col-md-12" style={{ paddingLeft: 0 }}>
                            {tipo==="DOCUMENTO"? <FormClientDocumento formCliente={formCliente} tipoDocumento={tipoDocumento} restric={restric} placeholder={placeholder} handle={handle}/>:null}
                            {tipo==="NOMBRE"?<FormClientDenominacion formCliente={formCliente} handle={handle}/>:null}
                            {tipo==="CUENTA"?<FormClientCuenta formCliente={formCliente} handle={handle}/>:null }
                            {tipo==="EMAIL"?<FormClientEmail formCliente={formCliente} handle={handle}/>:null}
                            {tipo==="TELEFONO"?<FormClientTelefono formCliente={formCliente} handle={handle}/>:null}
                        </div>
                    </div>
            </div>
        </div>
      </div>
  )
}
export default connect(mapStateToProps)(FormClient)