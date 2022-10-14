import React,{useState,useRef} from 'react'
import { connect } from 'react-redux'
import { Table} from 'antd'
import { useFilter } from '../../hook/useFilter';

const mapStateToProps = ({ client, dispatch }) => ({
    client,
    dispatch
})

const TableClients = ({ client,dispatch,handleClient }) => {

    const clientes=client.clientes


    const {getColumnSearchProps}=useFilter()
    
    const tableColumns = [

      {
        title: 'Documento',
        dataIndex: 'sinteticoDocumento',
        key: 'sinteticoDocumento'
      },
      {
        title: 'N° Documento',
        dataIndex: 'numeroDocumento',
        key: 'numeroDocumento', 
        ...getColumnSearchProps('N° Documento','numeroDocumento'),
        sorter: (a, b) => a.numeroDocumento - b.numeroDocumento,
        sortDirections: ['descend', 'ascend'],

      }
      ,
      {
        title: 'Apellido y Nombre',
        dataIndex: 'nombre',
        key: 'nombre',
        ...getColumnSearchProps('Apellido y Nombre','nombre'),
        sorter: (a, b) => a.nombre.localeCompare(b.nombre),
        sortDirections: ['descend', 'ascend'],
      }
      ]

    const onClickRow = (record) => {
      return {
        onClick: () => {
          const params={
            tipoDocumento:record.tipoDocumento,
            numeroDocumento:record.numeroDocumento
          }
          handleClient(params)
        },
      };
    }

    return (
        <div>
            <Table columns={tableColumns} 
            rowKey="id"
            dataSource={clientes} 
            scroll={{ x: 900 }}
            onRow={(record, rowIndex) => {
                console.log(record)
            }}
            onRow={onClickRow}
          
            />
        </div>
  )
}

export default connect(mapStateToProps)(TableClients)