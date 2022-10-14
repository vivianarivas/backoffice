import React from 'react'
import { connect } from 'react-redux'
import Detail from '@/components/censys/movement/'

const mapStateToProps = ({ user }) => ({
  user
})

const MovementDetail = () => {
  return (
    <div className="col-lg-12">
    <div className="card col-lg-12">
      <div className="card-body">
        <Detail />
    </div>
    </div>
    </div>
  )
}

export default connect(mapStateToProps)(MovementDetail)
