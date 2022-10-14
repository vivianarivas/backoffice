import React from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns'
import { Table } from 'antd'
import { numberFormatSM } from '@/services/numberformat'
import { useFilter } from '../../../hook/useFilter';
import moment from 'moment';
import ClientCollapse from '../../collapse'

const mapStateToProps = ({client, dispatch }) => ({
    client,
    dispatch
})

const AccountPF = ({client, dispatch }) => {
  
  const {getColumnSearchProps}=useFilter()
    
  const tableColumns = [
    {
      title: 'Operación',
      dataIndex: 'numeroOperacion',
      key: 'numeroOperacion',
      ...getColumnSearchProps('Operación','numeroOperacion'),
      sorter: (a, b) => a.numeroOperacion - b.numeroOperacion,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Importe',
      dataIndex: 'saldoOperativo',
      key: 'saldoOperativo',
      render: (value) => <>{'$ '+ numberFormatSM(value)}</>,
    },
    {
      title: 'Fecha',
      dataIndex: 'fechaOrigen',
      key: 'fechaOrigen',
      sorter: (a, b) => moment(a.fechaAlta).unix() - moment(b.fechaAlta).unix(),
      sortDirections: ['descend', 'ascend'],
      render: value => format(new Date(value), 'dd/MM/yyyy')
    },
    {
      title: 'Fecha de Vencimiento',
      dataIndex: 'fechaVencimiento',
      key: 'fechaVencimiento',
      sorter: (a, b) => moment(a.fechaVencimiento).unix() - moment(b.fechaVencimiento).unix(),
      sortDirections: ['descend', 'ascend'],
      render: value => format(new Date(value), 'dd/MM/yyyy')
    },
    {
      title: 'Tasa',
      dataIndex: 'tasa',
      key: 'tasa',
      render: (value) => <>{numberFormatSM(value)+ ' %'}</>,
    }
    ]


  return (
    <div>
    <div className="mb-3">
      <ClientCollapse/>
    </div>
    <Table columns={tableColumns} 
    rowKey="numeroOperacion"
    dataSource={client.cuentaPlazoFijo} 
    scroll={{ x: 900 }}
    />
    </div>
  )
}

export default connect(mapStateToProps)(AccountPF)
