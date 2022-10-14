import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { Input, Select, Form} from 'antd'

const mapStateToProps = ({ client,card, dispatch }) => ({
  client,
  card,
  dispatch
})

const FormClient = ({ client,card,dispatch ,handle}) => {

    const {Option}=Select;
    const [placeholder,setPlaceholder]=useState('Número DNI')
    const [restric,setRestric]=useState(8)

    
    const handleChance = (value, event) =>{
      setPlaceholder('Número '+event.children)
      formCliente.setFieldsValue({
        nDocumento: undefined
      })
      if(value==1){
        setRestric(8)
      }
      else{
        setRestric(11)
      }
    }

    useEffect(()=>{
      const recuperarTipoDocumento=()=>{
        dispatch({
          type: 'client/CONSULTA_TIPO_DOCUMENTO'
        })
      }
      recuperarTipoDocumento()
    },[])

    const [formCliente] = Form.useForm()

    const handleClient = () => {
      const tipoDocumento=formCliente.getFieldValue('tDocumento')
      const numeroDocumento=formCliente.getFieldValue('nDocumento')
      
      let params = {
        tipoDocumento,
        numeroDocumento
      }

      handle(params)
    }

    const maxLengthCheck = (object) => {
      if (object.target.value.length > object.target.maxLength) {
       object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    return (
        <div>
          <div className="col-lg-12">
          <div className="mb-3">
            <h5 className="mb-4">
                <strong>Buscar Cliente</strong>
            </h5>
            <Form layout="inline" form={formCliente} onFinish={handleClient} initialValues={{ tDocumento: 1}}>
                <div className="col-lg-3 col-md-12">
                    <Form.Item id="tDocumento" name="tDocumento" className="mb-1 mt-1" rules={[{required: true ,message: 'Por favor ingresar Tipo de Documento'}]}>
                        <Select  placeholder="Tipo Documento" onChange={handleChance}>
                            {client.tiposDocumentos.map(item => (
                            <Option key={item.tipoDocumento} value={item.tipoDocumento}>{item.sintetico}</Option>
                            ))}
                        </Select>
                    </Form.Item>
                </div>
                <div className="col-lg-3 col-md-12">
                  <Form.Item id="nDocumento" name="nDocumento" className="mb-1 mt-1"
                    rules={[
                      { required: true,
                        message: `Por favor ingresar ${placeholder}`
                      },         
                      { min:restric,
                        message: `Por favor ingresar un minimo ${restric} de digitos` 
                      }
                      ]}>
                    <Input  type = "number" maxLength = {restric} minLength={restric} autoFocus onInput={maxLengthCheck} placeholder={placeholder} autoComplete='off' />
                  </Form.Item>
                </div>
                <div className="col-lg-3 col-md-12">
                    <button type="submit" className="btn btn-success mt-1 mb-1">
                        Buscar
                    </button>
                </div>
            </Form>
            </div>
        </div>
      </div>
  )
}
export default connect(mapStateToProps)(FormClient)