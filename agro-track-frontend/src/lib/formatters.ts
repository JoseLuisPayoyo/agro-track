import { format } from 'date-fns'
import { es } from 'date-fns/locale'


export const fDate = (d?: string | Date | null, fmt = 'dd/MM/yyyy') =>
d ? format(typeof d === 'string' ? new Date(d) : d, fmt, { locale: es }) : ''