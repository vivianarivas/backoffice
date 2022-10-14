import React,{useState,useEffect} from 'react';
import ChartistGraph from 'react-chartist'
import ChartistTooltip from 'chartist-plugin-tooltips-updated'
import { Table } from 'antd'
import { connect } from 'react-redux'
import { supportCasesTableData,supportCasesPieData,} from './data.json'
import styles from './style.module.scss'

const supportCasesTableColumns = [
  {
    title: 'Type',
    dataIndex: 'type',
    key: 'type',
  },
  {
    title: 'Amount',
    key: 'amount',
    dataIndex: 'amount',
    render: (amount) => {
      return <span className="font-weight-bold">{amount}</span>
    },
  },
]

const supportCasesPieOptions = {
  donut: true,
  donutWidth: 35,
  showLabel: false,
  plugins: [
    ChartistTooltip({
      anchorToPoint: false,
      appendToBody: true,
      seriesName: false,
    }),
  ],
}

const mapStateToProps = ({ dashboard, dispatch }) => ({
  dashboard,
  dispatch
})  

const User = ({ dashboard, dispatch}) => {

    return ( 
            <div>
              <div className="card-header">
                <div className="cui__utils__heading mb-0">
                  <strong>Estados de Servidores</strong>
                </div>
              </div>
              <div className="row">
                <div className="col-xl-6">
                  <div className="mb-3">
                    <Table
                      dataSource={supportCasesTableData}
                      columns={supportCasesTableColumns}
                      pagination={false}
                    />
                  </div>
                </div>
                <div className="col-xl-6">
                  <div className={`h-100 d-flex flex-column justify-content-center align-items-center ${styles.chartPieExample}`}>
                    <div className="mb-4">
                      <ChartistGraph
                        data={supportCasesPieData}
                        type="Pie"
                        options={supportCasesPieOptions}
                      />
                    </div>
                    <div className="text-center mb-4">
                      <span className="mr-2">
                        <span className="kit__utils__donut kit__utils__donut--primary" />
                        Web App
                      </span>
                      <span className="mr-2">
                        <span className="kit__utils__donut kit__utils__donut--success" />
                        App Android
                      </span>
                      <span className="mr-2">
                        <span className="kit__utils__donut kit__utils__donut--warning" />
                        App Apple
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
     );
}
 
export default connect(mapStateToProps)(User);