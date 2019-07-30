import gql from 'graphql-tag'
import { IntrospectionFragmentMatcher } from 'apollo-cache-inmemory'

export const userFragment = gql`
  fragment UserFragment on User {
    id
    given_name
    family_name
    fraud_check
    email
    email_verified
    nickname
    role
    phone_number
    phone_number_verified
    used_brand_ids
    favorite_stores
    active_campaigns {
        id
        quantity_max
        promotion_code
        start_date
        end_date
        terms
        discount_percent
        user_quantity
        offer_name
        referral_name
    }
    payment_details {
      paypal_id
      stripe_id
      default_source {
        id
        brand
        last4
        object
        fingerprint
        name
        type
      }
      sources {
        id
        brand
        last4
        object
        fingerprint
        name
        type
      }
    }
    accepted_agb
    accept_agb
    accept_privacy
    accept_push
    push_id
    accept_newsletter
    picture
    referral_code
    success_campaign {
      id
      offer_name
      referral_name
      show_success
    }
  }
`

export const productFragment = gql`
  fragment ProductFragment on ProductInterface {
    id
    name
    price
    has_cutlery
    old_price
    is_promo
    image
    teaser_text
    teaser_text_long
    preferred_height
    allergens
    specialities {
      food_type
      is_halal
      is_kosher
    }
    brand {
      id
      name
      short_name
      address
      contact
      logo
      allergens_info
      allergens_info_url
    }
    category {
      id
      name
      icon
      placeholder
    }
    variants {
      variant_id
      name
      title
      price
      old_price
      is_promo
      allergens
      image
      is_default
      specialities {
        food_type
        is_halal
        is_kosher
      }
      teaser_text
    }
    extras {
      extra_id
      group_id
      name
      price
      specialities {
        food_type
        is_kosher
        is_halal
      }
      allergens
      group_name
      is_selected
    }
     extra_groups {
      name
      default_extra
      is_multiselect
      extra_group_id
      is_required
      has_inputfield
      maximum_extras
      items{
        extra_id
        group_id
        name
        price
        specialities {
          food_type
          is_kosher
          is_halal
        }
        allergens
        is_selected
      }
    }
  }
`

// @TODO: add category.products
export const storeFragment = gql`
  fragment StoreFragment on Store {
    id
    geo_hash
    banner
    eat_in_option
    online
    published
    name
    phone_number
    website
    description
    location_name
    route_help
    pickup_route_help
    poi_location
    product_tags
    pickup_point {
      image
      max_height
      scale
    }
    min_order_time # in seconds
    cancelation_time # in seconds
    labels {
      text
      color
    }
    floor_plan
    heartbeat
    pickie
    block_campaigns
    opening_hours {
      day
      time
    }
    address {
      city
      streetname
      streetno
      zip
    }
    brand {
      id
      name
      short_name
      address
      logo
    }
    categories {
      id
      name
    }
    campaigns {
      id
      type
      price
      quantity_max
      teaser_image_start
      teaser_image_detail
      offer_name
      product {
        id
        name
        price
        old_price
        image
        teaser_text
        allergens
        specialities {
          food_type
          is_halal
          is_kosher
        }
        brand {
          id
          name
          short_name
          address
          contact
          logo
        }
        category {
          id
          name
          icon
        }
        variants {
          variant_id
          name
          title
          price
          old_price
          allergens
          image
          is_default
          specialities {
            food_type
            is_halal
            is_kosher
          }
          teaser_text
        }
        extras {
          extra_id
          name
          price
          specialities {
            food_type
            is_kosher
            is_halal
          }
          allergens
          group_name
          is_selected
        }
      }
    }
    distance {
      raw
      distance
      unit
    }
  }
`

export const storeCardFragment = gql`
  fragment StoreCardFragment on Store {
    id
    geo_hash
    banner
    online
    published
    name
    location_name
    product_tags
    opening_hours {
      day
      time
    }
    brand {
      id
      logo
      name
    }
    labels {
      text
      color
    }
  }
`

export const campaignFragment = gql`
  fragment CampaignFragment on Campaign {
    id
    price
    offer_name
    promotion_code
    discount_percent
    referral_name
  }
`

export const orderFragment = gql`
  fragment OrderFragment on Order {
    id
    transaction_id
    code_text
    readable_id
    created_at
    pickup_time
    pickedup_time
    type
    item_count
    platform_fee
    transaction_id
    payment_method
    status
    total
    store_total
    terminal_total
    cutlery
    eat_in
    store {
      ...StoreFragment
    }
    items{
      id
      name
      price
      base_price
      quantity
      product_id
      variant_id
      store_id
      charged_price_total
      tags
      image
      in_stock
      stock_quantity
      extras {
        extra_id
        name
        group_name
        price
        in_stock
      }
    }
    vat_total {
      vat_rate
      vat_amount
    }
    campaign {
      ...CampaignFragment
    }
  }
  ${storeFragment}
  ${campaignFragment}
`

export const locationFragment = gql`
  fragment LocationFragment on Location {
    id
    name
    tags
    label
    floor_plan
    lonlat {
      longitude
      latitude
    }
    address {
      city
      streetname
      streetno
      zip
    }
  }
`


export const fragmentMatcher = new IntrospectionFragmentMatcher({
  introspectionQueryResultData: {
    __schema: {
      types: [
        {
          kind: 'INTERFACE',
          name: 'ProductInterface',
          possibleTypes: [
            { name: 'Product' },
            { name: 'FeaturedProduct2' },
          ],
        },
      ],
    },
  },
})
