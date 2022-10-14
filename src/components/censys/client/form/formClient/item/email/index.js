import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import { Input, Select, Form} from 'antd'

const mapStateToProps = ({ client,card, dispatch }) => ({
    client,
    card,
    dispatch
  })

const FormClientEmail= ({formCliente,handle}) => {


    const handleClient = () => {

      const Email=formCliente.getFieldValue('Email')
      
      let params = {
        Email,
        tipo:"Email"
      }

      handle(params)
      formCliente.setFieldsValue({'Email':null})
    }


    return (
        <Form layout="inline" form={formCliente} onFinish={handleClient} initialValues={{ Email: null}}>
            <div className="col-lg-3 col-md-12">
                <Form.Item id="Email" name="Email" className="mb-1 mt-1"
                rules={[
                    { required: true,
                    message: `Por favor ingresar Email`
                    }
                    ]}>
                <Input   autoFocus  placeholder="Email" autoComplete='off' />
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
export default connect(mapStateToProps)(FormClientEmail)