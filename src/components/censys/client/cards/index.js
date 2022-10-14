import React,{ useState, useRef }  from 'react'
import { connect } from 'react-redux'
import {  Table,Drawer, ConfigProvider,Modal, Button, Tooltip} from 'antd'
import { numberFormatSM } from '@/services/numberformat'
import { useFilter } from '../../hook/useFilter';
import ResumeClient from './resume';
import MovementCard from './movements'
import { notification } from 'antd'
import { FileTextOutlined } from '@ant-design/icons'
import { format } from 'date-fns'
import moment from 'moment';

const mapStateToProps = ({ card, dispatch }) => ({
  card,
  dispatch
})

const CardsClient = ({ card,dispatch }) => {

    const {getColumnSearchProps}=useFilter()

    const tableColumns = [
      {
        title: 'N° Cuenta',
        dataIndex: 'nroCuenta',
        key: 'nroCuenta',
        ...getColumnSearchProps('N° Cuenta','nroCuenta'),
        sorter: (a, b) => a.nroCuenta - b.nroCuenta,
        sortDirections: ['descend', 'ascend'],
        render:(value)=><>{parseInt(value) != 0 ? value : "Cuenta Pre Emitida Sin Activar"}</> 
      },
      {
        title: 'Marca',
        dataIndex: 'descripcionMarca',
        key: 'descripcionMarca',
      },
      {
        title: 'Entidad',
        dataIndex: 'entidadDescripcion',
        key: 'entidadDescripcion',
        sorter: (a, b) => a.entidadDescripcion.localeCompare(b.entidadDescripcion),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Tipo',
        dataIndex: 'descripcion',
        key: 'descripcion',
        ...getColumnSearchProps('Tipo','descripcion'),
        sorter: (a, b) => a.descripcion.localeCompare(b.descripcion),
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Límite Compra',
        dataIndex: 'limiteCompra',
        key: 'limiteCompra',
        render: (value) => <>{'$' + numberFormatSM(value)}</>,
        align: 'right'
      },
      {
        title: 'Límite Financiación',
        dataIndex: 'limiteFinanciacion',
        key: 'limiteFinanciacion',
        render: (value) => <>{'$' + numberFormatSM(value)}</>,
        align: 'right'
      },
      {
        title: 'Fecha de Alta',
        dataIndex: 'fechaAltaCuenta',
        key: 'fechaAltaCuenta',
        sorter: (a, b) => moment(a.fechaAltaCuenta).unix() - moment(b.fechaAltaCuenta).unix(),
        sortDirections: ['descend', 'ascend'],
        render: value => format(new Date(value), 'dd/MM/yyyy')
      },
      {
        title: 'Acción',
        key: 'action',
        render: (row, record) => (
          <Tooltip title="Resumen">
            <Button disabled={parseInt(row.nroCuenta) == 0?true:false} onClick={()=>handle(record)} icon={<FileTextOutlined/>}/>
          </Tooltip>
        ),
      },
    ]

    const domRef = useRef(null);
    const [visible, setVisible] = useState(false);
  
    const handle = (valor) => {
      try {
        const {cuentaSocio,nroCuenta,descripcionMarca,entidadDescripcion}=valor
        if(nroCuenta=="0"){
          notification.warning({
            message: 'Cuenta No Activa',
          })
        return  
        }
        setVisible(true);
        let params = {
          CuentaSocio: cuentaSocio,
          nroCuenta:nroCuenta,
          descripcionMarca:descripcionMarca,
          entidadDescripcion:entidadDescripcion
        }
        dispatch({
          type: 'card/TU_VENCIMIENTO_CIERRE_MARGEN',
          payload: params,
        })

        dispatch({
          type: 'card/SET_RESUMEN',
          payload: params,
        })
      }
      catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
    }

    const onClose = () => {
      setVisible(false);
      clear();
    };

    const clear = () => {
      try {
        dispatch({
          type: 'card/LIMPIAR_DATOS_RESUMENES'
        })
      }
      catch (errInfo) {
        console.log('Validate Failed:', errInfo);
      }
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
  
    <ConfigProvider getPopupContainer={() => domRef.current}>
      <div ref={domRef} className="site-drawer-render-in-current-wrapper">
            <Table columns={tableColumns} 
            dataSource={card.tarjetas} 
            rowKey="cuentaSocio"
            //onRow={(row) => ({onClick: () => (handle(row))})} 
            scroll={{ x: 1300 }}
            />
            <Drawer
              style={{
                position: 'absolute',
              }}
              title="Resúmenes"
              placement="right"
              destroyOnClose={true}
              onClose={onClose}
              visible={visible}
              width={"40%"}
            >
              {card.resumenes?
                (card.resumenes.map(item=>{
                  return(
                    <ResumeClient key={item.id} resumen={item} showModal={showModal}/>
                  )
                }))
              :null}
            </Drawer>
          </div>

          <Modal title="Resumen" visible={isModalVisible} onOk={handleOk} onCancel={handleCancel}  width={1000} okText="Ok"  cancelButtonProps={{ style: { display: 'none' } }}>
            <MovementCard/>
          </Modal>
        </ConfigProvider>
      
  )
}

export default connect(mapStateToProps)(CardsClient)