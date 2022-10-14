import React from 'react';
import ServerState from './serverstate';
import User from './user';

const DashboardMain = () => {
    return ( 
        <div className="row">
            <div className="col-lg-12">
                <div className="card">
                    <div className="card-body">
                        <div className="row">
                            <div className="col-lg-6">
                            <User/>
                            </div>
                            <div className="col-lg-6">
                            <ServerState/>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
     );
}
 
export default DashboardMain;