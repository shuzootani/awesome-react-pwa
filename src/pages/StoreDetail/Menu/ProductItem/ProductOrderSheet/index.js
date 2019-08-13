/* eslint-disable no-restricted-globals */
import React, { useState } from 'react'
import PropTypes from 'prop-types'
import { FormattedMessage } from 'react-intl'
import {
  ProductOrderSheet,
  ExtraSelectorContainer,
  TitleContainer,
  TitleOption,
  ExtrasTitle,
  ExtrasCyanTitle,
  ExtraPrice,
  ExtraTitle,
  ListContainer,
  RowContainer,
  ExtraDetailsContainer,
  StyledIcon,
  ExtraTitleContainer,
  AddProductButton,
  CommentInput,
  PlusIcon,
} from './styled'
import { formatPrice } from '../../../../../utils/formatter'
import Icon from '../../../../../components/Icon'
import Checkbox from '../../../../../components/Checkbox'

function OrderSheet({ product, addToBasket }) {
  const [selectedExtras, setExtras] = useState([])
  const [comment, setComment] = useState('')
  const [openGroup, setOpenGroup] = useState({})
  const { extra_groups: extraGroups } = product

  function chooseExtra(extra, group) {
    const existingExtraIndex = selectedExtras.findIndex(
      item => item.extra_id === extra.extra_id
    )
    const isExtraSelected = existingExtraIndex >= 0

    // selected items in other group
    const otherGroupItemsSelected = selectedExtras.filter(
      item => item.extra_id !== extra.extra_id
        && group.items.find(i => i.extra_id === item.extra_id)
    )

    // true if the extra is the only item selected in its group
    const isExtraOnlySelectedInGroup = isExtraSelected && !otherGroupItemsSelected.length

    // prevent deselecting item if it's the only selected extra in a group
    if (group.is_required && isExtraOnlySelectedInGroup) {
      return false
    }

    let extras = selectedExtras || []
    if (group.is_multiselect) {
      if (isExtraSelected) {
        extras.splice(existingExtraIndex, 1)
      } else {
        const maxExtrasExceeded = selectedExtras.filter(
          selected => selected.group_id === group.extra_group_id
        ).length
            + 1
          > group.maximum_extras

        // prevent selecting more extras if maximum number of extras already selected
        if (maxExtrasExceeded) {
          return null
        }

        extras.push(extra)
      }
    } else if (isExtraSelected) {
      extras.splice(existingExtraIndex, 1)
    } else {
      // deselect the previously selected extra for the current group
      const removeGroupExtras = selectedExtras.filter(
        selected => selected.group_id !== group.extra_group_id
      )
      extras = [...removeGroupExtras, extra]
    }
    const newSelectedExtras = extras.map(extraOpt => ({
      ...extraOpt,
      is_selected: true,
    }))

    return setExtras(newSelectedExtras)
  }

  function addProduct() {
    const basketItem = {
      ...product,
      extras: selectedExtras,
      comment,
      // variant_id: any_specific_variant_selected
      // campaign: any_campaign_applied
    }
    addToBasket(basketItem)
  }

  function onCommentChange({ target: { value } }) {
    setComment(value)
  }

  return (
    <ProductOrderSheet>
      {extraGroups
        && extraGroups.length > 0
        && extraGroups.map((group) => {
          const overMaxExtras = group.is_multiselect
            && selectedExtras.filter(
              selected => selected.group_id === group.extra_group_id
            ).length
              + 1
              > group.maximum_extras
          return (
            <ExtraSelectorContainer
              key={group.extra_group_id}
              // onLayout={}
            >
              <TitleContainer
                key={`title${group.extra_group_id}`}
                onClick={() => {
                  const groupId = group.extra_group_id
                  setOpenGroup({ ...openGroup, [groupId]: !openGroup[groupId] })
                }}
              >
                <TitleOption>
                  <ExtrasTitle>{group.name}</ExtrasTitle>
                  {group.maximum_extras && group.items.length > group.maximum_extras ? (
                    <ExtrasCyanTitle>
                      {`(max. ${group.maximum_extras})`}
                    </ExtrasCyanTitle>
                  ) : (
                    <ExtrasCyanTitle>
                      {!group.is_multiselect && '(max. 1)'}
                    </ExtrasCyanTitle>
                  )}
                </TitleOption>
                <StyledIcon>
                  <Icon
                    name={
                      open[group.extra_group_id] ? 'angle_up' : 'angle_down'
                    }
                  />
                </StyledIcon>
              </TitleContainer>
              {openGroup[group.extra_group_id] && (
                <ListContainer key={`list${group.extra_group_id}`}>
                  {group.items.map((item) => {
                    const isSelected = selectedExtras.some(
                      extra => extra.extra_id === item.extra_id
                    )
                    const isDisabled = overMaxExtras && !isSelected

                    return (
                      <RowContainer key={item.extra_id} disabled={isDisabled}>
                        <ExtraDetailsContainer
                          disabled={isDisabled}
                          onClick={() => chooseExtra(item, group)}
                        >
                          <ExtraTitleContainer>
                            <Checkbox checked={isSelected} />
                            <ExtraTitle>{item.name}</ExtraTitle>
                          </ExtraTitleContainer>
                          <ExtraPrice>
                            {formatPrice(item.price, [], false, true)}
                          </ExtraPrice>
                        </ExtraDetailsContainer>
                      </RowContainer>
                    )
                  })}
                </ListContainer>
              )}
            </ExtraSelectorContainer>
          )
        })}
      <CommentInput onChange={onCommentChange} label="Anmerkungen" />
      <AddProductButton onClick={addProduct}>
        <FormattedMessage id="pages.StoreDetail.AddToBasket" />
        <PlusIcon name="plus" />
      </AddProductButton>
    </ProductOrderSheet>
  )
}

OrderSheet.propTypes = {
  addToBasket: PropTypes.func.isRequired,
  product: PropTypes.object.isRequired,
}

export default OrderSheet
