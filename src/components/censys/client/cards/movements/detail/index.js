import React,{useState,useRef} from 'react'
import { connect } from 'react-redux'
import { Table,Button} from 'antd'
import { format } from 'date-fns'
import { numberFormatSM } from '@/services/numberformat'
import { useFilter } from '../../../../hook/useFilter';

const mapStateToProps = ({ card, dispatch }) => ({
    card,
    dispatch
})

const ResumeDetail = ({ card,dispatch }) => {


    const {getColumnSearchProps}=useFilter()
    
    const tableColumns = [

      {
        title: 'Fecha',
        dataIndex: 'fechaMovimiento',
        key: 'fechaMovimiento',
        render: value => format(new Date(value), 'dd/MM/yyyy - hh:mm a')
      },
      {
        title: 'Movimiento',
        dataIndex: 'descripcion',
        key: 'descripcion',
        ...getColumnSearchProps('Movimiento','descripcion'),
        sorter: (a, b) => a.descripcion.localeCompare(b.descripcion),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Comprobante',
        dataIndex: 'comprobante',
        key: 'comprobante',
        ...getColumnSearchProps('Comprobante','comprobante'),
        sorter: (a, b) => a.comprobante - b.comprobante,
        sortDirections: ['descend', 'ascend']       
      },
      {
        title: 'Cuotas',
        dataIndex: 'numeroCuota',
        key: 'numeroCuota'
      },
      {
        title: 'Importe ARS',
        dataIndex: 'importeloc',
        key: 'importeloc',
        render: (value) => <>{'$ '+ numberFormatSM(value)}</>,
      },
      {
        title: 'Importe USD',
        dataIndex: 'importeUSD',
        key: 'importeUSD',
        render: (value) => <>{'u$s '+ numberFormatSM(value)}</>,
      }
      ]


    return (
        <div>
            <Table columns={tableColumns} 
            rowKey="id"
            dataSource={card.TarjetaResumen.detalle} 
            scroll={{ x: 900 }}
            />
        </div>
  )
}

export default connect(mapStateToProps)(ResumeDetail)