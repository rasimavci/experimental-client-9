import * as types from './mutation-types'

// const mutations = {
//   [types.SET_CREDENTIALS] (state, credentials) {
//     state.credentials = credentials
//   }
// }


//
// export function () {
//   mutations
// }

export default {
  [types.SET_CREDENTIALS] (state, credentials) {
    state.credentials = credentials
  }
}
