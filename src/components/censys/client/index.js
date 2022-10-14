import React, { useState } from 'react'
import { connect } from 'react-redux';
import Profile from '@/components/censys/client/profile'
import TableAccount from '@/components/censys/client/tableAccount'
import TableAccountPF from '@/components/censys/client/tableAccountPF'
import TableAccountCR from '@/components/censys/client/tableAccountCR'
import CardsClient from '@/components/censys/client/cards'
import { Spin, Empty ,Tabs } from 'antd'
import { FormattedMessage } from 'react-intl'
import style from './style.module.scss'

const mapStateToProps = ({client, dispatch }) => ({
  client,
  dispatch
})

const Client = ({client, dispatch }) => {

    const { TabPane } = Tabs;

    const datosGenerales=client.datosGenerales;

    if (client.loading) {
      return (
        <div className={style.cargando} style={{ textAlign: 'center' }}>
          <Spin tip={<FormattedMessage id="generico.cargando" />}></Spin>
        </div>
      )
    } 
    if ((datosGenerales.denominacionCliente ===null)) {
      return (
        <div className={style.cargando}>
          <Empty description="El Cliente no existe" />
        </div>
      )
    }

    const [flagAccount,setFlagAccount]=useState(false)
    const [flagAccountCR,setFlagAccountCR]=useState(false)

    const callback=(key)=> {
      if(key!=1){
        setFlagAccount(false)
        dispatch({
              type: 'client/SET_STATE',
              payload: {cuentaSeleccionada:{},CuentaUltimosMovimientos:[]},
            })
      }
      if(key!=4){
        setFlagAccountCR(false)
        dispatch({
              type: 'client/SET_STATE',
              payload: {cuentaCredito:[]},
            })
      }

    }
    return (
        <div>
          <div className="col-lg-12">
            <ul className="list-group list-group-flush">     
              <li className="list-group-item">
                <Profile />
              </li>
              <li className="list-group-item">
                <div className="kit__utils__table">
              <Tabs defaultActiveKey="1" onChange={callback}>
                <TabPane tab="Cuentas" key="1">
                  <TableAccount flag={flagAccount} setFlag={setFlagAccount}/>
                </TabPane>
                <TabPane tab="Tarjetas" key="2">
                  <CardsClient/>
                </TabPane>
                <TabPane tab="Plazos Fijos" key="3">
                  <TableAccountPF/>
                </TabPane>
                <TabPane tab="Créditos" key="4">
                  <TableAccountCR flag={flagAccountCR} setFlag={setFlagAccountCR}/>
                </TabPane>
              </Tabs>
              </div>
              </li>
            </ul>
          </div>
        </div>
  )
}

export default connect(mapStateToProps)(Client)