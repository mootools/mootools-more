Type: Number {#Number}
======================

A collection of useful methods to format Numbers.

### See Also

* [Number][]
* [Number Locale][]


Number Method: format {#Number:format}
-------------------------------------

Formats a number into a formatted string for display to user. It respects localization.

### Syntax

	myNumber.format([options]);

### Arguments

1. options - (*object*, optional) Optional configuration values:
	* decimal - (*string*) Decimal separator
	* group - (*string*) Thousands separator
	* decimals - (*number*) Number of decimals
	* precision - (*number*) Number of significant numbers
	* scientific - (*boolean*) Set to `false` if the 1.4e+4 should be replaced by 14000
	* suffix - (*string*) String prepended after the number
	* prefix - (*string*) String appended after the number


### Examples

	(123123123.176).format({
		decimal: ".",
		group: ",",
		decimals: 2,
		prefix: "&amp;#165;",
		suffix: " (YEN)"
	}); // returns "&#165;123.123.123,18 (YEN)"

	(123456789).format({
		precision: 4,
		scientific: false
	}); // 123,500,000


### Returns

* (*string*) the formatted number


Number Method: formatCurrency {#Number:formatCurrency}
------------------------------------------------------

Formats a number as currency, with respect to localization.

### Syntax

	myNumber.formatCurrency(decimals);

### Arguments

1. decimals - (*number*) the number of decimals

### Example

	var money = (4125.957).formatCurrency(); // $ 4,125.96

### Returns

* (*string*) the formatted number


Number Method: formatPercentage {#Number:formatPercentage}
------------------------------------------------------

Formats a number as a percentage.

### Syntax

	myNumber.formatPercentage(decimals);

### Arguments

1. decimals - (*number*) the number of decimals

### Example

	var percentage = (4125.957).formatPercentage(); // 4,125.96%

### Returns

* (*string*) the formatted percentage


[Number]: /core/Types/Number
[Number Locale]: /more/Locale/Number
