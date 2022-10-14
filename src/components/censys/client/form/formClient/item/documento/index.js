import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { Input, Select, Form} from 'antd'

const mapStateToProps = ({ client,card, dispatch }) => ({
    client,
    card,
    dispatch
  })

const FormClientDocumento= ({formCliente,tipoDocumento,restric,placeholder,handle}) => {

    const handleClient = () => {

      const numeroDocumento=formCliente.getFieldValue('nDocumento')
      
      let params = {
        conceptoBusca:"DOCUMENTO",
        tipoDocumento,
        numeroDocumento,
        denominacion:"null",
        cuenta:"null"
      }

      handle(params)
    }

    const maxLengthCheck = (object) => {
      if (object.target.value.length > object.target.maxLength) {
       object.target.value = object.target.value.slice(0, object.target.maxLength)
        }
    }

    return (
        <Form layout="inline" form={formCliente} onFinish={handleClient} >
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
                <Input  type = "number" maxLength = {restric} minLength={restric} autoFocus onInput={maxLengthCheck} placeholder={placeholder} autoComplete='off' style={{ width: 200 }}/>
                </Form.Item>
            </div>
            <div className="col-lg-3 col-md-12">
                <button type="submit" className="btn btn-success mt-1 mb-1">
                    Buscar
                </button>
            </div>
        </Form>
  )
}
export default connect(mapStateToProps)(FormClientDocumento)