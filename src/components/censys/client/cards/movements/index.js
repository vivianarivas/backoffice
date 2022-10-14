import React from 'react';
import ResumeHead from './head'
import ResumeDetail from './detail'
import { connect } from 'react-redux';
import style from '../../style.module.scss'
import ClientCollapse from '../../collapse'

const mapStateToProps = ({card, dispatch }) => ({
  card,
  dispatch
})

const MovementCard = ({card, dispatch }) => {

    return ( 
        <div>
            <div className="mb-3">
            <ClientCollapse/>
            </div>
            {(typeof card.TarjetaResumen.cabecera !='undefined')
              ?
              (<ResumeHead/>)
              :
              null
            }
            <ResumeDetail/>
        </div>
     );
}
 
export default connect(mapStateToProps)(MovementCard);