Locale: Number {#Number}
========================

Contains the messages for [Number.Format][].

Usage
-----

Simply change the language property to the locale code, for example *en-US*.

	Locale.use('en-US');

### See also:

* [Number.Format][]
* [Locale][]

Available Languages
-------------------

<table>
	<tr>
		<th>Language</th>
		<th>Locale Code</th>
		<th>Authors</th>
	</tr>
	<tr>
		<td>German</td>
		<td>de-DE</td>
		<td>Christoph Pojer<td>
	</tr>
	<tr>
		<td>English (US)</td>
		<td>en-US</td>
		<td>Arian Stolwijk<td>
	</tr>
	<tr>
		<td>Spanish (Venuzuela)</td>
		<td>es-VE</td>
		<td>Daniel Barreto<td>
	</tr>
	<tr>
		<td>Europe (Languages can inherit from this)</td>
		<td>EU</td>
		<td>Arian Stolwijk<td>
	</tr>
	<tr>
		<td>Finnish</td>
		<td>fi-FI</td>
		<td>ksel<td>
	</tr>
	<tr>
		<td>French</td>
		<td>fr-FR</td>
		<td>sv1l<td>
	</tr>
	<tr>
		<td>Hebrew</td>
		<td>he-IL</td>
		<td>Elad Ossadon<td>
	</tr>
	<tr>
		<td>Dutch</td>
		<td>nl-NL</td>
		<td>Arian Stolwijk<td>
	</tr>
	<tr>
		<td>Portuguese (Brazil)</td>
		<td>pt-BR</td>
		<td>Danillo César<td>
	</tr>
	<tr>
		<td>Swedish</td>
		<td>sv-SE</td>
		<td>Martin Lundgren<td>
	</tr>
	<tr>
		<td>Turkish</td>
		<td>tr-TR</td>
		<td>Faruk Can Bilir</td>
	</tr>
</table>


Keys/Values
-----------

- decimal - (*string*) The decimal point, usually a `.` or a `,`.
- group - (*string*) The thousands separator
- currency - (*object*)
	- decimals - (*number*) The number of decimals used to format currencies, usually `2`
	- prefix - (*string*) The prefix, usually the currency symbol like $ or €.
	- suffix - (*string*) Can be used if the currency sympol is placed after the number.


[Locale]: /more/Locale/Locale
[Number.Format]: /more/Types/Number.Format
