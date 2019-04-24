import homeApi from './home'
import focusApi from './focus'
import releaseApi from './release'

export default {
  ...homeApi,
  ...focusApi,
  ...releaseApi
}
