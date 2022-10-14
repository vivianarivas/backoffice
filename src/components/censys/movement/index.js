import React from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'

const mapStateToProps = ({ client }) => ({
  client
})

const Detail = ({client}) => {
   const  movement=client.Movimiento

  return (
      
    <div className="col-lg-12">
      <div className="mb-3">
        <div className="col-lg-12">
          <div className="row">
            <div className="col-md-6">
              <div className="row">
              Movimiento:&nbsp;<strong>{movement.codigoMovimiento}</strong>
              </div>
              <div className="row">
              Descripción:&nbsp;<strong>{movement.descripcion}</strong>
              </div>
              <div className="row">
              Importe:&nbsp;<strong>{movement.importeAccesorio}</strong>
              </div>
              <div className="row">
              N° Comprobante:&nbsp;<strong>{movement.numeroComprobante}</strong>
              </div>
              <div className="row">
              Moneda:&nbsp;<strong>{movement.sintetico}</strong>
              </div>
            </div>
            <div className="col-md-6">
            <div className="row">
              Fecha Movimiento:&nbsp;<strong>{format(new Date(movement.fechaMovimiento), 'dd/MM/yyyy - hh:mm:ss a')}</strong>
              </div>
              <div className="row">
              Fecha Real:&nbsp;<strong>{format(new Date(movement.fechaReal), 'dd/MM/yyyy - hh:mm:ss a')}</strong>
              </div>
              <div className="row">
              Débito:&nbsp;<strong>{movement.sintetico} {movement.debito}</strong>
              </div>
              <div className="row">
              Crédito:&nbsp;<strong>{movement.sintetico}  {movement.credito}</strong>
              </div>
              <div className="row">
              Saldo:&nbsp;<strong style={parseInt(movement.saldo)>=0?({color:"none"}):({color:"red"})}>{movement.sintetico} {movement.saldo}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Detail)