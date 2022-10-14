export const numberFormat = value =>
  new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(value)

export const numberFormatSM = number =>
  new Intl.NumberFormat('es-AR', {
    style: 'decimal',
    minimumFractionDigits: 2,
  }).format(number)
