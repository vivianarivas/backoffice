import React from 'react'
import { Helmet } from 'react-helmet'
import DashboardMain from '../../../components/censys/dashboard'
// import DashboardMain from '@/components/censys/dashboard'

const Dashboard = () => {
  return (
    <div>
      <Helmet title="Dashboard" />
      <div className="cui__utils__heading">
        <strong>Dashboard</strong>
      </div>
      <div className="card col-lg-12">
        <div className="card-body">
          <DashboardMain />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
