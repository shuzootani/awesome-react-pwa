import React, { useState, useRef, useContext } from 'react'
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
import { productCategories as productCategoriesQuery } from '../../../graphql/queries'
import { addToBasket as addToBasketMutation } from '../../../graphql/mutations'
import ProductItem from './ProductItem'
import { formatBasketItemInput } from '../../../utils/formatter'
import { PurchaseContext } from '../../../providers/PurchaseContextProvider'

function Menu({ storeId }) {
  const { basket, setBasket } = useContext(PurchaseContext)
  const [tabIndex, setTabIndex] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState()
  const sectionRefs = useRef([])
  const categoryRefs = useRef([])

  const [addToBasket] = useMutation(addToBasketMutation, {
    onCompleted({ addToBasket: basketData }) {
      setBasket(basketData)
    },
  })
  const { data } = useQuery(
    productCategoriesQuery,
    { variables: { id: storeId }, fetchPolicy: 'cache-and-network' }
  )

  const { productCategories } = data

  function onClickCategoryTab(index) {
    categoryRefs.current[index].scrollIntoView({
      inline: 'center',
      block: 'nearest',
    })
    sectionRefs.current[index].scrollIntoView({ behavior: 'smooth' })
    setTabIndex(index)
  }

  function handleAddToBasket(values) {
    const product = formatBasketItemInput({ ...values, storeId })
    addToBasket({ variables: { id: basket.id, product } })
  }

  return (
    <MenuContainer>
      <ProductCategoryTabs>
        {productCategories
          && productCategories.map((category, index) => (
            <Tab
              key={category.name}
              ref={(ref) => {
                categoryRefs.current[index] = ref
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
                  sectionRefs.current[index] = ref
                }}
              >
                <CategoryIcon src={category.icon} />
                <CategoryLabel>{category.name}</CategoryLabel>
              </CategoryLabelContainer>
              {category.products.map((product) => {
                if (!product.id) return null
                return (
                  <ProductItem
                    key={product.id}
                    storeId={storeId}
                    product={product}
                    selectedProduct={selectedProduct}
                    onClick={setSelectedProduct}
                    addToBasket={handleAddToBasket}
                  />
                )
              })}
            </React.Fragment>
          ))}
      </ProductList>
    </MenuContainer>
  )
}

Menu.propTypes = {
  storeId: PropTypes.string.isRequired,
}

export default Menu
