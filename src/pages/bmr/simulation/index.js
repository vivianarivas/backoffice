import React from 'react'
import { Helmet } from 'react-helmet'
import SolicitudCredito from '@/components/censys/simulation/credit'
import SolicitudPlazoFijo from '@/components/censys/simulation/plazoFijo'

const Simulation = () => {

return (
  <div>
    <Helmet title="Notificación" />
    <div className="cui__utils__heading">
            <strong>Simulaciones</strong>
        </div>
    <div className="card col-lg-12">
      <div className="card-body">
      <SolicitudCredito />
      {/*<SolicitudPlazoFijo/>*/}
      </div>
    </div>

  </div>
  )
}

export default Simulation