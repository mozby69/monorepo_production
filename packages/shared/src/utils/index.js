export function formatCurrency(amount, locale = "en-PH", currency = "PHP") {
    return new Intl.NumberFormat(locale, {
        style: "currency",
        currency,
    }).format(amount);
}
