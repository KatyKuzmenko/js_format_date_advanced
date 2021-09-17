'use strict';

/**
 *   Time flies, standards change. Let's get rid of the routine of changing the
 * date format. Create a `formatDate` function that accepts the `date` string,
 * the old `fromFormat` array and the new `toFormat` array. Function returns
 * given date in new format.
 *   The function can change a separator, reorder the date parts of convert a
 * year from 4 digits to 2 digits and back.
 *   When converting from YYYY to YY just use 2 last digit (1997 -> 97).
 *   When converting from YY to YYYY use 20YY if YY < 30 and 19YY otherwise.
 *
 * Examples:
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '2020-02-18',
 *   ['YYYY', 'MM', 'DD', '-'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.2020'
 *
 * formatDate(
 *   '18-02-2020',
 *   ['DD', 'MM', 'YYYY', '-'],
 *   ['DD', 'MM', 'YY', '/'],
 * ) // '18/02/20'
 *
 * formatDate(
 *   '20/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['YYYY', 'MM', 'DD', '.'],
 * ) // '2020.02.18'
 *
 * formatDate(
 *   '97/02/18',
 *   ['YY', 'MM', 'DD', '/'],
 *   ['DD', 'MM', 'YYYY', '.'],
 * ) // '18.02.1997'
 *
 * @param {string} date
 * @param {string[]} fromFormat
 * @param {string[]} toFormat
 *
 * @returns {string}
 */

function formatDate(date, fromFormat, toFormat) {
  const oldSeparator = fromFormat[3];
  const newSeparator = toFormat[3];
  const tempObj = {};
  const dateValues = date.split(oldSeparator);

  for (let i = 0; i < fromFormat.length - 1; i++) {
    tempObj[fromFormat[i]] = dateValues[i];
  }

  for (let n = 0; n < toFormat.length - 1; n++) {
    if (toFormat[n] === 'YYYY') {
      toFormat[n] = 'YY';
      toFormat[n] = tempObj[toFormat[n]];

      if (toFormat[n]) {
        if (toFormat[n] >= 30) {
          toFormat[n] = 19 + toFormat[n];
        } else {
          toFormat[n] = 20 + toFormat[n];
        }
      } else {
        toFormat[n] = 'YYYY';
        toFormat[n] = tempObj[toFormat[n]];
      }
    } else if (toFormat[n] === 'YY') {
      toFormat[n] = 'YYYY';
      toFormat[n] = tempObj[toFormat[n]].slice(2);
    } else {
      toFormat[n] = tempObj[toFormat[n]];
    }
  }

  toFormat.length = toFormat.length - 1;

  return toFormat.join(newSeparator);
}

module.exports = formatDate;
