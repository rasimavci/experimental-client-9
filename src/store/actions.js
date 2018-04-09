import * as types from './mutation-types'

export const setCredentials = ({ commit }, credentials) => {
  if (credentials) {
    commit(types.SET_CREDENTIALS, credentials)
  }
}
