import React, { useState } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'
import moment from 'moment'
import Modal from '../../../components/Modal'
import Icon from '../../../components/Icon'
import TimePicker from '../../../components/TimePicker'
import { ELLIPSIS, FLEX_CENTER_CENTER } from '../../../utils/styles'

const Container = styled.div`
  min-width: 0;
  margin-right: 4px;
`

const Button = styled.div`
  background: ${({ theme }) => theme.color.secondary};
  color: #fff;
  display: flex;
  justify-content: space-between;
  align-items: center;
  border-radius: 20px;
  padding: 0.5rem 1.5rem;
`

const Label = styled.div`
  padding-left: 4px;
  ${ELLIPSIS};
`

const Sheet = styled.div`
  background: #fff;
  ${FLEX_CENTER_CENTER};
  flex-direction: column;
  width: 100%;
  margin: auto;
  border-radius: 4px;
`

function PickupTimeSelector({ store, onChange }) {
  const [open, setOpen] = useState(false)

  function toggleModal() {
    setOpen(prevOpen => !prevOpen)
  }

  return (
    <Container>
      <Button onClick={toggleModal}>
        <Icon name="clock" />
        <Label>{moment().format('HH:mm')}</Label>
      </Button>
      {open && (
        <Modal onClose={toggleModal}>
          <Sheet>
            <TimePicker
              store={store}
              onChange={onChange}
            />
          </Sheet>
        </Modal>
      )}
    </Container>
  )
}

PickupTimeSelector.propTypes = {
  store: PropTypes.object.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default PickupTimeSelector
