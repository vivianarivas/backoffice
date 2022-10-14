import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { Input, Select, Form} from 'antd'

const mapStateToProps = ({ client,card, dispatch }) => ({
    client,
    card,
    dispatch
  })

const FormClientTelefono= ({formCliente,handle}) => {

    const handleClient = () => {

      const Telefono=formCliente.getFieldValue('Telefono')
      
      let params = {
        Telefono,
        tipo:"Telefono"
      }

      handle(params)
    }

    return (
        <Form layout="inline" form={formCliente} onFinish={handleClient} >
            <div className="col-lg-3 col-md-12">
                <Form.Item id="Telefono" name="Telefono" className="mb-1 mt-1"
                rules={[
                    { required: true,
                    message: "Por favor ingresar Teléfono"
                    },         
                    ]}>
                <Input  type = "number"  autoFocus  placeholder="Teléfono" autoComplete='off' style={{ width: 200 }}/>
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
export default connect(mapStateToProps)(FormClientTelefono)