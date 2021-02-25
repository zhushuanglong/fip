let defaultCurrencyCode = "USD"
let defaultCurrencySymbol = "$"
try {
    if(localStorage.currencyCode) {
        defaultCurrencyCode = localStorage.currencyCode
        defaultCurrencySymbol = localStorage.currencySymbol
    }
} catch (e) {
    console.log(e)
}
export default {
    currencyCode: defaultCurrencyCode,
    currencySymbol: defaultCurrencySymbol
}