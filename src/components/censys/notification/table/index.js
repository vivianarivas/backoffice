import React from 'react'
import { connect } from 'react-redux'
import { Table} from 'antd'
import { format } from 'date-fns'
import { useFilter } from '../../hook/useFilter';

const mapStateToProps = ({ notification,dispatch }) => ({
  notification,
  dispatch
})

const TableNotification = ({ notification,dispatch }) => {

    const {getColumnSearchProps}=useFilter()
    
    const tableColumns = [

      {
        title: 'Titulo',
        dataIndex: 'mensajeDestacado',
        key: 'mensajeDestacado'
      },
      {
        title: 'Mensaje',
        dataIndex: 'descripcionMensaje',
        key: 'descripcionMensaje'
      },
      {
        title: 'Fecha Vencimiento',
        dataIndex: 'fechaVencimientoMensaje',
        key: 'fechaVencimientoMensaje',
        render: value => format(new Date(value), 'dd/MM/yyyy - hh:mm a')
      },
      {
        title: 'Tipo',
        dataIndex: 'tipoMenDesc',
        key: 'tipoMenDesc'
      },
      {
        title: 'Url',
        dataIndex: 'url',
        key: 'url'
      }
    ]

    return (
        <div>
            <Table 
            columns={tableColumns} 
            rowKey="codigoMensaje"
            dataSource={notification.notificaciones}
            scroll={{ x: 1300 }}
            />
        </div>
  )
}

export default connect(mapStateToProps)(TableNotification)