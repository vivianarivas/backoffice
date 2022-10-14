import React from 'react'
import { connect } from 'react-redux'
import { format } from 'date-fns'

const mapStateToProps = ({ client }) => ({
  client
})

const AccountDetail = ({client}) => {
  const {cuentaSeleccionada}=client
  return (
    <div className="col-lg-12">
      <div className="mb-3">
        <h5 className="mb-4">
          <strong>Cuenta</strong>
        </h5>
        <div className="col-lg-12">
          <div className="row">
            <div className="col-md-6">
              <div className="row">
                Cuenta:&nbsp;<strong>{cuentaSeleccionada.mascara}</strong>
              </div>
              <div className="row">
                Operatoria:&nbsp;<strong>{cuentaSeleccionada.sintetico}</strong>
              </div>
              <div className="row">
                Moneda:&nbsp;<strong>{cuentaSeleccionada.codigoMonedaDesc}</strong>
              </div>
              <div className="row">
                Estado:&nbsp;<strong>{cuentaSeleccionada.codigoEstadoCuentaDesc}</strong>
              </div>
              <div className="row">
                Tipo de Bloqueo:&nbsp;<strong>{cuentaSeleccionada.codigoTipoBloqueoDesc}</strong>
              </div>
            </div>
            <div className="col-md-6">
              <div className="row">
                Fecha de Último Movimiento:&nbsp;<strong>{format(new Date(cuentaSeleccionada.fechaUltimoMovimientoCuenta), 'dd/MM/yyyy')}</strong>
              </div>
              <div className="row">
                Fecha de Alta:&nbsp;<strong>{format(new Date(cuentaSeleccionada.fechaAlta), 'dd/MM/yyyy')}</strong>
              </div>
              <div className="row">
                Saldo:&nbsp;<strong style={parseInt(cuentaSeleccionada.saldo)>=0?({color:"none"}):({color:"red"})}>{cuentaSeleccionada.codigoMonedaDesc} {cuentaSeleccionada.saldo}</strong>
              </div>
              <div className="row">
                Importe de Embargo:&nbsp;<strong>{cuentaSeleccionada.importeEmbargoCuenta}</strong>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(AccountDetail)
