import Loadable from 'react-loadable'
import Loading from '../../../components/Loading'

const LoadableComponent = Loadable({
  loader: () => import('./index'),
  loading: Loading,
})

export default LoadableComponent
