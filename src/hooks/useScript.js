import { useState, useEffect } from 'react'

// https://usehooks.com/useScript/
function useScript(src) {
  const cachedScripts = []
  const [state, setState] = useState({
    loaded: false,
    error: false,
  })

  useEffect(() => {
    if (cachedScripts.includes(src)) {
      return setState({
        loaded: true,
        error: false,
      })
    }

    cachedScripts.push(src)

    const script = document.createElement('script')
    script.src = src
    script.async = true

    const onScriptLoad = () => {
      setState({
        loaded: true,
        error: false,
      })
    }

    const onScriptError = () => {
      // Remove from cachedScripts we can try loading again
      const index = cachedScripts.indexOf(src)
      if (index >= 0) cachedScripts.splice(index, 1)
      script.remove()

      setState({
        loaded: true,
        error: true,
      })
    }

    script.addEventListener('load', onScriptLoad)
    script.addEventListener('error', onScriptError)

    document.body.appendChild(script)

    return () => {
      script.removeEventListener('load', onScriptLoad)
      script.removeEventListener('error', onScriptError)
    }
  }, [src])

  const { loaded, error } = state
  return { loaded, error }
}

export default useScript
