import React,{useState,useRef} from 'react'
import { connect } from 'react-redux'
import { Table,Button,Divider} from 'antd'
import { format } from 'date-fns'
import { numberFormatSM } from '@/services/numberformat'
import { useFilter } from '../../hook/useFilter';
import Account from '@/pages/bmr/account'
import ClientCollapse from '../collapse'
import moment from 'moment';

const mapStateToProps = ({ client, dispatch }) => ({
  client,
  dispatch
})

const TableAccount = ({ client,dispatch ,flag,setFlag}) => {

    const handleMovement = (valor) => {
        try {
          const {codigoCuenta,tipoDocumento,numeroDocumento,sintetico,codigoMoneda}=valor
          const codigoSistema=(sintetico=="ca"?5:3)
          let params = {
            codigoSistema:codigoSistema,
            codigoCuenta: codigoCuenta,
            codigoMoneda:codigoMoneda,
            tipoDocumento:tipoDocumento,
            numeroDocumento:numeroDocumento
          }
          setFlag(false)
          dispatch({
            type: 'client/SET_STATE',
            payload: {
              CuentaUltimosMovimientos: [],
            },
          })
          dispatch({
            type: 'client/CUENTA_ACTUAL',
            payload: valor,
          })
          dispatch({
            type: 'client/CUENTA_ULTIMOS_MOVIMIENTOS',
            payload: params,
          })
          setFlag(true)
        }
        catch (errInfo) {
          console.log('Validate Failed:', errInfo);
        }
      }

    const {getColumnSearchProps}=useFilter()
    
    const tableColumns = [
      {
        title: 'Cuenta',
        dataIndex: 'mascara',
        key: 'mascara',
        ...getColumnSearchProps('Cuenta','mascara'),
        render: (text, row) => <Button onClick={() => handleMovement(row)}>{text}</Button>,
        sorter: (a, b) => a.codigoCuenta - b.codigoCuenta,
        sortDirections: ['descend', 'ascend'],
      },
      {
        title: 'Sucursal',
        dataIndex: 'descripcionSucursal',
        key: 'descripcionSucursal',
        sorter: (a, b) => a.descripcionSucursal.localeCompare(b.descripcionSucursal),
        sortDirections: ['descend', 'ascend'],
        render: (text, row) =><>{row.codigoSucursal} - {text}</>
      },
      {
        title: 'Operatoria',
        dataIndex: 'sintetico',
        key: 'sintetico',
        sorter: (a, b) => a.sintetico.localeCompare(b.sintetico),
        sortDirections: ['descend', 'ascend'],
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
            children: <>{row.codigoMonedaDesc+' '+ numberFormatSM(value)}</>
          };
        },
        align: 'right'
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
        title: 'Importe de Embargo',
        dataIndex: 'importeEmbargoCuenta',
        key: 'importeEmbargoCuenta',
        render: (value, row) => <>{row.codigoMonedaDesc+' '+ numberFormatSM(value)}</>,
        align: 'right'
      },
      {
        title: 'Fecha de Último Movimiento',
        dataIndex: 'fechaUltimoMovimientoCuenta',
        key: 'fechaUltimoMovimientoCuenta',
        render: value => format(new Date(value), 'dd/MM/yyyy')
      },
      {
        title: 'Fecha de Alta',
        dataIndex: 'fechaAlta',
        key: 'fechaAlta',
        sorter: (a, b) => moment(a.fechaAltaCuenta).unix() - moment(b.fechaAltaCuenta).unix(),
        sortDirections: ['descend', 'ascend'],
        render: value => format(new Date(value), 'dd/MM/yyyy')
      }
    ]


    return (
        <div>
            <Table columns={tableColumns} 
            dataSource={client.cuentasfiltro} 
            rowKey="mascara"
            scroll={{ x: 1300 }}
            />

            {flag?
            <div>
              <Divider />
              <div className="mb-3">
              <ClientCollapse/>
              </div>
              <Account/>
            </div>
            
            :null}
        </div>
  )
}

export default connect(mapStateToProps)(TableAccount)