import React, { useState,useEffect } from 'react'
import { connect } from 'react-redux'
import { Input,Select,Form,DatePicker } from 'antd'
import moment from 'moment'


const { TextArea } = Input;
const { Option } = Select

const mapStateToProps = ({ client,notification, dispatch }) => ({
    client,
    notification,
    dispatch
  })
  

const FormNotification = ({ client,notification, dispatch,setIsModalVisible }) => {
  
const [particular,setParticular]=useState(false)

const [notificacion,setNotificacion]=useState({MensajeDestacado:'', TipoMenCod:null, Concepto:null,TipoDocumento:null,NumeroDocumento:'',DescripcionMensaje:'',FechaVencimientoMensaje:'',Url:''})
const [formNotification] = Form.useForm()

const handleChangeD= (value) => {
  if(value=="PARTICULAR"){
    setParticular(true)
  }
  else{
    setParticular(false)
  }
}  

const [placeholder,setPlaceholder]=useState('Número')
    
const handleChange = (value, event) =>{
  setPlaceholder('Número '+event.children)
}

useEffect(()=>{
  const recuperarTipos=()=>{
    dispatch({
      type: 'client/CONSULTA_TIPO_DOCUMENTO'
    })
    dispatch({
      type: 'notification/CONSULTA_TIPO_NOTIFICACION'
    })
  }
  recuperarTipos()
},[])

  const {tiposNotificacion}=notification

  const handleNotification = () => {
    const { TipoDocumento,NumeroDocumento,DescripcionMensaje,FechaVencimientoMensaje,MensajeDestacado,TipoMenCod,Concepto ,Url}=formNotification.getFieldsValue()
    const FechaVencimiento=FechaVencimientoMensaje.format('YYYY/MM/DD')
    const params={TipoDocumento:parseInt(TipoDocumento),NumeroDocumento:parseInt(NumeroDocumento),DescripcionMensaje,FechaVencimientoMensaje,MensajeDestacado,TipoMenCod:parseInt(TipoMenCod),Concepto,Url}
    console.log(params)
    
    dispatch({
      type: 'notification/REGISTRA_NOTIFICACION',
      payload: params,
    })


    setIsModalVisible(false)
    formNotification.setFieldsValue(notificacion)
    setParticular(false)
  }

  const validateMessages = {
    required: '${label} es Requerido!'
  };

  const dateFormatShow = 'DD/MM/YYYY'

  const disabledSubmissionDate = (current) => {
    return ( current  && (current < moment().endOf('day')));
  }  
  const maxLengthCheck = (object) => {
    if (object.target.value.length > object.target.maxLength) {
     object.target.value = object.target.value.slice(0, object.target.maxLength)
      }
  }
  
return (
    <div className="col-lg-12">
        <Form layout="vertical" form={formNotification} onFinish={handleNotification} validateMessages={validateMessages} hideRequiredMark>
            <div className="col-12">
              <Form.Item name="MensajeDestacado" label="Titulo" className="mb-1 mt-1" rules={[{ required: true }]}>
                <Input/>
              </Form.Item>
            </div>
            <div className="col-12">
              <Form.Item name="TipoMenCod" label="Tipo" className="mb-1 mt-1" rules={[{ required: true }]}>
                <Select  >
                        {tiposNotificacion.map(item => (
                        <Option key={item.tipoMenCod} value={item.tipoMenCod}>{item.tipoMenDesc}</Option>
                        ))}
                </Select>
              </Form.Item>
            </div>
            <div className="col-12">
              <Form.Item name="Concepto" label="Destinatario" className="mb-1 mt-1" rules={[{ required: true }]}>
                <Select  onChange={handleChangeD} >
                  <Option value="TODOS">Todos</Option>
                  <Option value="PARTICULAR">Particular</Option>
                </Select>
              </Form.Item>
            </div>
            {particular?
            <div className="row col-12">
            <div className="col-6">
                <Form.Item name="TipoDocumento" label="Tipo De Documento" rules={[{ required: true }]}>
                    <Select onChange={handleChange}>
                        {client.tiposDocumentos.map(item => (
                        <Option key={item.tipoDocumento} value={item.tipoDocumento}>{item.sintetico}</Option>
                        ))}
                    </Select>
                </Form.Item>
            </div>
            <div className="col-6">
            <Form.Item  name="NumeroDocumento" label="N° De Documento" className="mb-1 mt-1"
                    rules={[
                      { required: true,
                        message: `Por favor ingresar ${placeholder}`
                      }
                      ]}>
                    <Input  type = "number" maxLength = "11"  autoFocus onInput={maxLengthCheck} placeholder={placeholder} autoComplete='off'/>
            </Form.Item>
            </div>    
            </div>
            :null}
            
            <div className="col-12">
            <Form.Item name="DescripcionMensaje" label="Mensaje" className="mb-1 mt-1" rules={[{ required: true }]}>
              <TextArea rows={4}  />
            </Form.Item>
              </div>
              <div className="col-12">
              <Form.Item name="FechaVencimientoMensaje" label="Fecha Vencimiento" className="mb-1 mt-1" rules={[{ required: true }]}>
                      <DatePicker 
                          disabledDate={disabledSubmissionDate}
                          format={dateFormatShow}
                      />
              </Form.Item>  
              </div>
              <div className="col-12">
              <Form.Item name="Url" label="Url" className="mb-1 mt-1" rules={[{ required: true }]}>
                <Input/>
              </Form.Item>  
              </div>
              <div className="col-lg-3 col-md-12">
                    <button type="submit" className="btn btn-success mt-1 mb-1">
                        Agregar
                    </button>
                </div>
        </Form>
      </div>

  )
}

export default connect(mapStateToProps)(FormNotification)