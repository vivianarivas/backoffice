import React from 'react'
import { Card } from 'antd';
import { format } from 'date-fns'
import { connect } from 'react-redux'
import { numberFormatSM } from '@/services/numberformat'

const mapStateToProps = ({  dispatch }) => ({
  dispatch
})

const ResumeClient = ({ resumen,showModal,dispatch }) => {

  const {idFacturacion,fechaCierre,fechaVencimiento,saldoActual,pagoMinimo}=resumen

  const handle = (idFacturacion) => {
    try {
      let params = {
        idFacturacion: idFacturacion,
      }
      dispatch({
        type: 'card/CONSULTA_TARJETA_RESUMEN_CAB'
      })
      dispatch({
        type: 'card/CONSULTA_TARJETA_RESUMEN_DET',
        payload: params,
      })

      showModal();
    }
    catch (errInfo) {
      console.log('Validate Failed:', errInfo);
    }
  }
  const gridStyle = {
    width: '100%',
    textAlign: 'center',
  };


  return (
    <div className="row m-1">
      <Card.Grid  style={gridStyle} onClick={()=>handle(idFacturacion)}>
      <div className="row ml-2"><strong>Resumen Cierre:&nbsp;{format(new Date(fechaCierre), 'dd/MM/yyyy')}</strong></div>
      <div className="row ml-2">Vencimiento:&nbsp;{format(new Date(fechaVencimiento), 'dd/MM/yyyy')}</div>
      <div className="row ml-2">Saldo Actual:&nbsp;$&nbsp;{numberFormatSM(saldoActual)}</div>
      <div className="row ml-2">Pago Mínimo:&nbsp;$&nbsp;{numberFormatSM(pagoMinimo)}</div>
      </Card.Grid>
    </div>
  )
}

export default connect(mapStateToProps)(ResumeClient)
