import React, { useState, useRef } from 'react'
import { connect } from 'react-redux'
import { Table, Button, Divider } from 'antd'
import { format } from 'date-fns'
import { useFilter } from '../../hook/useFilter'
import moment from 'moment'
// import AccountCR from './accountCR'
import AccountCR from '../tableAccountCR/AccountCR'
import ClientCollapse from '../collapse'

const mapStateToProps = ({ client, dispatch }) => ({
  client,
  dispatch,
})

const TableAccountCR = ({ client, dispatch, flag, setFlag }) => {
  const { getColumnSearchProps } = useFilter()

  const [cuenta, setCuenta] = useState()

  const tableColumns = [
    {
      title: 'Cuenta',
      dataIndex: 'mascara',
      key: 'mascara',
      ...getColumnSearchProps('Cuenta', 'mascara'),
      render: (text, row) => <Button onClick={() => handle(row)}>{text}</Button>,
      sorter: (a, b) => a.codigoCuenta - b.codigoCuenta,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Estado',
      dataIndex: 'codigoEstadoCuentaDesc',
      key: 'codigoEstadoCuentaDesc',
      ...getColumnSearchProps('Estado', 'codigoEstadoCuentaDesc'),
      sorter: (a, b) => a.codigoEstadoCuentaDesc.localeCompare(b.codigoEstadoCuentaDesc),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Tipo de Bloqueo',
      dataIndex: 'codigoTipoBloqueoDesc',
      key: 'codigoTipoBloqueoDesc',
      ...getColumnSearchProps('Tipo de Bloqueo', 'codigoTipoBloqueoDesc'),
      sorter: (a, b) => a.codigoEstadoCuentaDesc.localeCompare(b.codigoEstadoCuentaDesc),
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Grupo de Afinidad',
      dataIndex: 'descripcionGrupoAfinidad',
      key: 'descripcionGrupoAfinidad',
      //...getColumnSearchProps('Tipo de Bloqueo','codigoTipoBloqueoDesc'),
      //sorter: (a, b) => a.codigoEstadoCuentaDesc.localeCompare(b.codigoEstadoCuentaDesc),
      //sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Fecha de Alta',
      dataIndex: 'fechaAlta',
      key: 'fechaAlta',
      sorter: (a, b) => moment(a.fechaAlta).unix() - moment(b.fechaAlta).unix(),
      sortDirections: ['descend', 'ascend'],
      render: value => format(new Date(value), 'dd/MM/yyyy'),
    },
  ]

  const handle = valor => {
    try {
      const { codigoCuenta, tipoDocumento, numeroDocumento } = valor
      setCuenta(codigoCuenta)
      let params = {
        codigoCuenta: codigoCuenta,
        tipoDocumento: tipoDocumento,
        numeroDocumento: numeroDocumento,
      }
      dispatch({
        type: 'client/SET_STATE',
        payload: { cuentaCredito: [] },
      })
      dispatch({
        type: 'client/RECUPERAR_INFORME_DEUDA',
        payload: params,
      })

      setFlag(true)
    } catch (errInfo) {
      console.log('Validate Failed:', errInfo)
    }
  }

  return (
    <div>
      <Table
        columns={tableColumns}
        dataSource={client.cuentasCredito}
        rowKey="mascara"
        scroll={{ x: 1300 }}
      />
      {flag ? (
        <div>
          <Divider />
          <div className="mb-3">
            <ClientCollapse />
          </div>
          <AccountCR cuenta={cuenta} />
        </div>
      ) : null}
    </div>
  )
}

export default connect(mapStateToProps)(TableAccountCR)
