Locale: Form.Validator {#Form-Validator}
========================================

Contains the messages for [Form.Validator][].

Usage
-----

Simply change the language property to the *en-US*.

	Locale.use("en-US");

### See also:

* [Form.Validator][]
* [Locale][]

Available Languages
-------------------

<table>
	<tr>
		<th>Language</th>
		<th>Locale Code</th>
		<th>Authors</th>
		<th>
	</tr>
	<tr>
		<td>Arabic</td>
		<td>ar</td>
		<td>Chafik Barbar<td>
	</tr>
	<tr>
		<td>Catalan</td>
		<td>ca-CA</td>
		<td>Miquel Hudin<td>
	</tr>
	<tr>
		<td>Chinese (simplified)</td>
		<td>zh-CHS</td>
		<td>YMind Chan<td>
	</tr>
	<tr>
		<td>Chinese (traditional)</td>
		<td>zh-CHT</td>
		<td>YMind Chan<td>
	</tr>
	<tr>
		<td>Czech</td>
		<td>cs-CZ</td>
		<td>Jan Černý<td>
	</tr>
	<tr>
		<td>Danish</td>
		<td>da-DK</td>
		<td>Martin Overgaard<td>
	</tr>
	<tr>
		<td>Dutch</td>
		<td>nl-NL</td>
		<td>Lennart Pilon<td>
	</tr>
	<tr>
		<td>English</td>
		<td>en-US</td>
		<td>Aaron Newton<td>
	</tr>
	<tr>
		<td>Estonian</td>
		<td>et-EE</td>
		<td>Kevin Valdek<td>
	</tr>
	<tr>
		<td>Finnish</td>
		<td>fi-FI</td>
		<td>ksel<td>
	</tr>
	<tr>
		<td>French</td>
		<td>fr-FR</td>
		<td>Miquel Hudin<td>
	</tr>
	<tr>
		<td>German (Switzerland)</td>
		<td>de-CH</td>
		<td>Michael van der Weg<td>
	</tr>
	<tr>
		<td>German</td>
		<td>de-DE</td>
		<td>Frank Rossi, Ulrich Petri<td>
	</tr>
	<tr>
		<td>Hungarian</td>
		<td>hu-HU</td>
		<td>Zsolt Szegheő<td>
	</tr>
	<tr>
		<td>Italian</td>
		<td>it-IT</td>
		<td>ALeonardo Laureti, Andrea Novero<td>
	</tr>
	<tr>
		<td>Japanese</td>
		<td>ja-JP</td>
		<td>Noritaka Horio<td>
	</tr>
	<tr>
		<td>Norwegian</td>
		<td>no-NO</td>
		<td>Espen 'Rexxars' Hovlandsdal<td>
	</tr>
	<tr>
		<td>Persian (Farsi)</td>
		<td>fa</td>
		<td>Amir Hossein Hodjaty Pour<td>
	</tr>
	<tr>
		<td>Polish</td>
		<td>pl-PL</td>
		<td>Oskar Krawczyk<td>
	</tr>
	<tr>
		<td>Portuguese (Brazil)</td>
		<td>pt-BR</td>
		<td>Fábio Miranda Costa<td>
	</tr>
	<tr>
		<td>Portuguese</td>
		<td>pt-PT</td>
		<td>Miquel Hudin<td>
	</tr>
	<tr>
		<td>Russian</td>
		<td>ru-RU</td>
		<td>Evstigneev Pavel<td>
	</tr>
	<tr>
		<td>Slovenian</td>
		<td>si-SI</td>
		<td>Radovan Lozej<td>
	</tr>
	<tr>
		<td>Spanish (Argentina)</td>
		<td>es-AR</td>
		<td>Diego Massanti<td>
	</tr>
	<tr>
		<td>Spanish</td>
		<td>es-ES</td>
		<td>Alfons Sanchez<td>
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
	<tr>
		<td>Ukrainian</td>
		<td>uk-UA</td>
		<td>Slik<td>
	</tr>
</table>

### Notes:

* Chinese includes a `validate-currency-yuan` validator


Keys/Values
-----------

* required - (*string*) 'This field is required.'
* minLength - (*string*) 'Please enter at least {minLength} characters (you entered {length} characters).' where *minLength* and *length* are variables for the minimum length and the length the user entered.
* maxLength - (*string*) 'Please enter no more than {maxLength} characters (you entered {length} characters).' where *maxLength* and *length* are variables for the maximum length and the length the user entered.
* integer - (*string*) 'Please enter an integer in this field. Numbers with decimals (e.g. 1.25) are not permitted.'
* numeric - (*string*) 'Please enter only numeric values in this field (i.e. "1" or "1.1" or "-1" or "-1.1").'
* digits - (*string*) 'Please use numbers and punctuation only in this field (for example, a phone number with dashes or dots is permitted).'
* alpha - (*string*) 'Please use letters only (a-z) with in this field. No spaces or other characters are allowed.'
* alphanum - (*string*) 'Please use only letters (a-z) or numbers (0-9) only in this field. No spaces or other characters are allowed.'
* dateSuchAs - (*string*) 'Please enter a valid date such as {date}' where *date* is an example of a valid date entry
* dateInFormatMDY - (*string*) 'Please enter a valid date such as MM/DD/YYYY (i.e. "12/31/1999")'
* email - (*string*) 'Please enter a valid email address. For example "fred@domain.com".'
* url - (*string*) 'Please enter a valid URL such as http://www.google.com.'
* currencyDollar - (*string*) 'Please enter a valid $ amount. For example $100.00 .'
* oneRequired - (*string*) 'Please enter something for at least one of these inputs.'
* errorPrefix - (*string*)  'Error: '
* warningPrefix - (*string*)  'Warning: '


[Form.Validator]: /more/Forms/Form.Validator#Form-Validator
[Locale]: /more/Locale/Locale
