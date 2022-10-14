import React,{useEffect} from 'react';
import { connect } from 'react-redux';
import { format } from 'date-fns'
import style from './style.module.scss'
import imageFirm from '../../../../../public/resources/images/avatars/firm.png'
import { Image,Avatar, Card ,Row,Col,Button,Popconfirm, message } from 'antd';
import { UserOutlined } from '@ant-design/icons';

const mapStateToProps = ({client, dispatch }) => ({
  client,
  dispatch
})



const Profile = ({client, dispatch }) => {
  
  const datosGenerales=client.datosGenerales
  const datosHB=client.datosHB
  const datosOtros=client.datosOtros

  const sendmail=()=>{

    console.log(datosGenerales.tipoDocumento)
    console.log(datosGenerales.numeroDocumento)
    console.log(datosGenerales.email)
    console.log(datosGenerales.denominacionCliente)

    
    dispatch({
      type: 'client/BLANQUEO_CLAVE',
      payload: {
        tipoDocumento:datosGenerales.tipoDocumento,
        numeroDocumento:datosGenerales.numeroDocumento,
      },
    })

    dispatch({
      type: 'client/MAIL_SEND',
      payload: {
        email:datosGenerales.email,
        denominacionCliente:datosGenerales.denominacionCliente,
      },
    })
    
  }

  const cancel=()=>{
    console.log('Click on No');
  }

  const styleItem = {
  
    float: 'right',

    '@media (max-width: 1200px)': {
      float: 'left'
    },
  };
  

  return (
    <div>
      <div className="d-flex flex-wrap align-items-center mb-5">
        <div className={`${style.image} height-100 m-2`}>
        {datosGenerales.imagenFoto=="AA=="?
        <Avatar size={64} icon={<UserOutlined />} />:
          <Image src={`data:image/jpeg;base64,${datosGenerales.imagenFoto}`} width={100} alt="Usuario" />
        }
        </div>
        <div className="mb-2">
          <div className="text-dark font-size-18 font-weight-bold text-nowrap">
            {datosGenerales.nombre}
            <i className="align-text-bottom fe fe-check-square text-success ml-2 font-size-24 " />
          </div>
          <div className="text-uppercase">Tipo de Documento: {datosGenerales.tipoDocumentoDesc}</div>
          <div className="text-uppercase">N° Documento: {datosGenerales.numeroDocumento}</div>
        </div>
        <div className={`${style.image} height-100 mb-2 ml-4`}>
          <Image src={datosGenerales.imagenFirma=="AA=="?imageFirm:`data:image/jpeg;base64,${datosGenerales.imagenFirma}`} width={100} alt="Firma" />
        </div>
      </div>
      <Col xs={24} xl={24}>
      <Row >

        <Col xs={24} xl={8}>
        <Card  style={{ height: "100%" }}>
          <h5 className="mb-2">
            <strong>Datos Personales</strong>
          </h5>
          <Row >
            <Col xs={24} xl={6} >
              <div className={style.item}>
              Estado Civil:&nbsp;
              </div>
             
            </Col>
            <Col xs={24} xl={18} >
              <strong>{datosGenerales.sexoCliente=="F"?"SOLTERA":datosGenerales.descripcionEstadoCivil}</strong>
            </Col>
          </Row>
          <Row >
            <Col xs={24} xl={6}  >
            <div className={style.item}>
            Sexo:&nbsp;
              </div>

            </Col>
            <Col xs={24} xl={18} >
              <strong>{datosGenerales.sexoCliente}</strong>
            </Col>
          </Row>
          <Row >
            <Col xs={24} xl={6} >
            <div className={style.item}>
            Fecha de Nac.:&nbsp;
              </div>
              
            </Col>
            <Col xs={24} xl={18} >
              <strong>{datosGenerales.fechaNacimientoCliente?format(new Date(datosGenerales.fechaNacimientoCliente), 'dd/MM/yyyy'):null}</strong>
            </Col>
          </Row>
          <Row >
            <Col xs={24} xl={6} >
            <div className={style.item}>
            Mail:&nbsp;
              </div>
              
            </Col>
            <Col xs={24} xl={18} >
              <strong>{datosGenerales.mailUsuario}</strong>
            </Col>
          </Row>
          <Row >
            <Col xs={24} xl={6} >
            <div className={style.item}>
            Teléfono:&nbsp;
              </div>
             
            </Col>
            <Col xs={24} xl={18} >
              <strong>{client.datosGenerales.caracteristicaTelefono}-{client.datosGenerales.numeroTelefono}</strong>
            </Col>
          </Row>
          </Card>
        </Col>

        <Col span={2}></Col>

        <Col xs={24} xl={8} >
        <Card  style={{ height: "100%" }}>
          <h5 className="mb-2">
            <strong>Domicilio</strong>
          </h5>
          <Row >
            <Col xs={24} xl={6} >
            <div className={style.item}>
            Dirección:&nbsp;
              </div>
              
            </Col>
            <Col xs={24} xl={18} >
              <strong>{datosGenerales.nombreDomicilio}</strong>
            </Col>
          </Row>
          <Row >
            <Col xs={24} xl={6} >
            <div className={style.item}>
            N° Domicilio:&nbsp;
              </div>
              
            </Col>
            <Col xs={24} xl={18} >
              <strong>{datosGenerales.numeroDomicilio}</strong>
            </Col>
          </Row>
          <Row >
            <Col xs={24} xl={6} >
            <div className={style.item}>
            Piso:&nbsp;
              </div>
              
            </Col>
            <Col xs={24} xl={18} >
              <strong>{datosGenerales.pisoDomicilio}</strong>
            </Col>
          </Row>
          <Row >
            <Col xs={24} xl={6} >
            <div className={style.item}>
            Departamento:&nbsp;
              </div>
              
            </Col>
            <Col xs={24} xl={18} >
              <strong>{datosGenerales.departamentoDomicilio}</strong>
            </Col>
          </Row>
          <Row >
            <Col xs={24} xl={6} >
            <div className={style.item}>
            Localidad:&nbsp;
              </div>
              
            </Col>
            <Col xs={24} xl={18} >
              <strong>{datosGenerales.codigoLocalidad}</strong>
            </Col>
          </Row>
          <Row >
            <Col xs={24} xl={6} >
            <div className={style.item}>
            Provincia:&nbsp;
              </div>
              
            </Col>
            <Col xs={24} xl={18} >
            <strong>{datosGenerales.descripcionProvincia}</strong>
            </Col>
          </Row>
          <Row >
            <Col xs={24} xl={6} >
            <div className={style.item}>
            Código Postal:&nbsp;
              </div>
              
            </Col>
            <Col xs={24} xl={18} >
              <strong>{datosGenerales.codigoPostalDomicilio}</strong>
            </Col>
          </Row>
          </Card>
        </Col>

      </Row>
      </Col>

      <Col xs={24} xl={24}>
      <Row  style={{ marginTop: 50, marginBottom: 50}}>

      <Col xs={24} xl={8}>
        <Card  style={{ height: "100%" }}>
          <h5 className="mb-2">
            <strong>Homebanking</strong>
          </h5>
          <Row >
            <Col xs={24} xl={6} >
              <div className={style.item}>
              Username:&nbsp;
              </div>
             
            </Col>
            <Col xs={24} xl={18} >
             <strong>{datosHB.userName}</strong>
            </Col>
          </Row>
          <Row >
            <Col xs={24} xl={6}  >
            <div className={style.item}>
            Fecha de Alta:&nbsp;
              </div>

            </Col>
            <Col xs={24} xl={18} >
            <strong>{datosHB.fechaUsuarioAlta?format(new Date(datosHB.fechaUsuarioAlta), 'dd/MM/yyyy'):null}</strong>
            </Col>
          </Row>
          <Row >
            <Col xs={24} xl={6} >
            <div className={style.item}>
            Email:&nbsp;
              </div>
              
            </Col>
            <Col xs={24} xl={18} >
            <strong>{datosHB.email}</strong>
            </Col>
          </Row>
          <Row >
            <Col xs={24} xl={6} >
            <div className={style.item}>
            Teléfono:&nbsp;
              </div>
              
            </Col>
            <Col xs={24} xl={18} >
            <strong>{datosHB.telefono}</strong>
            </Col>
          </Row>
          </Card>
        </Col>

        <Col span={2}></Col>

        <Col xs={24} xl={8}>
        <Card  style={{ height: "100%" }}>
          <h5 className="mb-2">
            <strong>Otros</strong>
          </h5>
          <Row >
            <Col xs={24} xl={6} >
              <div className={style.item}>
              Agente:&nbsp;
              </div>
             
            </Col>
            <Col xs={24} xl={18} >
              <strong>{datosOtros.descripcionTipoAgente}</strong>
            </Col>
          </Row>
          <Row >
            <Col xs={24} xl={6}  >
            <div className={style.item}>
              Situación:&nbsp;
              </div>

            </Col>
            <Col xs={24} xl={18} >
            <strong>{datosOtros.descripcionSituacion}</strong>
            </Col>
          </Row>
          <Row >
            <Col xs={24} xl={6} >
            <div className={style.item}>
            Oficial:&nbsp;
              </div>
              
            </Col>
            <Col xs={24} xl={18} >
            <strong>{datosOtros.descripcionUsuario}</strong>
            </Col>
          </Row>
          <Row >
            <Col xs={24} xl={6} >
            <div className={style.item}>
            Estado:&nbsp;
              </div>
              
            </Col>
            <Col xs={24} xl={18} >
            <strong>Bloqueado</strong>
            </Col>
          </Row>

          <Row >
            <Col xs={24} xl={12}>
            <div style={{textAlign: 'center'}}>
                <Popconfirm
                title="estas seguro?"
                onConfirm={sendmail}
                onCancel={cancel}
                okText="Si"
                cancelText="No"
                >
                <Button type="link" danger >
                  Blanquear
                </Button>
              </Popconfirm>
            </div>
            </Col>
          </Row>
          </Card>
        </Col>

        </Row>
      </Col>
  </div>  
  )
}

export default connect(mapStateToProps)(Profile)
