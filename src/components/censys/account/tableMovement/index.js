import React,{useState} from 'react'
import { connect } from 'react-redux'
import { Table ,Button,Modal} from 'antd'
import { format } from 'date-fns'
import { numberFormatSM } from '@/services/numberformat'
import { useFilter } from '../../hook/useFilter';
import Detail from '../../movement'
import { obtenerFecha,obtenerFechaHora } from '../../../../services/dateFormat'

const mapStateToProps = ({ client, dispatch }) => ({
  client,
  dispatch
})

const TableMovement = ({ client,dispatch }) => {

  const {getColumnSearchProps}=useFilter()

  const tableColumns = [
    {
      title: 'Movimiento',
      dataIndex: 'codigoMovimiento',
      key: 'codigoMovimiento',
      ...getColumnSearchProps('codigoMovimiento'),
      render: (text, row) => <Button onClick={() => handleMovementDetail(row)}>{text}</Button>,
    },
    {
      title: 'Descripción',
      dataIndex: 'descripcion',
      key: 'descripcion',
      ...getColumnSearchProps('descripcion'),
    },
    {
      title: 'Importe',
      dataIndex: 'importeAccesorio',
      key: 'importeAccesorio',
      render: (value, row) => <>{row.sintetico+' '+ numberFormatSM(value)}</>,
      align: 'right'
    },
    {
      title: 'N° Comprobante',
      dataIndex: 'numeroComprobante',
      key: 'numeroComprobante',
      ...getColumnSearchProps('N° Comprobante','numeroComprobante'),
      sorter: (a, b) => a.numeroComprobante - b.numeroComprobante,
      sortDirections: ['descend', 'ascend'],
    },
    {
      title: 'Moneda',
      dataIndex: 'sintetico',
      key: 'sintetico',
    },
    {
      title: 'Fecha Movimiento',
      dataIndex: 'fechaMovimiento',
      key: 'fechaMovimiento',
      render: value => obtenerFecha(value)
    },
    {
      title: 'Fecha Real',
      dataIndex: 'fechaReal',
      key: 'fechaReal',
      render: value => obtenerFechaHora(value)
    },
    {
      title: 'Débito',
      dataIndex: 'debito',
      key: 'debito',
      render: (value, row) => <>{row.sintetico+' '+ numberFormatSM(value)}</>,
      align: 'right'
    },
    {
      title: 'Crédito',
      dataIndex: 'credito',
      key: 'credito',
      render: (value, row) => <>{row.sintetico+' '+ numberFormatSM(value)}</>,
      align: 'right'
    },
    {
      title: 'Saldo',
      dataIndex: 'saldo',
      key: 'saldo',
      render(value, row, record) {
        return {
          props: {
            style: { color: parseInt(value) >= 0 ? "none" : "red" }
          },
          children: <>{row.sintetico+' '+ numberFormatSM(value)}</>
        };
      },
      align: 'right'
    }
  ]

    const handleMovementDetail = (movement) => {
        dispatch({
          type: 'client/SET_STATE',
          payload: {
            Movimiento: {},
          },
        })
        dispatch({
          type: 'client/SET_STATE',
          payload: {
            Movimiento: movement,
          },
        })
    
        showModal()
      }

    const [isModalVisible, setIsModalVisible] = useState(false);

    const showModal = () => {
      setIsModalVisible(true);
    };
  
    const handleOk = () => {
      setIsModalVisible(false);
    };

    const handleCancel = () => {
      setIsModalVisible(false);
    };

    return (
        <div>
            <Table 
            columns={tableColumns} 
            dataSource={client.CuentaUltimosMovimientos}
            rowKey="id" 
            scroll={{ x: 1300 }}
            />

            <Modal title="Movimiento" visible={isModalVisible} onOk={handleOk} width={1000} okText="Ok"  onCancel={handleCancel} cancelButtonProps={{ style: { display: 'none' } }}>
            <Detail/>
          </Modal>
        </div>
  )
}

export default connect(mapStateToProps)(TableMovement)