import React, { useState, useRef, useEffect } from 'react'
import PropTypes from 'prop-types'
import styled from 'styled-components'

const ImageComponent = styled.img`
  width: 100%;
  height: 100%;
  transition: all 0.3s ease-in-out;

  @keyframes placeHolder {
    0% {
      background-position: -468px 0;
    }
    100% {
      background-position: 468px 0;
    }
  }

  ${props => props.imageLoaded
    || `
    animation-name: placeHolder;
    animation-duration: 1.5s;
    animation-fill-mode: forwards;
    animation-iteration-count: infinite;
    animation-timing-function: linear;
    background: #f6f7f8;
    background: linear-gradient(to right, #eeeeee 8%, #dfdfdf 20%, #eeeeee 33%);
    background-size: 800px 104px;
    filter: blur(5px);
    position: relative;
  `}
`

function LazyImage({ src, ...props }) {
  const imageRef = useRef()
  const [imageLoaded, setImageLoaded] = useState(false)
  let observer

  useEffect(() => {
    observer = new IntersectionObserver(startLoading)
    if (!imageLoaded) {
      observer.observe(imageRef.current)
    }
    return () => observer.unobserve(imageRef.current)
  }, [])

  function startLoading(entries, object) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return

      if (!imageLoaded) {
        const downloadingImage = new Image()
        downloadingImage.onload = () => {
          if (imageRef.current) {
            imageRef.current.setAttribute('src', downloadingImage.src)
            setImageLoaded(true)
          }
        }
        downloadingImage.src = src
      }

      object.unobserve(entry.target)
    })
  }

  return <ImageComponent {...props} ref={imageRef} alt="" imageLoaded={imageLoaded} />
}

LazyImage.propTypes = {
  src: PropTypes.string.isRequired,
}

export default LazyImage
