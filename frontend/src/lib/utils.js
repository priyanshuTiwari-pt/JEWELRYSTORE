export const formatCurrency = (value, locale = "en-IN", currency = "INR") => {
	const v = Number(value) || 0;
	return new Intl.NumberFormat(locale, { style: "currency", currency }).format(v);
};

export const formatDate = (isoString, opts = {}) => {
	if (!isoString) return "";
	const d = new Date(isoString);
	if (isNaN(d.getTime())) return "";
	const { locale = undefined, options = { year: 'numeric', month: 'short', day: 'numeric', hour: '2-digit', minute: '2-digit' } } = opts;
	return d.toLocaleString(locale, options);
};

export default {
	formatCurrency,
	formatDate,
};
