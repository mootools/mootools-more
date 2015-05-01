/*
 * ---
 *  name: Locale.es-AR.Number
 *  description: Number locale for Spanish (Argentina).
 *  license: MIT-style license
 *  authors:
 *    - Oscar Kuchuk
 *    requires:
 *      - Locale
 *      provides: [Locale.es-AR.Number]
 *      ...
 *      */

Locale.define('es-AR', 'Number', {

    decimal: ',',
    group: '.',

    negative: {
        prefix: '-'
    },

    currency: {
        decimals: 2,
        prefix: '$ '
    },
    percentage: {
        decimals: 2,
        suffix: '%'
    }
});
