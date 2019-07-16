import gql from 'graphql-tag'
import * as fragments from './fragments'

export const brandStores = gql`
  query($brand_id: ID!, $geokey: String) {
    brandStores(brand_id: $brand_id, geokey: $geokey) {
      id
      name
      location_name
      geo_hash
      online
      product_tags
      opening_hours {
        day
        time
      }
      brand {
        id
        logo
      }
      distance {
        distance
        unit
        raw
      }
    }
  }
`

export const userQuery = gql`
  query user($id: ID!) {
    user(id: $id) {
      ...UserFragment
    }
  }
  ${fragments.userFragment}
`

export const getUser = gql`
  query ($forceRefresh: Boolean, $sessionDeviceID: ID){
    getUser(forceRefresh: $forceRefresh, session_device_id: $sessionDeviceID) {
      ...UserFragment
    }
  }
  ${fragments.userFragment}
`

export const productQuery = gql`
  query product ($id: ID!) {
    product(id: $id) {
      ...ProductFragment
    }
  }
  ${fragments.productFragment}
`

export const checkPromotionCode = gql`
  query checkPromotionCode ($code: String) {
    checkPromotionCode(promotion_code: $code) {
      ...CampaignFragment
    }
  }
  ${fragments.campaignFragment}
`

export const storeFront = gql`
  query storeFront($id: ID!) {
    storefront(store_id: $id , filter: "ONLINE") {
      store {
        ...StoreFragment
      }
      brand {
        id
        name
        short_name
        address
        contact
        logo
      }
      products {
        categories {
          name
          icon
          products {
            ...ProductFragment
            in_stock
          }
        }
      }
    }
  }
  ${fragments.productFragment}
  ${fragments.storeFragment}
`

export const productCategories = gql`
  query ($id: ID!) {
    productCategories(store_id: $id , filter: IN_STOCK) {
      name
      icon
      products {
        ...ProductFragment
        in_stock
      }
    }
  }
  ${fragments.productFragment}
`

export const storeQuery = gql`
  query store($id: ID!) {
    store(id: $id) {
      ...StoreFragment,
    }
  }
  ${fragments.storeFragment}
`

export const storeListQuery = gql`
  query stores($geokey: String) {
    stores(geokey: $geokey) {
      ...StoreFragment,
    }
  }
  ${fragments.storeFragment}
`

export const nearestFeaturedProducts = gql`
  query nearestFeaturedProducts($geokey: String!, $proximity: Int!) {
    nearestFeaturedProducts(geokey: $geokey, proximity: $proximity) {
      ...ProductFragment
      in_stock
      distance
      store {
        ...StoreFragment
      }
    }
  }
  ${fragments.productFragment}
  ${fragments.storeFragment}
`

export const activeOrderQuery = gql`
  query order($id: ID!) {
    order(id: $id) {
      ...OrderFragment
    }
  }
  ${fragments.orderFragment}
`

export const orderOverviewQuery = gql`
  query orders($user_id: ID!) {
    orders( user_id: $user_id, sort_by: DESC) {
      ...OrderFragment
    }
  }
  ${fragments.orderFragment}
`

export const nearestStores = gql`
  query nearestStores( $geokey: String!, $proximity: Int!, $filter: StoreFilter ) {
    nearestStores(geokey: $geokey, proximity: $proximity, filter: $filter) {
      ...StoreFragment
    }
  }
  ${fragments.storeFragment}
`

export const nearestGroupedStores = gql`
  query nearestGroupedStores($geokey: String!, $proximity: Int!, $filter: StoreFilter) {
    nearestGroupedStores(geokey: $geokey, proximity: $proximity, filter: $filter) {
      store {
        ...StoreCardFragment
      }
      close_stores {
        ...StoreCardFragment
      }
    }
  }
  ${fragments.storeCardFragment}
`

export const locationsQuery = gql`
  query locations {
    locations {
      ...LocationFragment
    }
  }
  ${fragments.locationFragment}
`

export const locationStores = gql`
  query locationStores($location_id: ID!, $geokey: String, $filter: StoreFilter) {
    locationStores(location_id: $location_id, geokey: $geokey, filter: $filter) {
      stores {
        ...StoreFragment
      }
      near_stores {
        ...StoreFragment
      }
    }
  }
  ${fragments.storeFragment}
`

export const locationGroupedStores = gql`
  query locationGroupedStores($location_id: ID!, $geokey: String, $filter: StoreFilter) {
    locationGroupedStores(location_id: $location_id, geokey: $geokey, filter: $filter) {
      stores {
        store {
          ...StoreCardFragment
        }
        close_stores {
          ...StoreCardFragment
        }
      }
      near_stores {
        store {
          ...StoreCardFragment
        }
        close_stores {
          ...StoreCardFragment
        }
      }
    }
  }
  ${fragments.storeCardFragment}
`

export const checkOTT = gql`
  query checkOTTPayment($token: ID!) {
    checkPaymentToken(token: $token) {
      status
      order_id
    }
  }`

export const checkEmail = gql`
  query checkEmail( $email: String! ) {
    checkEmail(email: $email)
  }
`

export const clearCache = gql`
  query { brands { id } }
`
