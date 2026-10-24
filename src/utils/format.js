// Small, focused formatting helpers used all over the app. Keeping
// these in one file means if you ever want to switch from Toman to
// another currency, or from Persian digits to Western digits, you
// change it here once instead of hunting through every component.

const PERSIAN_DIGITS = ['۰', '۱', '۲', '۳', '۴', '۵', '۶', '۷', '۸', '۹'];

/** Converts any number/string containing 0-9 into Persian digit characters. */
export function toPersianDigits(value) {
  return String(value).replace(/[0-9]/g, (digit) => PERSIAN_DIGITS[digit]);
}

/** Formats a plain number (Toman) as "۱٬۸۵۰٬۰۰۰ تومان". The 'fa-IR'
 *  locale gives us Persian digits AND the correct Persian thousands
 *  separator (٬) in one call — no need to build the grouping ourselves. */
export function formatPrice(amount) {
  return `${Math.round(amount).toLocaleString('fa-IR')} تومان`;
}

/** Formats a number as a Persian-digit percentage, e.g. "۱۵٪". */
export function formatPercent(value) {
  return `${toPersianDigits(Math.round(value))}٪`;
}

/** Given a current price and an old (pre-discount) price, returns the
 *  percentage discount, or null if there's no discount. */
export function getDiscountPercent(price, oldPrice) {
  if (!oldPrice || oldPrice <= price) return null;
  return Math.round(((oldPrice - price) / oldPrice) * 100);
}

// 'fa-IR' already defaults to the Jalali calendar, but the '-u-ca-persian'
// extension says so explicitly — same output, easier to read for anyone
// who doesn't already know that default by heart. No date library needed;
// this is built into the JS engine.
const JALALI_LOCALE = 'fa-IR-u-ca-persian';

/** Formats an ISO date string using the Persian (Jalali) calendar, e.g.
 *  "۲۰ شهریور ۱۴۰۵". */
export function formatDate(isoString) {
  return new Intl.DateTimeFormat(JALALI_LOCALE, {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  }).format(new Date(isoString));
}

/** Short numeric date, e.g. for compact table rows. */
export function formatDateShort(isoString) {
  return new Intl.DateTimeFormat(JALALI_LOCALE, {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(new Date(isoString));
}
