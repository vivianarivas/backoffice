import React from 'react';
import {  Button,notification } from 'antd';
import { handleSend } from '@/services/onesignal'

const Test = () => {
    const handle=()=>{
        handleSend("Promoción!!!","Super Préstamo a tasa fija!!!!")
        notification.success({
            message: 'Notificación',
            description: 'Enviada exitosamente',
          })
    }
    return ( 
        <Button type="primary" onClick={handle}>Notificación</Button>
     );
}
 
export default Test;