import React, { useState } from 'react'
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
                    active={tabIndex === index}
                    onClick={() => setTabIndex(index)}
                    >
                    {category.name}
                  </Tab>
                ))}
            </ProductCategoryTabs>
            <ProductList>
              {productCategories.map((category) => (
                <React.Fragment key={category.name}>
                  <CategoryLabelContainer>
                    <CategoryIcon src={category.icon} />
                    <CategoryLabel>{category.name}</CategoryLabel>
                  </CategoryLabelContainer>
                  {category.products.map((product) => (
                    <ProductItemContainer key={product.id}>
                      <ProductItem>
                        <ProductImageContainer>
                          <ProductImage src={product.image} />
                        </ProductImageContainer>
                        <ProductInfo>
                            <ProductName>
                              {product.name}
                            </ProductName>
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
