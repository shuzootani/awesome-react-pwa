export function formatPrice(price = 0, extras, number = false) {
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
  return `${(Number(total) / 100).toFixed(2).replace('.', ',')} € `
}
