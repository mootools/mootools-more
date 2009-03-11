/*
Script: Date.Estonian.js
	Date messages for Estonian.

	License:
		MIT-style license.

	Authors:
		Kevin Valdek

*/

MooTools.lang.set('et-EE', 'Date', {

	months: function(i){
		return ['jaanuar', 'veebruar', 'märts', 'aprill', 'mai', 'juuni', 'juuli', 'august', 'september', 'oktoober', 'november', 'detsember'][i]
	},
	days: function(i) {
		return ['pühapäev', 'esmaspäev', 'teisipäev', 'kolmapäev', 'neljapäev', 'reede', 'laupäev'][i];
	},
	//culture's date order: MM.DD.YYYY
	dateOrder: ['month', 'date', 'year', '.'],
	AM: 'AM',
	PM: 'PM',

	/* Date.Extras */
	ordinal: function(){
		// The Estonian language does not have
		return '';
	},

	lessThanMinuteAgo: 'vähem kui minut aega tagasi',
	minuteAgo: 'umbes minut aega tagasi',
	minutesAgo: '{delta} minutit tagasi',
	hourAgo: 'umbes tund aega tagasi',
	hoursAgo: 'umbes {delta} tundi tagasi',
	dayAgo: '1 päev tagasi',
	daysAgo: '{delta} päeva tagasi',
	lessThanMinuteUntil: 'vähem kui minuti aja pärast',
	minuteUntil: 'umbes minuti aja pärast',
	minutesUntil: '{delta} minuti pärast',
	hourUntil: 'umbes tunni aja pärast',
	hoursUntil: 'umbes {delta} tunni pärast',
	dayUntil: '1 päeva pärast',
	daysUntil: '{delta} päeva pärast'

});