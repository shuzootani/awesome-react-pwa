import React, { useState, useRef, useContext } from 'react'
import PropTypes from 'prop-types'
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
import {
  MenuContainer,
  ProductCategoryTabs,
  Tab,
  ProductList,
  CategoryLabelContainer,
  CategoryIcon,
  CategoryLabel,
  FooterButtonContainer,
} from './styled'
import { productCategories as productCategoriesQuery } from '../../../graphql/queries'
import { formatPrice } from '../../../utils/formatter'
import FooterButton from '../../../components/FooterButton'
import { BasketContext } from '../../../providers/BasketContextProvider'
import ProductItem from './ProductItem'

function Menu({ storeId, history }) {
  const [tabIndex, setTabIndex] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState()
  const sectionRefs = useRef([])
  const categoryRefs = useRef([])

  const {
    addProduct, amount, total,
  } = useContext(BasketContext)

  function onClickCategoryTab(index) {
    categoryRefs.current[index].scrollIntoView({
      inline: 'center',
      block: 'nearest',
    })
    sectionRefs.current[index].scrollIntoView({ behavior: 'smooth' })
    setTabIndex(index)
  }

  return (
    <Query
      query={productCategoriesQuery}
      variables={{ id: storeId }}
      fetchPolicy="cache-and-network"
    >
      {({ data }) => {
        // console.log({ products: data })
        // console.warn({ error })
        const { productCategories } = data && data
        return (
          <MenuContainer>
            <ProductCategoryTabs>
              {productCategories
                && productCategories.map((category, index) => (
                  <Tab
                    key={category.name}
                    ref={(ref) => { (categoryRefs.current[index] = ref) }}
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
                      ref={(ref) => { (sectionRefs.current[index] = ref) }}
                    >
                      <CategoryIcon src={category.icon} />
                      <CategoryLabel>{category.name}</CategoryLabel>
                    </CategoryLabelContainer>
                    {category.products.map(product => (
                      <ProductItem
                        key={product.id}
                        storeId={storeId}
                        product={product}
                        selectedProduct={selectedProduct}
                        onClick={setSelectedProduct}
                        addToBasket={addProduct}
                      />
                    ))}
                  </React.Fragment>
                ))}
            </ProductList>

            {amount > 0 && (
              <FooterButton onClick={() => history.push('/checkout')}>
                <FooterButtonContainer>
                  <div>{amount}</div>
                  <div>ZUM WARENKORB</div>
                  <div>{formatPrice(total)}</div>
                </FooterButtonContainer>
              </FooterButton>
            )}
          </MenuContainer>
        )
      }}
    </Query>
  )
}

Menu.propTypes = {
  history: PropTypes.object.isRequired,
  storeId: PropTypes.string.isRequired,
}

export default withRouter(Menu)
