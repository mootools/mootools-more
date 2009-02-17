/*
Script: Date.Portuguese.BR.js
	Date messages in Portuguese-BR (Brazil).

	License:
		MIT-style license.

	Authors:
		Fábio Miranda Costa

*/

MooTools.lang.set('brPOR', 'Date', {

	months: ['Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho', 'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'],
	days: ['Domingo', 'Segunda-feira', 'Terça-feira', 'Quarta-feira', 'Quinta-feira', 'Sexta-feira', 'Sábado'],
	//culture's date order: DD/MM/YYYY
	dateOrder: ['data', 'mês', 'ano', '/'],

	/* Date.Extras */
	getOrdinal: function(dayOfMonth){
		//1º, 2º, 3º, etc.
    	return '&ordm;';
	},

	lessThanMinuteAgo: 'há menos de um minuto',
	minuteAgo: 'há cerca de um minuto',
	minutesAgo: 'há {delta} minutos',
	hourAgo: 'há cerca de uma hora',
	hoursAgo: 'há cerca de {delta} horas',
	dayAgo: 'há 1 dia',
	daysAgo: 'há {delta} dias',
	lessThanMinuteUntil: 'em menos de um minuto',
	minuteUntil: 'em um minuto',
	minutesUntil: 'em {delta} minutos',
	hourUntil: 'em uma hora',
	hoursUntil: 'em {delta} horas',
	dayUntil: 'em 1 dia',
	daysUntil: 'em {delta} dias',
	
	cascades: ['usENG']

});