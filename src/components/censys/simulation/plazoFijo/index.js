import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  DollarOutlined,
  RiseOutlined,
  CheckCircleOutlined,
  LoadingOutlined,
} from '@ant-design/icons'
import {
  notification,
  Select,
  Button,
  Form,
  InputNumber,
  Steps,
  Spin,
} from 'antd'
import { history } from 'umi'
import { format } from 'date-fns'
import { numberFormat, numberFormatSM } from '@/services/numberformat'
import style from './style.module.scss'

const mapStateToProps = ({ user, plazofijo, dispatch }) => ({
  dispatch,
  user,
  plazofijo,
})

const { Step } = Steps
const { Option } = Select
const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />

const SolicitudPlazoFijo = ({ dispatch, user, plazofijo }) => {
  useEffect(() => {
    dispatch({
      type: 'plazofijo/SET_STATE',
      payload: {
        tasanominal: 0,
        simulacion: [],
        confirmacion: [],
      },
    })

  }, [])

  const [formSimulacionPlazoFijo] = Form.useForm()
  const [fields, setFields] = useState([
    // { name: ['importe'], value: 1000 },
    // { name: ['tna'], value: 75 },
    // { name: ['capital'], value: '' },
  ])
  const myRef = useRef(null)

  const plazos = [30, 60, 90, 120]

  const formItemLayout = {
    labelCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
    wrapperCol: {
      xs: { span: 24 },
      sm: { span: 24 },
    },
  }

  const handleOnChange = value => {
    let fields = formSimulacionPlazoFijo.getFieldsValue()
    let capital = formSimulacionPlazoFijo.getFieldValue('capital')
    console.log(fields.capital)
    if (!/^[0-9.]*$/.test(fields.capital)) {
      return
    }

    // formSimulacionPlazoFijo.setFieldsValue({
    //   capital: value,
    //   slidecapital: value,
    // })

    // debugger
    if (
      fields.capital != undefined &&
      fields.capital != '' &&
      fields.capital >= 500 &&
      fields.capital <= 10000000 &&
      fields.plazo != undefined &&
      fields.plazo != ''
    ) {
      let params = {
        CodigoSucursal: 20,
        CodigoMoneda: '',
        CodigoProducto: '',
        CodigoRutinaLiquidacion: '',
        ImportePactado: fields.capital,
        Plazo: fields.plazo,
        FechaLiquidacion: '',
        CodigoPlantilla: 15,
        IdMensaje: 'sucursalvirtual',
        // formSimulacionCredito:formSimulacionCredito,
      }
      // console.log(params)
      dispatch({
        type: 'plazofijo/RECUPERAR_HB_CONSULTA_TASA_PLAZO_FIJO',
        payload: params,
      })
    } else if (fields.capital != undefined && fields.capital > 10000000) {
      notification.warning({
        message: 'Error al simular el Plazo Fijo',
        description: 'El monto máximo es de $ ' + numberFormatSM(10000000),
      })
    }
  }

  const handleSimulacion = values => {
    debugger
    if (parseFloat(values.capital) <= 0) {
      notification.error({
        message: 'Error al simular el Plazo Fijo',
        description: 'Debe seleccionar un Importe a depositar válido!',
      })
      return false
    }

    dispatch({
      type: 'plazofijo/SET_STATE',
      payload: {
        ImportePactado: values.capital,
        Plazo: values.plazo,
        CodigoCuenta: values.cuenta,
        simulacion: [],
      },
    })
    let params = {
      CodigoSucursal: 20,
      ImportePactado: values.capital,
      Plazo: values.plazo,
      CodigoPlantilla: 7,
      CodigoMoneda: '',
      CodigoCuenta: '',
      FechaLiquidacion: '',
      CodigoProducto: '',
      CodigoRutinaLiquidacion: '',
      CodigoFuncion: '',
      CodigoDatos: '',
      PlazoInteres: '',
      Proceso: '',
      CodigoRetencionImpuesto: '',
      CodigoImpuestoGanancia: '',
      CodigoPaisResidente: '',
      CodigoSistemaCuentaDebito: 0,
      CodigoSucursalCuentaDebito: 0,
      CodigoCuentaDebito: 0,
      CodigoMonedaCuentaDebito: 0,
      IdMensaje: 'sucursalvirtual',
    }
    dispatch({
      type: 'plazofijo/SIMULAR_PLAZOFIJO',
      payload: params,
    }).then(res => {
      // console.log(res)
    })
    // debugger
    myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const ResultadoSimulacion = () => {
    if (plazofijo.simulacion.length > 0) {
      return (
        <div className="row">
          <div className="col-xl-3 col-lg-6 col-md-12">
            <div className="card">
              <div className="card-body">
                <div>
                  <p className="text-uppercase text-muted mb-4">Capital</p>
                  <p className="text-dark font-size-28 font-weight-bold mb-4">
                    {numberFormat(plazofijo.simulacion[0].importeAcc)}
                  </p>
                  {/* <p className="mb-4">TNA: {numberFormatSM(plazofijo.simulacion[0].tna)} %</p> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-12">
            <div className="card">
              <div className="card-body">
                <div>
                  <p className="text-uppercase text-muted mb-4">Interés</p>
                  <p className="text-dark font-size-28 font-weight-bold mb-4">
                    {numberFormat(plazofijo.simulacion[1].importeAcc)}
                  </p>
                  {/* <p className="mb-4">TEA: {numberFormatSM(plazofijo.simulacion[0].tea)} %</p> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-12">
            <div className="card">
              <div className="card-body">
                <div>
                  <p className="text-uppercase text-muted mb-4">Total a cobrar</p>
                  <p className="text-dark font-size-28 font-weight-bold mb-4">
                    {numberFormat(plazofijo.simulacion[1].monto)}
                  </p>
                  {/* <p className="mb-4">
                    Vencimiento: {format(new Date(plazofijo.simulacion[1].vencimiento), 'dd/MM/yyyy')}
                  </p> */}
                </div>
              </div>
            </div>
          </div>
          <div className="col-xl-3 col-lg-6 col-md-12">
            <div className="card">
              <div className="card-body">
                <div>
                  <p className="text-uppercase text-muted mb-2">Detalles</p>
                  <p className="mb-1">
                    Vencimiento:{' '}
                    {format(new Date(plazofijo.simulacion[1].vencimiento), 'dd/MM/yyyy')}
                  </p>
                  <p className="mb-1">TEA: {numberFormatSM(plazofijo.simulacion[0].tea)} %</p>
                  <p className="mb-1">TNA: {numberFormatSM(plazofijo.simulacion[0].tna)} %</p>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-12">
            <button
              type="submit"
              className="btn btn-success px-5"
              onClick={handleNextStep}
              disabled={plazofijo.simulacion.length <= 0 ? true : false}
            >
              Continuar
            </button>
          </div>
        </div>
      )
    } else {
      return <></>
    }
  }

  const handleNextStep = value => {
    history.push('/apps/solicitudplazofijo/confirmacion')
  }

  const marks = {
    1000: '1000',
    5000: '5000',
    10000: '10000',
    15000: '15000',
    20000: '20000',
    25000: '25000',
    35000: '35000',
    40000: '40000',
    45000: '45000',
    50000: '50000',
    55000: '55000',
    60000: '65000',
    300000: '300000',
  }

  return (
    <div>
      <Helmet title="Solicitud de Créditos" />
      <div className="kit__utils__heading">
        <h5>Simulación de Plazo Fijo</h5>
      </div>

      <div className="card mt-4">
        <div className="card-body">

          <Form
            {...formItemLayout}
            layout="vertical"
            form={formSimulacionPlazoFijo}
            onFinish={handleSimulacion}
            fields={fields}
            initialValues={{ plazo: 30 }}
          >

            <Form.Item
              name="capital"
              label="Importe a depositar en $"
              rules={[{ required: true, message: 'Ingrese un capital válido' }]}
            >
              <InputNumber
                min={0}
                max={10000000}
                formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                parser={value => value.replace(/\$\s?|(\.*)|(\,*)/g, '')}
                placeholder="Capital"
                onChange={handleOnChange}
                style={{ width: '100%' }}
                className={`${style.ant_input_number_big}`}
                // onFocus={e => e.target.select()}
              />
            </Form.Item>
            {/* <Form.Item name="slidecapital" label="Monto" className="mt-4">
              <Slider marks={marks} min={1000} max={30000} step={1000} onChange={handleOnChange} />
            </Form.Item> */}

            <Form.Item
              name="plazo"
              label="Plazo en días"
              rules={[{ required: true, message: 'El plazo es obligatorio' }]}
            >
              <Select
                placeholder="Seleccione un plazo"
                showSearch
                style={{ width: '100%' }}
                onChange={handleOnChange}
              >
                {Object.keys(plazos).map((keyName, i) => (
                  <Option key={i} value={plazos[keyName]}>
                    {plazos[keyName]}
                  </Option>
                ))}
              </Select>
            </Form.Item>

            <Form.Item label="TASA">
              {/* <InputNumber
                min={0}
                max={100}
                formatter={value => `${value} %`}
                parser={value => value.replace('%', '')}
                placeholder="TNA"
                style={{ width: '50%' }}
                readOnly={true}
              /> */}
              {plazofijo.loadingtasa ? (
                <Spin indicator={antIcon} disabled={true}></Spin>
              ) : (
                <span className="ml-4" style={{ fontSize: 20 }}>
                  {plazofijo.tasanominal + ' %'}
                </span>
              )}
            </Form.Item>
            <Button htmlType="submit" className="btn btn-success px-5" loading={plazofijo.loading}>
              Simular
            </Button>
          </Form>
        </div>
      </div>
      <div ref={myRef}>
        <ResultadoSimulacion />
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(SolicitudPlazoFijo)