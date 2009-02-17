/*
Script: Date.Italian.js
  Date messages for Italian. Thanks Andrea Novero
 
  License:
    MIT-style license.
 
*/
 
MooTools.lang.set('IT', 'Date', {
 
  months: ['Gennaio', 'Febbraio', 'Marzo', 'Aprile', 'Maggio', 'Giugno', 'Luglio', 'Agosto', 'Settembre', 'Ottobre', 'Novembre', 'Dicembre'],
  days: ['Domenica', 'Luned&igrave;', 'Marted&igrave;', 'Mercoled&igrave;', 'Gioved&igrave;', 'Venerd&igrave;', 'Sabato'],
  //culture's date order: DD/MM/YYYY
  dateOrder: ['date', 'month', 'year', '/'],
  AM: 'AM',
  PM: 'PM',
 
  /* Date.Extras */
  getOrdinal: function(dayOfMonth){
    //1st, 2nd, 3rd, etc.
    //return (dayOfMonth > 3 && dayOfMonth < 21) ? 'th' : ['th', 'st', 'nd', 'rd', 'th'][Math.min(dayOfMonth % 10, 4)];
    return '&ordm;';
  },
 
  lessThanMinuteAgo: 'meno di un minuto fa',
  minuteAgo: 'circa un minuto fa',
  minutesAgo: '{delta} minuti fa',
  hourAgo: 'circa un\'ora fa',
  hoursAgo: 'circa {delta} ore fa',
  dayAgo: '1 giorno fa',
  daysAgo: '{delta} giorni fa',
  lessThanMinuteUntil: 'meno di un minuto da adesso',
  minuteUntil: 'circa un minuto da adesso',
  minutesUntil: '{delta} minuti da adesso',
  hourUntil: 'circa un\'ora da adesso',
  hoursUntil: 'circa {delta} ore da adesso',
  dayUntil: '1 giorno da adesso',
  daysUntil: '{delta} giorni da adesso'
 
});
