import React,{useState, useEffect} from 'react';
import { connect } from 'react-redux'

const mapStateToProps = ({ dashboard, dispatch }) => ({
    dashboard,
    dispatch
    })   

const ApiTodoPago = ({ dashboard, dispatch}) => {

    const [flag, setflag] = useState(false)
    const [online, setOnline] = useState(false)

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

    useEffect(() => {
        if(flag){
            setOnline(dashboard.apiSMS.result)
        }
        
    }, [dashboard])

    
  return (
    <div className={`card border-0 ${online?'bg-success':'bg-danger'}  text-white`} >

      <div className="card-body">
        <div className="d-flex flex-wrap align-items-center">
          <i className="fe fe-server font-size-50 mr-3" />
          <div>
            <div className="font-size-21 font-weight-bold"> {online?"Online":"Offline"} </div>
            <div className="font-size-15"> Saldo: $ {dashboard.apiSMSSALDO} </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(ApiTodoPago)