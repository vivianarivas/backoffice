import React, { useState, useEffect, useRef } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import {
  LoadingOutlined,
} from '@ant-design/icons'
import {
  Row,
  Col,
  Select,
  Button,
  Form,
  InputNumber,
  Table,
  Spin,
} from 'antd'
import { format } from 'date-fns'
import { numberFormat, numberFormatSM } from '@/services/numberformat'
import style from './style.module.scss'

const antIcon = <LoadingOutlined style={{ fontSize: 16 }} spin />

const mapStateToProps = ({ user, creditos, dispatch }) => ({
  dispatch,
  user,
  creditos,
})

const { Option } = Select

const SolicitudCredito = ({ dispatch, creditos }) => {
  const [formSimulacionCredito] = Form.useForm()
  const [btnsimular, setBtnsimular] = useState(false)
  const [fields, setFields] = useState([
    { name: ['importe'], value: 1000 },
    { name: ['tna'], value: 75 },
    { name: ['cuotas'], value: 3 },
  ])
  const myRef = useRef(null)


  useEffect(() => {
    dispatch({
      type: 'creditos/SET_STATE',
      payload: {
        tasacredito: [],
        simulacioncuotacero: [],
        simulacion: [],
        confirmacion: {},
      },
    })
    let params = {
      CodigoSucursal: 20,
      CantidadCuotasPactadas: formSimulacionCredito.getFieldValue('cuotas'),
      ImportePactado: formSimulacionCredito.getFieldValue('importe'),
      CodigoPlantilla: 14,
      IdMensaje: 'sucursalvirtual',
    }
    dispatch({
      type: 'creditos/RECUPERAR_HB_CONSULTA_TASA_CREDITO',
      payload: params,
    })

  }, [])
  

  const handleOnChangeMonto = value => {
    setBtnsimular(true)
    if (!/^[0-9.]*$/.test(value)) {
      return
    }
    let importe = formSimulacionCredito.getFieldValue('importe')
    console.log(value, importe)

    formSimulacionCredito.setFieldsValue({
      importe: value,
      slideimporte: value,
    })
    if (value < 1000) {
      return
    }
    let params = {
      CodigoSucursal: 20,
      CantidadCuotasPactadas: formSimulacionCredito.getFieldValue('cuotas'),
      ImportePactado: formSimulacionCredito.getFieldValue('importe'),
      CodigoPlantilla: 14,
      IdMensaje: 'sucursalvirtual',
    }
    dispatch({
      type: 'creditos/RECUPERAR_HB_CONSULTA_TASA_CREDITO',
      payload: params,
    })
    setBtnsimular(false)
  }

  const handleOnChangeCuotas = value => {
    let importe = formSimulacionCredito.getFieldValue('importe')
    setBtnsimular(true)
    if (!/^[0-9.]*$/.test(importe)) {
      return
    }

    formSimulacionCredito.setFieldsValue({
      cuotas: parseInt(value),
    })
    if (importe < 1000) {
      return
    }

    let params = {
      CodigoSucursal: 20,
      CantidadCuotasPactadas: formSimulacionCredito.getFieldValue('cuotas'),
      ImportePactado: formSimulacionCredito.getFieldValue('importe'),
      CodigoPlantilla: 14,
      IdMensaje: 'sucursalvirtual',
      formSimulacionCredito: formSimulacionCredito,
    }
    dispatch({
      type: 'creditos/RECUPERAR_HB_CONSULTA_TASA_CREDITO',
      payload: params,
    })
    setBtnsimular(false)
  }

  const handleSimulacion = values => {
    let params = {
      CodigoSucursal: 20,
      CodigoMoneda: 'NULL',
      CodigoProducto: 'NULL',
      CodigoCuenta: 'NULL',
	    TipoDocumento:8,
	    NumeroDocumento:23296325139,
      FechaLiquidacion: 'NULL',
      CantidadCuotasPactadas: values.cuotas,
      CodigoRutinaLiquidacion: 'NULL',
      ImportePactado: values.importe,
      Plazo: 'NULL',
      Tasa: 'NULL',
      ValorResidual:'NULL',
      Vencimiento: 'NULL',
      CodigoPlantilla: 32,
	    CodigoSistema:'NULL',
      CodigoSubSistema:'NULL',
      NumeroOperacion:'NULL',
      NumeroLiquidacion:'NULL',
      CodigoSolicitud:'NULL',
      Amortizacion:'NULL',
      TipdocUident:'NULL',
      IdMensaje: 'sucursalvirtual',
    }
    dispatch({
      type: 'creditos/SIMULAR_CREDITO',
      payload: params,
    })
    myRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  const ResultadoSimulacion = () => {
    return (
      <div>

      <div className="card" ref={myRef}>
        <div className="card-header">
          <h5>
            <strong>Resultado de tu simulación</strong>
          </h5>
        </div>
        <div className="card-body">
          <div className="mb-4">
            <div className="row">
              <div className="col-lg-4">
                <div className={`${style.item} mb-xl-0 mb-3`}>
                  <span className={style.icon}>
                    <i className="fe fe-dollar-sign" />
                  </span>
                  <div className={style.desc}>
                    <span className={style.title}>
                      {creditos.simulacion.length > 0
                        ? numberFormatSM(creditos.simulacion[0].importeSol.toFixed(2))
                        : 0}
                    </span>
                    <p>Importe a solicitar</p>
                  </div>
                  <div className={`${style.line} bg-gray-5`} />
                </div>
              </div>
              <div className="col-lg-4">
                <div className={`${style.item} mb-xl-0 mb-3`}>
                  <span className={style.icon}>
                    <i className="fe fe-percent" />
                  </span>
                  <div className={style.desc}>
                    <span className={style.title}>
                      {creditos.simulacion.length > 0
                        ? numberFormatSM(creditos.simulacion[0].tasa.toFixed(2))
                        : 0}
                    </span>
                    <p>Tasa Nominal Anual</p>
                  </div>
                  <div className={`${style.line} bg-success`} />
                </div>
              </div>
              <div className="col-lg-4">
                <div className={`${style.item} mb-xl-0 mb-3`}>
                  <span className={style.icon}>
                    <i className="fe fe-percent" />
                  </span>
                  <div className={style.desc}>
                    <span className={style.title}>
                      {creditos.simulacion.length > 0
                        ? numberFormatSM(creditos.simulacion[0].tea.toFixed(2))
                        : 0}
                    </span>
                    <p>Costo Financiero Total</p>
                  </div>
                  <div className={`${style.line} bg-warning`} />
                </div>
              </div>
            </div>
          </div>
          <div className={`kit__utils__table`}>
            <Table
              columns={columnasCreditos}
              dataSource={creditos.simulacion}
              pagination={{ pageSize: 10 }}
              loading={creditos.loading}
              rowClassName={(record, index) =>
                index % 2 === 0 ? `${style.table_row_light}` : `${style.table_row_dark}`
              }
              rowKey={'numeroCuota'}
            />
          </div>
        </div>
      </div>
      </div>
    )
  }

  const marks = {
    1000: '1000',
  }
  for (let m = 50000; m <= 200000; m = m + 50000) {
    marks[m] = m
  }

  const columnasCreditos = [
    {
      title: 'Nº de Cuota',
      dataIndex: 'numeroCuota',
      key: 'numeroCuota',
      align: 'center',
    },
    {
      title: 'Fecha Vencimiento',
      dataIndex: 'vencimientoActual',
      key: 'vencimientoActual',
      render: value => format(new Date(value), 'dd/MM/yyyy'),
      align: 'center',
    },
    {
      title: 'Amortización',
      dataIndex: 'amortizacion',
      key: 'amortizacion',
      render: value => numberFormat(value),
      align: 'right',
    },
    {
      title: 'Interés',
      dataIndex: 'interesDeudor',
      key: 'interesDeudor',
      render: value => numberFormat(value),
      align: 'right',
    },
    {
      title: 'Impuesto',
      dataIndex: 'impuesto',
      key: 'impuesto',
      render: value => numberFormat(value),
      align: 'right',
    },
    {
      title: 'Gastos',
      dataIndex: 'importeGastos',
      key: 'importeGastos',
      render: value => numberFormat(value),
      align: 'right',
    },
    {
      title: 'Importe Cuota',
      dataIndex: 'impCuota',
      key: 'impCuota',
      render: value => numberFormat(value),
      align: 'right',
    },
    {
      title: 'Saldo Capital',
      dataIndex: 'saldoCapital',
      key: 'saldoCapital',
      render: value => numberFormat(value),
      align: 'right',
    }
  ]

  return (
    <div>
      <Helmet title="Solicitud de Créditos" />
      <div className="kit__utils__heading">
        <h5>Simulación de Credito</h5>
      </div>
      <div className="row">
        <div className="col-xl-8 col-md-8 col-12">
          
          <div className="card mt-4">
            <div className="card-body">
              <Form
                layout="vertical"
                form={formSimulacionCredito}
                onFinish={handleSimulacion}
                fields={fields}
              >
                <Row gutter={24}>
                  <Col xs={24} md={12} xl={12}>
                    <Form.Item
                      name="importe"
                      label="Importe a solicitar en $"
                      rules={[{ required: true, message: 'Ingrese un importe válido' }]}
                    >
                      <InputNumber
                        min={1000}
                        max={200000}
                        step={1000}
                        formatter={value => `$ ${value}`.replace(/\B(?=(\d{3})+(?!\d))/g, '.')}
                        parser={value => value.replace(/\$\s?|(\.*)|(\,*)/g, '')}
                        placeholder="Ingrese el importe a solicitar"
                        onChange={handleOnChangeMonto}
                        style={{ width: '100%' }}
                        className={`${style.ant_input_number_big}`}
                        onFocus={e => e.target.select()}
                      />
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12} xl={12}>
                    <Form.Item label="TNA">
                      {creditos.loadingtasa ? (
                        <Spin indicator={antIcon} disabled={true}></Spin>
                      ) : (
                        <span className="ml-0" style={{ fontSize: 20 }}>
                          {creditos.tasanominal + ' %'}
                        </span>
                      )}
                    </Form.Item>
                  </Col>
                </Row>
                <Row gutter={24}>
                  <Col xs={24} md={12} xl={12}>
                    <Form.Item name="cuotas" label="Cantidad de cuotas">
                      <Select
                        placeholder="Cantidad de cuotas"
                        style={{ width: '100%' }}
                        onChange={handleOnChangeCuotas}
                      >
                        {[...Array(36)].map((x, i) => (
                          <Option key={i + 1}>{i + 1}</Option>
                        ))}
                      </Select>
                    </Form.Item>
                  </Col>
                  <Col xs={24} md={12} xl={12}>
                    <Form.Item name="tipo" label="Tipos">
                      <Select
                        placeholder="Tipos"
                        style={{ width: '100%' }}
                      >
                          <Option key="1">Persona</Option>
                          <Option key="2">Empresa</Option>
                      </Select>
                    </Form.Item>
                  </Col>
                </Row>
                <Row>
                  <Col xs={24} md={24} xl={24} className="text-center">
                    <Button
                      htmlType="submit"
                      className="btn btn-success px-5"
                      loading={creditos.loading}
                      disabled={btnsimular}
                    >
                      Simular
                    </Button>
                  </Col>
                </Row>
              </Form>
            </div>
          </div>
        </div>
      </div>
      <ResultadoSimulacion />
    </div>
  )
}

export default connect(mapStateToProps)(SolicitudCredito)