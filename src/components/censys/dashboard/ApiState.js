import React,{useState, useEffect} from 'react';

const ApiState = ({api}) => {

    const [apistate,setApistate]= useState({})

    useEffect(() => {
        setApistate(api)
    }, [])

    const {name,state}=apistate
    

  return (
    <div className={`card border-0 ${state=="Success"?'bg-success':'bg-danger'}  text-white`}>

      <div className="card-body">
        <div className="d-flex flex-wrap align-items-center">
          <i className="fe fe-server font-size-50 mr-3" />
          <div>
            <div className="font-size-21 font-weight-bold">{name}</div>
            <div className="font-size-15">{state}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ApiState
