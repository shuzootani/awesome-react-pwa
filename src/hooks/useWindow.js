import React, { useState, useEffect } from 'react'

function useWindow() {
  const [browserWindow, setWindow] = useState(null)
  useEffect(() => setWindow(window), [])
  return browserWindow
}

export default useWindow

