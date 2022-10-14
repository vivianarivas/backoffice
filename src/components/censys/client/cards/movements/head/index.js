import React from 'react';
import { connect } from 'react-redux';

const mapStateToProps = ({card, dispatch }) => ({
  card,
  dispatch
})

const ResumeHead = ({card, dispatch }) => {
  
  const {cabecera}=card.TarjetaResumen;
  const {descripcionMarca,entidadDescripcion}=card;

  return (
    <div className="col-lg-12 mb-4 ml-3">
        <div className="row">
          <div className="col-md-3">
            <div className="row">
                <strong>{descripcionMarca + " - " +entidadDescripcion}</strong>
              </div>
            <div className="row">
              Cliente:&nbsp; <strong>{cabecera.cliente}</strong>
            </div>
            <div className="row">
              N° Cuenta:&nbsp;<strong>{cabecera.nroCuenta}</strong>
            </div>
          </div>
          <div className="col-md-3">
            <div className="row">
              Domicilio:&nbsp; <strong>{cabecera.domicilio}</strong>
            </div>
            <div className="row">
              Localidad:&nbsp; <strong>{cabecera.localidad}</strong>
            </div>
            <div className="row">
              Provincia:&nbsp; <strong>{cabecera.provincia}</strong>
            </div>
          </div>
          <div className="col-md-3">
            <div className="row">
              Condicion DGI:&nbsp;<strong>{cabecera.condicionDGI}</strong>
            </div>
            <div className="row">
              Piso:&nbsp;<strong>{cabecera.barCode}</strong>
            </div>
          </div>
        </div>
      
    </div>  
  )
}

export default connect(mapStateToProps)(ResumeHead)
