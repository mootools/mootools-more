Locale: Date {#Date}
====================

Contains the messages for [Date][] and [Date.Extras][].

Usage
-----

Simply change the language property to the locale code, for example *en-US*.

	Locale.use('en-US');

### See also:

* [Date][]
* [Date.Extras][]
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
		<td>Arabic</td>
		<td>ar</td>
		<td>Chafik Barbar</td>
	</tr>
	<tr>
		<td>Catalan</td>
		<td>ca-CA</td>
		<td>Alfons Sanchez</td>
	</tr>
	<tr>
		<td>Chinese (simplified)</td>
		<td>zh-CHS</td>
		<td>YMind Chan</td>
	</tr>
	<tr>
		<td>Chinese (traditional)</td>
		<td>zh-CHT</td>
		<td>YMind Chan</td>
	</tr>
	<tr>
		<td>Czech</td>
		<td>cs-CZ</td>
		<td>Jan Černý</td>
	</tr>
	<tr>
		<td>Danish</td>
		<td>da-DK</td>
		<td>Martin Overgaard</td>
	</tr>
	<tr>
		<td>Dutch</td>
		<td>nl-NL</td>
		<td>Lennart Pilon</td>
	</tr>
	<tr>
		<td>English (GB)</td>
		<td>en-GB</td>
		<td>Aaron Newton</td>
	</tr>
	<tr>
		<td>English (US)</td>
		<td>en-US</td>
		<td>Aaron Newton</td>
	</tr>
	<tr>
		<td>Estonian</td>
		<td>et-EE</td>
		<td>Kevin Valdek</td>
	</tr>
	<tr>
		<td>Finnish</td>
		<td>fi-FI</td>
		<td>ksel</td>
	</tr>
	<tr>
		<td>French</td>
		<td>fr-FR</td>
		<td>Nicolas Sorosac</td>
	</tr>
	<tr>
		<td>German (Switzerland)</td>
		<td>de-CH</td>
		<td>Michael van der Weg</td>
	</tr>
	<tr>
		<td>German</td>
		<td>de-DE</td>
		<td>Frank Rossi, Ulrich Petri</td>
	</tr>
	<tr>
		<td>Hungarian</td>
		<td>hu-HU</td>
		<td>Zsolt Szegheő</td>
	</tr>
	<tr>
		<td>Italian</td>
		<td>it-IT</td>
		<td>Andrea Novero, Valerio Proietti</td>
	</tr>
	<tr>
		<td>Japanese</td>
		<td>ja-JP</td>
		<td>Noritaka Horio</td>
	</tr>
	<tr>
		<td>Norwegian</td>
		<td>no-NO</td>
		<td>Espen 'Rexxars' Hovlandsdal</td>
	</tr>
	<tr>
		<td>Persian (Farsi)</td>
		<td>fa</td>
		<td>Amir Hossein Hodjaty Pour</td>
	</tr>
	<tr>
		<td>Polish</td>
		<td>pl-PL</td>
		<td>Oskar Krawczyk</td>
	</tr>
	<tr>
		<td>Portuguese (Brazil)</td>
		<td>pt-BR</td>
		<td>Fábio Miranda Costa</td>
	</tr>
	<tr>
		<td>Portuguese</td>
		<td>pt-PT</td>
		<td>Fábio Miranda Costa</td>
	</tr>
	<tr>
		<td>Russian</td>
		<td>ru-RU</td>
		<td>Evstigneev Pavel</td>
	</tr>
	<tr>
		<td>Slovenian</td>
		<td>si-SI</td>
		<td>Radovan Lozej</td>
	</tr>
	<tr>
		<td>Spanish (Argentina)</td>
		<td>es-AR</td>
		<td>Ãlfons Sanchez, Diego Massanti</td>
	</tr>
	<tr>
		<td>Spanish</td>
		<td>es-ES</td>
		<td>Ãlfons Sanchez</td>
	</tr>
	<tr>
		<td>Swedish</td>
		<td>sv-SE</td>
		<td>Martin Lundgren</td>
	</tr>
	<tr>
		<td>Turkish</td>
		<td>tr-TR</td>
		<td>Faruk Can Bilir</td>
	</tr>
	<tr>
		<td>Ukrainian</td>
		<td>uk-UA</td>
		<td>Slik</td>
	</tr>
</table>

Keys/Values
-----------

### Used by [Date][]

* months - (*array*) An array of month names for the language (January, February, etc)
* months_abbr - (*array*) An array of all abbreviations of month names (jan, feb, apr, etc)
* days - (*array*) An array of names for the days of the week (Monday, Tuesday, etc)
* days_abbr - (*array*) An array of all abbreviations of day names (sun, mon, tue, etc)
* dateOrder - (*array*) An array specifying the order for date expression followed by a default delimiter (usually /). US english is *['month', 'date', 'year', '/']*, for instance.
* AM - (*string*) the string that denotes morning in 12 hour time
* PM - (*string*) the string that denotes evening in 12 hour time
* ordinal - (*function*) A method that returns the proper ordinal ("th", "st", "nd", etc) given a day of the month.
* firstDayOfWeek - (*number*) The index of the first day of the week, 0 = Sunday - 6 = Saturday

### Used by [Date.Extras][]

* lessThanMinuteAgo - (*string*) 'less than a minute ago'
* minuteAgo - (*string*) 'about a minute ago'
* minutesAgo - (*string*) '{delta} minutes ago' where {delta} is the number of minutes
* hourAgo - (*string*) 'about an hour ago'
* hoursAgo - (*string*) 'about {delta} hours ago' where {delta} is the number of hours
* dayAgo - (*string*) '1 day ago'
* daysAgo - (*string*) '{delta} days ago' where {delta} is the number of days
* weekAgo - (*string*) '1 week ago'
* weeksAgo - (*string*) '{delta} weeks ago' where {delta} is the number of weeks
* monthAgo - (*string*) '1 month ago'
* monthsAgo - (*string*) '{delta} months ago' where {delta} is the number of months
* yearAgo - (*string*) '1 year ago'
* yearsAgo - (*string*) '{delta} years ago' where {delta} is the number of years
* lessThanMinuteUntil - (*string*) 'less than a minute from now'
* minuteUntil - (*string*) 'about a minute from now'
* minutesUntil - (*string*) '{delta} minutes from now' where {delta} is the number of minutes
* hourUntil - (*string*) 'about an hour from now'
* hoursUntil - (*string*) 'about {delta} hours from now' where {delta} is the number of hours
* dayUntil - (*string*) '1 day from now'
* daysUntil - (*string*) '{delta} days from now' where {delta} is the number of days
* weekUntil - (*string*) '1 week from now'
* weeksUntil - (*string*) '{delta} weeks from now' where {delta} is the number of weeks
* monthUntil - (*string*) '1 month from now'
* monthsUntil - (*string*) '{delta} months from now' where {delta} is the number of months
* yearUntil - (*string*) '1 year from now'
* yearsUntil - (*string*) '{delta} years from now' where {delta} is the number of years


[Locale]: /more/Locale/Locale
[Date]: /more/Types/Date
[Date.Extras]: /more/Types/Date.Extras
