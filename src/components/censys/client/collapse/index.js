import React from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns'
import { Collapse } from 'antd';
import style from './style.module.scss'

const { Panel } = Collapse;

const mapStateToProps = ({client, dispatch }) => ({
  client,
  dispatch
})

const ClientCollapse = ({client, dispatch }) => {
  
  const datosGenerales=client.datosGenerales;

  return (
    <div>
        <Collapse  >
            <Panel header="Cliente" key="1" className={style.custom}>
            <div className="col-lg-12">
                <div className="row">
                <div className="col-md-6">
                <div className="row">
                    Cliente:&nbsp;<strong>{datosGenerales.nombre}</strong>
                    </div>
                    <div className="row">
                    Tipo de Documento:&nbsp;<strong>{datosGenerales.tipoDocumentoDesc}</strong>
                    </div>
                    <div className="row">
                    N° Documento:&nbsp;<strong>{datosGenerales.numeroDocumento}</strong>
                    </div>
                    <div className="row">
                    Estado Civil:&nbsp;<strong>{datosGenerales.sexoCliente=="F"?"SOLTERA":datosGenerales.descripcionEstadoCivil}</strong>
                    </div>
                    <div className="row">
                    Sexo:&nbsp;<strong>{datosGenerales.sexoCliente}</strong>
                    </div>
                    <div className="row">
                    Fecha de Nacimiento:&nbsp;<strong>{datosGenerales.fechaNacimientoCliente?format(new Date(datosGenerales.fechaNacimientoCliente), 'dd/MM/yyyy'):null}</strong>
                    </div>
                    <div className="row">
                    Mail:&nbsp;<strong>{datosGenerales.mailUsuario}</strong>
                    </div>
                    <div className="row">
                    Teléfono:&nbsp;<strong>{client.datosGenerales.caracteristicaTelefono}-{client.datosGenerales.numeroTelefono}</strong>
                    </div>
                </div>
                <div className="col-md-6">
                <div className="row">
                    Domicilio:&nbsp;<strong>{datosGenerales.nombreDomicilio}</strong>
                    </div>
                    <div className="row">
                    N° Domicilio:&nbsp;<strong>{datosGenerales.numeroDomicilio}</strong>
                    </div>
                    <div className="row">
                    Piso:&nbsp;<strong>{datosGenerales.pisoDomicilio}</strong>
                    </div>
                    <div className="row">
                    Departamento:&nbsp;<strong>{datosGenerales.departamentoDomicilio}</strong>
                    </div>
                    <div className="row">
                    Localidad:&nbsp;<strong>{datosGenerales.codigoLocalidad}</strong>
                    </div>
                    <div className="row">
                    Provincia:&nbsp;<strong>{datosGenerales.descripcionProvincia}</strong>
                    </div>
                    <div className="row">
                    Código Postal:&nbsp;<strong>{datosGenerales.codigoPostalDomicilio}</strong>
                    </div>
                </div>
                </div>
            </div>
            </Panel>
        </Collapse>
  </div>  
  )
}

export default connect(mapStateToProps)(ClientCollapse)