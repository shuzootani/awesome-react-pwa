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

  const formattedTotal = `${(Number(Math.abs(total)) / 100)
    .toFixed(2)
    .replace('.', ',')} €`

  const isNegative = Math.sign(total) === -1
  if (handleSign) {
    return `${isNegative ? '- ' : '+'} ${formattedTotal}`
  }

  return formattedTotal
}
