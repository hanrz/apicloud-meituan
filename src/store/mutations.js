import * as types from './mutation-types'

const matutaions = {
  [types.SET_SHOW_LOCATION](state, isShowLocation) {
    state.isShowLocation = isShowLocation
  },
  [types.SET_HOME_SCROLLTOP](state, homeScrollTop) {
    state.homeScrollTop = homeScrollTop
  }
}
export default matutaions
