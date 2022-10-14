import React,{useState,useEffect} from 'react'
import { connect } from 'react-redux'
import ApiState from './ApiState'
import ApiTodoPago from './apiTodoPago'

const apiWeb={
    name:"HomeBanking",
    state:"Success"
  }
  const apiApp={
    name:"Api",
    state:"Fallen"
  }
  const apiSms={
    name:"SMS",
    state:"Success"
  }
  
const mapStateToProps = ({ dashboard, dispatch }) => ({
dashboard,
dispatch
})    

const ServerState = ({ dashboard, dispatch}) => {

const [flag, setflag] = useState(false)

useEffect(() => {
    const recuperarApiSMS=()=>{
        dispatch({
        type: 'dashboard/CONSULTA_API_PAGA_DE_TODO'
        })

        dispatch({
        type: 'dashboard/ACCESS_TOKEN'
        })
    }
    if(!flag){
        recuperarApiSMS()
        setflag(true)
    }
    
}, [])

return ( 
    <div>
        <div className="card-header">
            <div className="cui__utils__heading mb-0">
            <strong>Estados de Servidores</strong>
            </div>
        </div>
        <div className="row">
            <div className="col-lg-6 mb-2">
            <ApiState api={apiWeb} />
            </div>
            <div className="col-lg-6 mb-2">
            <ApiState api={apiApp} />
            </div>
            <div className="col-lg-6 mb-2">
            <ApiTodoPago />
            </div>
        </div>
    </div>
);
}
 
export default connect(mapStateToProps)(ServerState);