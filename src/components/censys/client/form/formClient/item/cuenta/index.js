import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { Input, Select, Form} from 'antd'

const mapStateToProps = ({ client,card, dispatch }) => ({
    client,
    card,
    dispatch
  })

const FormClientCuenta= ({formCliente,handle}) => {

    const handleClient = () => {

      const cuenta=formCliente.getFieldValue('Cuenta')
      
      let params = {
        conceptoBusca:"CUENTA",
        tipoDocumento:"1",
        numeroDocumento:"1",
        denominacion:"null",
        cuenta
      }

      handle(params)
    }


    return (
        <Form layout="inline" form={formCliente} onFinish={handleClient} >
            <div className="col-lg-3 col-md-12">
                <Form.Item id="Cuenta" name="Cuenta" className="mb-1 mt-1"
                rules={[
                    { required: true,
                    message: "Por favor ingresar Cuenta"
                    }
                    ]}>
                <Input  type = "number" autoFocus  placeholder="N° Cuenta" autoComplete='off' style={{ width: 200 }}/>
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
export default connect(mapStateToProps)(FormClientCuenta)