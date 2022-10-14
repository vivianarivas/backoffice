import React, { useState,useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { connect } from 'react-redux'
import { Modal,Button } from 'antd'
import  TableNotification  from '@/components/censys/notification/table'
import  FormNotification  from '@/components/censys/notification/form'
import { PlusCircleFilled } from '@ant-design/icons';
import FormClient from '@/components/censys/client/form'

const mapStateToProps = ({ notification, dispatch }) => ({
    notification,
    dispatch
  })
  

const Notification = ({ notification, dispatch }) => {


const [isModalVisible, setIsModalVisible] = useState(false);
const [flag, setFlag] = useState(false);

const showModal = () => {
  setIsModalVisible(true);
};

const handleOk = () => {
  setIsModalVisible(false);
};

const handleCancel = () => {
  setIsModalVisible(false);
};

const handle=(params)=>{
  dispatch({
    type: 'notification/CONSULTAR_NOTIFICACION',
    payload: params,
  })
  setFlag(true)
}


return (
  <div>
    <Helmet title="Notificación" />
    <div className="cui__utils__heading">
            <strong>Notificaciones</strong>
        </div>
    <div className="card col-lg-12">
      <div className="card-body">
      <FormClient handle={handle}/>
      {flag?
      (<div>  
        <Button type="primary" className="float-right" style={{ marginBottom: '16px' }} icon={<PlusCircleFilled />}  size="large" shape="round" onClick={showModal}>Agregar</Button>
        <TableNotification />
      </div>)
      :
      null
      }
      </div>
    </div>

    <Modal title="Notificación" visible={isModalVisible}  onCancel={handleCancel} width={1000} footer={null}>
        <FormNotification setIsModalVisible={setIsModalVisible}/>
    </Modal>
  </div>
  )
}

export default connect(mapStateToProps)(Notification)