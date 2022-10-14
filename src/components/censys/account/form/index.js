import React,{useState} from 'react'
import { connect } from 'react-redux'
import {  DatePicker, Form,Select,Button} from 'antd'
import moment from 'moment';

const { RangePicker } = DatePicker;
const {Option}=Select;

const mapStateToProps = ({ client, dispatch }) => ({
  client,
  dispatch
})

const FormAccount = ({ client,dispatch }) => {

    const [formMovimiento] = Form.useForm()

    const onChanceSelect = (value) =>{
      setFlag(false)
      var i=''
      var f=''
      switch(value){
        case 0:
          getMoviment()
        break 
        case 1:
          i=moment().format("YYYY/MM/DD");
          f=moment().format("YYYY/MM/DD");
          handleFilter(i,f)
        break 
        case 7:
          i=moment().subtract(7, 'days').format("YYYY/MM/DD");
          f=moment().format("YYYY/MM/DD");
          handleFilter(i,f)
        break 
        case 30:
          i=moment().subtract(1, 'months').format("YYYY/MM/DD");
          f=moment().format("YYYY/MM/DD");
          handleFilter(i,f)
        break 
        case 60:
          i=moment().subtract(2, 'months').format("YYYY/MM/DD");
          f=moment().format("YYYY/MM/DD");
          handleFilter(i,f)
        break 
        case 'ba':
          setFlag(true)
        break 
        default:
      }
    }

    const handleFilter = (fechaInicio,fechaFin) => {
        console.log(fechaInicio)
        console.log(fechaFin)
        const {tipoDocumento,numeroDocumento,codigoCuenta,sintetico,codigoMonedaDesc}=client.cuentaSeleccionada
        const codigoSistema=(sintetico=="ca"?5:3)
        const codigoMoneda=(codigoMonedaDesc=="u$s"?2:0)
        let params = {
          tipoDocumento,
          numeroDocumento,
          codigoCuenta,
          fechaInicio,
          fechaFin,
          codigoSistema,
          codigoMoneda
        }
        dispatch({
          type: 'client/CUENTA_ULTIMOS_MOVIMIENTOS_ENTRE_FECHAS',
          payload: params,
        })
      }

    const  handleReset= () => {
      //setFlag(false)
      //formMovimiento.setFieldsValue({ filter: 0 });
      clearRange()
      getMoviment()
    }

    const getMoviment =()=>{
      const {tipoDocumento,numeroDocumento,codigoCuenta,codigoSistema,codigoMoneda}=client.cuentaSeleccionada
        
      let params = {
        tipoDocumento,
        numeroDocumento,
        codigoCuenta,
        codigoSistema,
        codigoMoneda
      }
      console.log(params)
      dispatch({
        type: 'client/CUENTA_ULTIMOS_MOVIMIENTOS',
        payload: params,
      })
    }

    const dateFormatShow = 'DD/MM/YYYY'
    
    const [flag,setFlag]=useState(false)

    const [disableDateEnd,setDisableDateEnd]=useState(true)
    const [dateInit,setDateInit]=useState()

    const onChangeRangePickerInit=(date, dateString) =>{
      if(date){
      setDateInit(date.format('YYYY/MM/DD'))
      setDisableDateEnd(false)
      }
      else{
        clearRange()
      }
    }

    const onChangeRangePickerEnd=(value) =>{
      const {rangePickerInit,rangePickerEnd}=formMovimiento.getFieldsValue()
      if((rangePickerInit!==null,rangePickerEnd!==null))
      handleFilter(rangePickerInit.format('YYYY/MM/DD'),rangePickerEnd.format('YYYY/MM/DD'))
      else {
        clearRange()
      }
    }

    const clearRange=()=>{
      formMovimiento.setFieldsValue({rangePickerInit:''})
      formMovimiento.setFieldsValue({rangePickerEnd:''})
      setDisableDateEnd(true)
      setDateInit(null)
      //handleReset()
    }

    const disabledSubmissionDateInit = (current) => {
      return ( current  && (current > moment().endOf('day')||current < moment().subtract(2, "years")));
    }

    const disabledSubmissionDateEnd = (submissionValue) => {
      return (submissionValue > moment(dateInit).add(60, 'days') ||submissionValue < moment(dateInit) || submissionValue > moment().endOf('day'));
    }


    return (
        <div className="m-3">
            <h5 className="mb-4">
                <strong>Buscar Movimiento</strong>
            </h5>
                <Form layout="inline" form={formMovimiento} onFinish={handleReset} initialValues={{ filter: 0}}>
                    <Form.Item id="filter" name="filter" className="mb-1 mt-1" >
                        <Select  placeholder="Movimientos" onChange={onChanceSelect}>
                            <Option value={0}>Todos los Movimientos</Option>
                            <Option value={1}>Movimientos del día</Option>
                            <Option value={7}>Mov. últimos 7 días</Option>
                            <Option value={30}>Mov. últimos 30 días</Option>
                            <Option value={60}>Mov. últimos 60 días</Option>
                            <Option value="ba">Busqueda Avanzada</Option>
                        </Select>
                    </Form.Item>
                {flag?
                  <div className="row m-1">
                    <Form.Item id="rangePickerInit" name="rangePickerInit"  >
                      <DatePicker 
                          onChange={onChangeRangePickerInit}
                          disabledDate={disabledSubmissionDateInit}
                          format={dateFormatShow}
                      />
                    </Form.Item>
                    <Form.Item id="rangePickerEnd" name="rangePickerEnd"  >
                      <DatePicker 
                          disabled={disableDateEnd}
                          onChange={onChangeRangePickerEnd}
                          disabledDate={disabledSubmissionDateEnd}
                          format={dateFormatShow}
                          
                      />
                    </Form.Item>
                  </div>
                :
                  null
                }
                  <Form.Item >
                    <Button type="primary" htmlType="submit" className="mb-1 mt-1" >Resetear</Button>
                  </Form.Item>
                </Form>
            
        </div>
  )
}
export default connect(mapStateToProps)(FormAccount)