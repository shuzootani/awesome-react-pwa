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
  CategoryLabel
} from './Components'
import { productCategories as productCategoriesQuery } from '../../../graphql/queries'

function Menu ({ storeId }) {
  const [tabIndex, setTabIndex] = useState(0)
  const sectionRefs = useRef([])
  const categoryRefs = useRef([])

  function onClickCategoryTab (index) {
    categoryRefs.current[index].scrollIntoView({ block: 'nearest', inline: 'start' })
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
                      <ProductItemContainer key={product.id}>
                        <ProductItem>
                          <ProductImageContainer>
                            <ProductImage src={product.image} />
                          </ProductImageContainer>
                          <ProductInfo>
                            <ProductName>{product.name}</ProductName>
                            <ProductDescription>
                              {product.teaser_text}
                            </ProductDescription>
                          </ProductInfo>
                        </ProductItem>
                      </ProductItemContainer>
                    ))}
                  </React.Fragment>
                ))}
            </ProductList>
          </React.Fragment>
        )
      }}
    </Query>
  )
}

export default Menu
