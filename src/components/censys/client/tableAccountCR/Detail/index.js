import React from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns'
import { Table } from 'antd'
import { numberFormatSM } from '@/services/numberformat'

const mapStateToProps = ({client, dispatch }) => ({
  client,
  dispatch
})

const AccountCRDetail = ({client, dispatch }) => {
    
  const tableColumns = [
    {
      title: 'Cuota',
      dataIndex: 'numeroCuota',
      key: 'numeroCuota'
    },
    {
      title: 'Fecha de Vencimiento',
      dataIndex: 'fechaVencimiento',
      key: 'fechaVencimiento',
      render: value => format(new Date(value), 'dd/MM/yyyy')
    },
    {
      title: 'Días de Atraso',
      dataIndex: 'diasAtraso',
      key: 'diasAtraso'
    },
    {
      title: 'Importe',
      dataIndex: 'saldo',
      key: 'saldo',
      render: (value) => <>{'$ '+ numberFormatSM(value)}</>,
    },
    {
      title: 'Estado',
      dataIndex: 'descripcionPago',
      key: 'descripcionPago'
    }
    ]

  return (
    <div>
      <Table columns={tableColumns} 
      dataSource={client.cuentaCreditoCuota} 
      rowKey="numeroCuota"
      scroll={{ x: 900 }}
      />
    </div>  
  )
}

export default connect(mapStateToProps)(AccountCRDetail)
