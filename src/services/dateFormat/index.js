import { format, formatDistance, subDays } from 'date-fns'
import { es } from 'date-fns/locale'

export const obtenerFechaHora = fecha => {
  return fecha ? format(new Date(fecha), 'dd/MM/yyyy kk:mm') + ' ' + 'hs' : ''
}
export const obtenerFecha = fecha => {
  return fecha ? format(new Date(fecha), 'dd/MM/yyyy') : ''
}