import React, { useState } from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import FormClient from '@/components/censys/client/form/formClient'
import Client from '@/components/censys/client/'
// import TableClients from '@/components/censys/client/TableClients'
import { Modal, Button } from 'antd'
import TableClients from '../../../components/censys/client/tableClients'

const mapStateToProps = ({ client, card, dispatch }) => ({
  client,
  card,
  dispatch,
})

const Clients = ({ client, card, dispatch }) => {
  /*const handle=(params)=>{

    dispatch({
      type: 'client/LIMPIAR_DATOS_GENERALES',
    })
    dispatch({
      type: 'card/LIMPIAR_DATOS_TARJETAS'
    })
  
    dispatch({
      type: 'client/RECUPERAR_CLIENTES_DATOS_GENERALES_BO',
      payload: params,
    })
  
    dispatch({
      type: 'card/LOGIN'
    })
  }*/

  const [isModalVisible, setIsModalVisible] = useState(false)

  const showModal = () => {
    setIsModalVisible(true)
  }

  const handleCancel = () => {
    dispatch({
      type: 'client/SET_STATE',
      payload: { clientes: [] },
    })
    setIsModalVisible(false)
  }

  const handle = params => {
    console.log('handle')

    if (params.tipo === 'Email') {
      dispatch({
        type: 'client/CONSULTA_BUSCAR_CLIENTE_EMAIL',
        payload: params,
      })
    }
    if (params.tipo === 'Telefono') {
      dispatch({
        type: 'client/CONSULTA_BUSCAR_CLIENTE_TELEFONO',
        payload: params,
      })
    }
    if (params.tipo !== 'Telefono' && params.tipo !== 'Email') {
      dispatch({
        type: 'client/CONSULTA_BUSCAR_CLIENTE',
        payload: params,
      })
    }

    showModal()
  }

  const handleClient = params => {
    setIsModalVisible(false)

    dispatch({
      type: 'client/LIMPIAR_DATOS_GENERALES',
    })
    dispatch({
      type: 'card/LIMPIAR_DATOS_TARJETAS',
    })

    dispatch({
      type: 'client/SET_STATE',
      payload: { clientes: [] },
    })

    dispatch({
      type: 'client/RECUPERAR_CLIENTES_DATOS_GENERALES_BO',
      payload: params,
    })

    if (params.numeroDocumento == 29323078) {
      dispatch({
        type: 'card/LOGIN',
      })
    }
  }

  return (
    <div>
      <Helmet title="Clientes" />
      <div className="cui__utils__heading">
        <strong>Clientes</strong>
      </div>
      <div className="col-lg-12">
        <div className="card col-lg-12">
          <div className="card-body">
            <ul className="list-group list-group-flush">
              <li className="list-group-item">
                <FormClient handle={handle} />
              </li>
            </ul>
            {typeof client.datosGenerales.numeroDocumento != 'undefined' ? (
              <div>
                <Client />
              </div>
            ) : null}
          </div>
        </div>
      </div>
      <Modal
        title="Clientes"
        visible={isModalVisible}
        onCancel={handleCancel}
        width={1000}
        footer={[
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <TableClients handleClient={handleClient} />
      </Modal>
    </div>
  )
}

export default connect(mapStateToProps)(Clients)
