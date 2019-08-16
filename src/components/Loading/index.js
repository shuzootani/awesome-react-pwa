import React from 'react'
import Logo from '../../images/Logo_Standard.png'

const styles = {
  container: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    width: '100%',
    height: '100%',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
}

function Loading() {
  return (
    <div style={styles.container}>
      <img src={Logo} alt="loading-screen-logo" width="150px" height="" />
    </div>
  )
}

export default Loading
