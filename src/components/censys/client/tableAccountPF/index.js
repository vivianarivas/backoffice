import React,{useState,useRef} from 'react'
import { connect } from 'react-redux'
import { Table,Button,Modal} from 'antd'
import { format } from 'date-fns'
import { numberFormatSM } from '@/services/numberformat'
import { useFilter } from '../../hook/useFilter';
import AccountPF from './AccountPF'
import moment from 'moment';

const mapStateToProps = ({ client, dispatch }) => ({
  client,
  dispatch
})

const TableAccountPF = ({ client,dispatch }) => {

    const {getColumnSearchProps}=useFilter()
    
    const tableColumns = [

      {
        title: 'Cuenta',
        dataIndex: 'mascara',
        key: 'mascara',
        ...getColumnSearchProps('Cuenta','mascara'),
        render: (text, row) => <Button onClick={() => handle(row)}>{text}</Button>,
        sorter: (a, b) => a.codigoCuenta - b.codigoCuenta,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Estado',
        dataIndex: 'codigoEstadoCuentaDesc',
        key: 'codigoEstadoCuentaDesc',
        ...getColumnSearchProps('Estado','codigoEstadoCuentaDesc'),
        sorter: (a, b) => a.codigoEstadoCuentaDesc.localeCompare(b.codigoEstadoCuentaDesc),
        sortDirections: ['descend', 'ascend'],
        
      },
      {
        title: 'Tipo de Bloqueo',
        dataIndex: 'codigoTipoBloqueoDesc',
        key: 'codigoTipoBloqueoDesc',
        ...getColumnSearchProps('Tipo de Bloqueo','codigoTipoBloqueoDesc'),
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
        render: value => format(new Date(value), 'dd/MM/yyyy')
      }
    ]

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
   

    const handle = (valor) => {
      try {
        const {codigoCuenta,tipoDocumento,numeroDocumento}=valor

        showModal();
        let params = {
          codigoCuenta:codigoCuenta,
          tipoDocumento:tipoDocumento,
          numeroDocumento:numeroDocumento,
        }
        dispatch({
          type: 'client/SET_STATE',
          payload: {cuentaPlazoFijo:[]},
        })
        dispatch({
          type: 'client/RECUPERAR_PLAZO_FIJO',
          payload: params,
        })

      }
      catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    }

    return (
        <div>
            <Table columns={tableColumns} 
            dataSource={client.cuentasPlazoFijo} 
            rowKey="mascara" 
            scroll={{ x: 1300 }}
            />

          <Modal title="Plazo Fijo" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel} width={1000} okText="Ok"  cancelButtonProps={{ style: { display: 'none' } }}>
            <AccountPF/>
          </Modal>
        </div>
  )
}

export default connect(mapStateToProps)(TableAccountPF)