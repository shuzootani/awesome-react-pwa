import React, { useState, useRef } from 'react'
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
  SheetProductDescription
} from './Components'
import { productCategories as productCategoriesQuery } from '../../../graphql/queries'
import { formatPrice } from '../../../utils/formatter'
import BottomSheet from '../../../components/BottomSheet'

function Menu ({ storeId }) {
  const [tabIndex, setTabIndex] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState()
  const sectionRefs = useRef([])
  const categoryRefs = useRef([])

  function onClickCategoryTab (index) {
    categoryRefs.current[index].scrollIntoView({ inline: 'start' })
    sectionRefs.current[index].scrollIntoView({ behavior: 'smooth' })
    setTabIndex(index)
  }

  return (
    <Query
      query={productCategoriesQuery}
      variables={{ id: storeId }}
      fetchPolicy={'cache-and-network'}
    >
      {({ data, loading, error }) => {
        console.log({ products: data })
        console.warn({ error })
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
                          <ProductInfo>
                            <ProductName>{product.name}</ProductName>
                            <ProductDescription>
                              {product.teaser_text}
                            </ProductDescription>
                            <ProductPrice
                              discounted={
                                !!product.old_price || product.is_promo
                              }
                            >
                              {formatPrice(product.price)}
                            </ProductPrice>
                          </ProductInfo>
                        </ProductItem>
                      </ProductItemContainer>
                    ))}
                  </React.Fragment>
                ))}
            </ProductList>
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
                    <CounterButton>-</CounterButton>
                    <AddProductButton>Add Product</AddProductButton>
                    <CounterButton>+</CounterButton>
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

export default Menu
