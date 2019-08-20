import moment from 'moment'
import { dayOfWeek } from './time'
moment.locale('de')

export function formatPrice(price = 0, extras, number = false, handleSign = false) {
  let total = price
  if (extras) {
    extras.forEach((extra) => {
      if (extra.is_selected) {
        total += extra.price
      }
    })
  }
  if (number) {
    return total
  }

  const isNegative = Math.sign(total) === -1

  const formattedTotal = `${(Number(Math.abs(total)) / 100)
    .toFixed(2)
    .replace('.', ',')} €`

  if (handleSign) {
    return `${isNegative ? '- ' : '+'} ${formattedTotal}`
  }

  return formattedTotal
}

export function formatDate(isoDate) {
  return moment(isoDate).format('DD MMM YYYY')
}

export function fortmatShortDate(isoDate) {
  return moment(isoDate).format('DD.MM.YYYY')
}

export function formatDiscount(discount) {
  return `${discount / 10} %`
}

export function formatDateSmall(isoDate, labeled, withWeekday) {
  const date = moment(isoDate)
  if (labeled) {
    const weekday = withWeekday ? `${dayOfWeek[date.isoWeekday()]} ` : ''
    return `${weekday}${date.format('DD.MM.')}`
  }
  return date.format('DD.MM.')
}

export function formatTime(isoDate) {
  if (isoDate.format === 'minutes') {
    return isoDate.label
  } if (isoDate.format) {
    return `${isoDate.label}`
  }
  return `${moment(isoDate).format('HH:mm')}`
}

export const calcDiscount = (total, discount = 0) => (total * discount) / 1000

export const calcTotal = (total, discount = 0, fee = 0, blockCampaigns = false) => {
  if (blockCampaigns) {
    return Math.round(total + fee)
  }
  return Math.round((total + fee) - calcDiscount(total, discount))
}

export const centsToEuros = priceInCents => priceInCents / 100


export function formatShortTime(isoDate) {
  if (isoDate.format === 'minutes') {
    return isoDate.label
  } if (isoDate.format) {
    return `${isoDate.label}`
  }
  return `${moment(isoDate).format('HH:mm')}`
}

export function formatBasketItemInput(values) {
  return {
    store_id: values.storeId,
    product_id: values.id,
    name: values.name,
    price: values.price,
    image: values.image,
    teaser_text: values.teaser_text,
    variant_id: values.variant_id,
    variants: values.variants && values.variants.map(variant => ({
      variant_id: variant.variant_id,
      is_default: variant.is_default,
      name: variant.name,
      price: variant.price,
      image: variant.image,
    })),
    extras: values.extras && values.extras.map(extra => ({
      extra_id: extra.extra_id,
      is_selected: extra.is_selected,
      name: extra.name,
      price: extra.price,
    })),
    comment: values.comment || null,
    is_promo: !!values.is_promo,
    quantity: values.quantity,
  }
}
