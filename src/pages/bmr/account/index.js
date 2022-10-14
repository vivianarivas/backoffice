import React from 'react'
import { connect } from 'react-redux'
import { Helmet } from 'react-helmet'
import AccountDetail from '@/components/censys/account/account'
import FormAccount from '@/components/censys/account/form'
import TableMovement from '../../../components/censys/account/tableMovement'
// import TableMovement from '@/components/censys/account/TableMovement'

const mapStateToProps = ({ user, dispatch }) => ({
  user,
  dispatch,
})

const Account = ({ user, dispatch }) => {
  return (
    <div>
      <AccountDetail />
      <FormAccount />
      <div className="kit__utils__table">
        <TableMovement />
      </div>
    </div>
  )
}

export default connect(mapStateToProps)(Account)
