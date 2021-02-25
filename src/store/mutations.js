export default {
    changeCurrency(state, currencyCode, currencySymbol) {
        console.log(state)
        console.log(currencyCode)
        console.log(currencySymbol)
        state.currencyCode = currencyCode
        state.currencySymbol = currencySymbol
        try {
            localStorage.currencyCode = currencyCode
            localStorage.currencySymbol = currencySymbol
        } catch(e) {}
    }
}