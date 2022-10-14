import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { Input, Select, Form} from 'antd'

const mapStateToProps = ({ client,card, dispatch }) => ({
    client,
    card,
    dispatch
  })

const FormClientDenominacion= ({formCliente,handle}) => {


    const handleClient = () => {

      const denominacion=formCliente.getFieldValue('Denominacion')
      
      let params = {
        conceptoBusca:"NOMBRE",
        tipoDocumento:"1",
        numeroDocumento:"1",
        denominacion,
        cuenta:"null"
      }

      handle(params)
      formCliente.setFieldsValue({'Denominacion':null})
    }


    return (
        <Form layout="inline" form={formCliente} onFinish={handleClient} initialValues={{ Denominacion: null}}>
            <div className="col-lg-3 col-md-12">
                <Form.Item id="Denominacion" name="Denominacion" className="mb-1 mt-1"
                rules={[
                    { required: true,
                    message: `Por favor ingresar Nombre`
                    }
                    ]}>
                <Input   autoFocus  placeholder="Nombre" autoComplete='off' />
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
export default connect(mapStateToProps)(FormClientDenominacion)