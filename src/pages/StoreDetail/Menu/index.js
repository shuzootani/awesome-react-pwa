import React, { useState, useRef } from 'react'
import PropTypes from 'prop-types'
import { useMutation, useQuery } from '@apollo/react-hooks'
import {
  MenuContainer,
  ProductCategoryTabs,
  Tab,
  ProductList,
  CategoryLabelContainer,
  CategoryIcon,
  CategoryLabel,
} from './styled'
import { productCategories as productCategoriesQuery, basketQuery } from '../../../graphql/queries'
import { addToBasket as addToBasketMutation } from '../../../graphql/mutations'
import ProductItem from './ProductItem'
import { formatBasketItemInput } from '../../../utils/formatter'

function Menu({ storeId, basket }) {
  const [tabIndex, setTabIndex] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState()
  const sectionRefs = useRef([]).current
  const categoryRefs = useRef([]).current

  const { data: { productCategories } } = useQuery(productCategoriesQuery, { variables: { id: storeId } })

  const [addToBasket] = useMutation(addToBasketMutation, {
    update(cache, { data: { addToBasket: basketData } }) {
      localStorage.setItem('basketId', basketData.id)
      const updated = cache.readQuery({ query: basketQuery, data: basketData, variables: { id: basketData.id } })
      cache.writeQuery({ query: basketQuery, data: updated, variables: { id: basketData.id } })
      return basketData
    },
  })

  function onClickCategoryTab(index) {
    categoryRefs[index].scrollIntoView({
      inline: 'center',
      block: 'nearest',
    })
    sectionRefs[index].scrollIntoView({ behavior: 'smooth' })
    setTabIndex(index)
  }

  function handleAddToBasket(values) {
    const product = formatBasketItemInput({ ...values, storeId })
    const optimisticItem = {
      ...product,
      id: 'optimistic_basket_item',
      quantity: 1,
      extras: [],
      variants: null,
      variant_id: 'optimistic_variant',
      __typename: 'BasketItem',
    }
    addToBasket({
      variables: { id: basket ? basket.id : null, product },
      optimisticResponse: {
        addToBasket: {
          id: basket ? basket.id : 'optimistic-basket',
          user_id: null,
          store_id: storeId,
          total: 0,
          items: basket ? [...basket.items, optimisticItem] : [optimisticItem],
          __typename: 'Basket',
        },
      },
    })
  }

  return (
    <MenuContainer>
      <ProductCategoryTabs>
        {productCategories
          && productCategories.map((category, index) => (
            <Tab
              key={category.name}
              ref={(ref) => {
                categoryRefs[index] = ref
              }}
              active={tabIndex === index}
              onClick={() => onClickCategoryTab(index)}
            >
              {category.name}
            </Tab>
          ))}
      </ProductCategoryTabs>

      <ProductList>
        {productCategories
          && productCategories.map((category, index) => (
            <React.Fragment key={category.name}>
              <CategoryLabelContainer
                ref={(ref) => {
                  sectionRefs[index] = ref
                }}
              >
                <CategoryIcon src={category.icon} alt="" noPlaceholder />
                <CategoryLabel>{category.name}</CategoryLabel>
              </CategoryLabelContainer>
              {category.products.map(product => (
                <ProductItem
                  key={product.id}
                  storeId={storeId}
                  product={product}
                  selectedProduct={selectedProduct}
                  onClick={setSelectedProduct}
                  addToBasket={handleAddToBasket}
                />
              ))}
            </React.Fragment>
          ))}
      </ProductList>
    </MenuContainer>
  )
}

Menu.propTypes = {
  storeId: PropTypes.string.isRequired,
  basket: PropTypes.object,
}

Menu.defaultProps = {
  basket: null,
}

export default Menu
