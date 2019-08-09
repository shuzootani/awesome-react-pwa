import React, { useState } from 'react'
import styled from 'styled-components'
import { formatPrice } from '../../../../utils/formatter'
import {
	ProductItemContainer,
	ProductItem,
	ProductImageContainer,
	ProductImage,
	ProductInfoContainer,
	ProductInfo,
	ProductName,
	ProductDescription,
	ProductPrice,
} from './styled'
import ProductOrderSheet from './ProductOrderSheet'
import Space from '../../../../utils/space'
import Color from '../../../../utils/color'

function ProductListItem({ onClick, product, addToBasket }) {
	const [open, setOpen] = useState(false)
	const [quantity, setQuantity] = useState(1)

	function handleClick() {
		setOpen(prevOpen => !prevOpen)
	}

	function add(basketItem) {
    addToBasket(basketItem, quantity)
    setOpen(false)
	}

	return (
		<React.Fragment>
			<ProductItemContainer key={product.id} onClick={handleClick}>
				<ProductItem>
					<ProductImageContainer>
						<ProductImage src={product.image} />
					</ProductImageContainer>
					<ProductInfoContainer>
						<ProductInfo>
							<ProductName>{product.name}</ProductName>
							<ProductDescription>{product.teaser_text}</ProductDescription>
						</ProductInfo>
						<ProductPrice discounted={!!product.old_price || product.is_promo}>
							{formatPrice(product.price)}
						</ProductPrice>
					</ProductInfoContainer>
				</ProductItem>
			</ProductItemContainer>
			{/* Drawer */}
			{open && <ProductOrderSheet product={product} addToBasket={add} />}
		</React.Fragment>
	)
}

export default ProductListItem
