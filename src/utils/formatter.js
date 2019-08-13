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
  }
}
