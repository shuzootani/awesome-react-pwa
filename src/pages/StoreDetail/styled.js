import styled from 'styled-components'
import LazyImage from '../../components/LazyImage'

export const StoreDetailContainer = styled.div`
`

export const StoreImageContainer = styled.div`
  width: 100%;
  height: 200px;
  background: #fff;
  position: relative;
`

export const StoreImage = styled(LazyImage)`
  width: 100%;
  height: 100%;
`

export const ImageOverlay = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.2);
`

export const StoreName = styled.div`
  font-size: 1.5rem;
  color: #fff;
  font-weight: 500;
  width: 100%;
  padding: 0 1rem;
  text-align: center;
  line-height: 1.3;
`

export const BottomContainer = styled.div`
  position: absolute;
  bottom: 0;
  width: 100%;
  max-width: 100%;
`

export const BottomButtonsContainer = styled.div`
  display:flex;
  justify-content: center;
  padding: 1rem 0.5rem;
`
