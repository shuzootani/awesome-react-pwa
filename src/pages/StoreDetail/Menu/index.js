import React, { useState, useRef, useContext } from 'react'
import { withRouter } from 'react-router-dom'
import { Query } from 'react-apollo'
import {
  StoreImageContainer,
  StoreImage,
  ProductCategoryTabs,
  Tab,
  ProductList,
  ProductItem,
  ProductImageContainer,
  ProductImage,
  ProductInfo,
  ProductName,
  ProductDescription,
  ProductItemContainer,
  CategoryLabelContainer,
  CategoryIcon,
  CategoryLabel,
  ProductPrice,
  ProductOrderSheet,
  ProductSheetImage,
  SheetImageContainer,
  ImageContainer,
  ProductSheetInfoContainer,
  SheetProductName,
  AddProductButton,
  BottomSheetButton,
  CounterButton,
  SheetProductDescription,
  ProductInfoContainer
} from './Components'
import { productCategories as productCategoriesQuery } from '../../../graphql/queries'
import { formatPrice } from '../../../utils/formatter'
import BottomSheet from '../../../components/BottomSheet'
import FooterButton from '../../../components/FooterButton'
import { BasketContext } from '../../../providers/BasketContextProvider'

function Menu ({ storeId, history }) {
  const [tabIndex, setTabIndex] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState()
  const [productCount, setProductCount] = useState(1)
  const sectionRefs = useRef([])
  const categoryRefs = useRef([])

  const { addProduct, basket, amount, total } = useContext(BasketContext)

  function onClickCategoryTab (index) {
    categoryRefs.current[index].scrollIntoView({
      inline: 'center',
      block: 'nearest'
    })
    sectionRefs.current[index].scrollIntoView({ behavior: 'smooth' })
    setTabIndex(index)
  }

  function decrement () {
    if (productCount === 1) return false
    setProductCount(count => count - 1)
  }

  function increment () {
    setProductCount(count => count + 1)
  }

  return (
    <Query
      query={productCategoriesQuery}
      variables={{ id: storeId }}
      fetchPolicy={'cache-and-network'}
    >
      {({ data, loading, error }) => {
        // console.log({ products: data })
        // console.warn({ error })
        const { productCategories } = data && data
        return (
          <React.Fragment>
            <ProductCategoryTabs>
              {productCategories &&
                productCategories.map((category, index) => (
                  <Tab
                    key={category.name}
                    ref={ref => (categoryRefs.current[index] = ref)}
                    active={tabIndex === index}
                    onClick={() => onClickCategoryTab(index)}
                  >
                    {category.name}
                  </Tab>
                ))}
            </ProductCategoryTabs>
            <ProductList>
              {productCategories &&
                productCategories.map((category, index) => (
                  <React.Fragment key={category.name}>
                    <CategoryLabelContainer
                      ref={ref => (sectionRefs.current[index] = ref)}
                    >
                      <CategoryIcon src={category.icon} />
                      <CategoryLabel>{category.name}</CategoryLabel>
                    </CategoryLabelContainer>
                    {category.products.map(product => (
                      <ProductItemContainer
                        key={product.id}
                        onClick={() => setSelectedProduct(product)}
                      >
                        <ProductItem>
                          <ProductImageContainer>
                            <ProductImage src={product.image} />
                          </ProductImageContainer>
                          <ProductInfoContainer>
                            <ProductInfo>
                              <ProductName>{product.name}</ProductName>
                              <ProductDescription>
                                {product.teaser_text}
                              </ProductDescription>
                            </ProductInfo>
                            <ProductPrice
                              discounted={
                                !!product.old_price || product.is_promo
                              }
                            >
                              {formatPrice(product.price)}
                            </ProductPrice>
                          </ProductInfoContainer>
                        </ProductItem>
                      </ProductItemContainer>
                    ))}
                  </React.Fragment>
                ))}
            </ProductList>
            {amount > 0 && (
              <FooterButton onClick={() => history.push('/checkout')}>
                <span>{amount}</span>
                <span>ZUM WARENKORB</span>
                <span>{formatPrice(total)}</span>
              </FooterButton>
            )}

            {selectedProduct && (
              <BottomSheet onClose={() => setSelectedProduct(null)}>
                <ProductOrderSheet>
                  <SheetImageContainer>
                    <ImageContainer>
                      <ProductSheetImage src={selectedProduct.image} />
                    </ImageContainer>
                  </SheetImageContainer>
                  <ProductSheetInfoContainer>
                    <SheetProductName>{selectedProduct.name}</SheetProductName>
                    <SheetProductDescription>
                      {selectedProduct.teaser_text_long}
                    </SheetProductDescription>
                  </ProductSheetInfoContainer>
                  <BottomSheetButton>
                    <CounterButton onClick={decrement}>-</CounterButton>
                    <AddProductButton
                      onClick={() => {
                        addProduct(selectedProduct, productCount)
                        setSelectedProduct(null)
                        setProductCount(1)
                      }}
                    >
                      IN DEN WARENKORB（{productCount}）
                    </AddProductButton>
                    <CounterButton onClick={increment}>+</CounterButton>
                  </BottomSheetButton>
                </ProductOrderSheet>
              </BottomSheet>
            )}
          </React.Fragment>
        )
      }}
    </Query>
  )
}

export default withRouter(Menu)
