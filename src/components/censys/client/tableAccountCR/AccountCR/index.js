import React, { useState } from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'
import { Table, Modal, Button, Spin } from 'antd'
import { numberFormatSM } from '@/services/numberformat'
import { FormattedMessage } from 'react-intl'
// import AccountCRDetail from '../detail'
import AccountCRDetail from '../Detail'
import style from '../../style.module.scss'
import { useFilter } from '../../../hook/useFilter'
import moment from 'moment'

const mapStateToProps = ({ client, dispatch }) => ({
  client,
  dispatch,
})

const AccountCR = ({ client, dispatch, cuenta }) => {
  const { getColumnSearchProps } = useFilter()

  const tableColumns = [
    {
      title: 'Operación',
      dataIndex: 'numeroOperacion',
      key: 'numeroOperacion',
      ...getColumnSearchProps('Operación', 'numeroOperacion'),
      sorter: (a, b) => a.numeroOperacion - b.numeroOperacion,
      sortDirections: ['descend', 'ascend'],
      render: (text, row) => <Button onClick={() => handle(row)}>{text}</Button>,
    },
    {
      title: 'Fecha de Otorgamiento',
      dataIndex: 'fechaLiquidacion',
      key: 'fechaLiquidacion',
      sorter: (a, b) => moment(a.fechaLiquidacion).unix() - moment(b.fechaLiquidacion).unix(),
      sortDirections: ['descend', 'ascend'],
      render: value => format(new Date(value), 'dd/MM/yyyy'),
    },
    {
      title: 'Fecha de Vencimiento',
      dataIndex: 'fechaVencimiento',
      key: 'fechaVencimiento',
      sorter: (a, b) => moment(a.fechaVencimiento).unix() - moment(b.fechaVencimiento).unix(),
      sortDirections: ['descend', 'ascend'],
      render: value => format(new Date(value), 'dd/MM/yyyy'),
    },
    {
      title: 'Importe',
      dataIndex: 'importe',
      key: 'importe',
      sorter: (a, b) => a.importe - b.importe,
      sortDirections: ['descend', 'ascend'],
      render: value => <>{'$ ' + numberFormatSM(value)}</>,
    },
    {
      title: 'TNA',
      dataIndex: 'tna',
      key: 'tna',
      render: value => <>{numberFormatSM(value) + ' %'}</>,
    },
    {
      title: 'CFT',
      dataIndex: 'costoFinancieroTotal',
      key: 'costoFinancieroTotal',
      render: value => <>{numberFormatSM(value) + ' %'}</>,
    },
  ]

  const handle = valor => {
    try {
      const { codigoCuenta, numeroOperacion } = valor
      const { tipoDocumento, numeroDocumento } = client.datosGenerales
      showModal()
      setOperacion(numeroOperacion)
      let params = {
        codigoCuenta: codigoCuenta,
        numeroOperacion: numeroOperacion,
        tipoDocumento: tipoDocumento,
        numeroDocumento: numeroDocumento,
      }
      dispatch({
        type: 'client/SET_STATE',
        payload: { cuentaCreditoCuota: [] },
      })
      dispatch({
        type: 'client/CONSULTA_CUAOTAS_CREDITO',
        payload: params,
      })
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  const [isModalVisible, setIsModalVisible] = useState(false)
  const [operacion, setOperacion] = useState()

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleOk = () => {
    setIsModalVisible(false)
  }
  const handleCancel = () => {
    setIsModalVisible(false)
  }

  const cuentaCredito = client.cuentaCredito

  if (client.loading) {
    return (
      <div className={style.cargando} style={{ textAlign: 'center' }}>
        <Spin tip={<FormattedMessage id="generico.cargando" />}></Spin>
      </div>
    )
  }

  return (
    <div>
      <h5 className="mb-4">
        <strong>Cuenta {cuenta}</strong>
      </h5>
      <Table
        columns={tableColumns}
        dataSource={client.cuentaCredito}
        rowKey="numeroOperacion"
        scroll={{ x: 900 }}
      />
      <Modal
        title={`Operación ${operacion}`}
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
        width={1000}
        okText="Ok"
        cancelButtonProps={{ style: { display: 'none' } }}
      >
        <AccountCRDetail />
      </Modal>
    </div>
  )
}

export default connect(mapStateToProps)(AccountCR)
