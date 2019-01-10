export default {
    getToken(state) {
        return state.token
    },
    isLoggedIn(state, getters) {
        return Boolean(getters.getToken)
    }
}
