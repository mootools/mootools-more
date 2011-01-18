/*
---

name: Locale.he-IL.Form.Validator

description: Form Validator messages for Hebrew.

license: MIT-style license

authors:
  - Elad Ossadon

requires:
  - /Locale

provides: [Locale.he-IL.Form.Validator]

...
*/

Locale.define('he-IL', 'FormValidator', {

	required: 'נא למלא שדה זה.',
	minLength: 'נא להזין לפחות {minLength} תווים (הזנת {length} תווים).',
	maxLength: 'נא להזין עד {maxLength} תווים (הזנת {length} תווים).',
	integer: 'נא להזין מספר שלם לשדה זה. מספרים עשרוניים (כמו 1.25) אינם חוקיים.',
	numeric: 'נא להזין ערך מספרי בלבד בשדה זה (כמו "1", "1.1", "-1" או "-1.1").',
	digits: 'נא להזין רק ספרות וסימני הפרדה בשדה זה (למשל, מספר טלפון עם מקפים או נקודות הוא חוקי).',
	alpha: 'נא להזין רק אותיות באנגלית (a-z) בשדה זה. רווחים או תווים אחרים אינם חוקיים.',
	alphanum: 'נא להזין רק אותריות באנגלית (a-z) או ספרות (0-9) בשדה זה. אווחרים או תווים אחרים אינם חוקיים.',
	dateSuchAs: 'נא להזין תאריך חוקי, כמו {date}',
	dateInFormatMDY: 'נא להזין תאריך חוקי בפורמט MM/DD/YYYY (כמו "12/31/1999")',
	email: 'נא להזין כתובת אימייל חוקית. לדוגמה: "fred@domain.com".',
	url: 'נא להזין כתובת אתר חוקית, כמו http://www.example.com.',
	currencyDollar: 'נא להזין סכום דולרי חוקי. לדוגמה $100.00.',
	oneRequired: 'נא לבחור לפחות בשדה אחד.',
	errorPrefix: 'שגיאה: ',
	warningPrefix: 'אזהרה: ',

	// Form.Validator.Extras
	noSpace: 'אין להזין רווחים בשדה זה.',
	reqChkByNode: 'נא לבחור אחת מהאפשרויות.',
	requiredChk: 'שדה זה נדרש.',
	reqChkByName: 'נא לבחור {label}.',
	match: 'שדה זה צריך להתאים לשדה {matchName}',
	startDate: 'תאריך ההתחלה',
	endDate: 'תאריך הסיום',
	currendDate: 'התאריך הנוכחי',
	afterDate: 'התאריך צריך להיות זהה או אחרי {label}.',
	beforeDate: 'התאריך צריך להיות זהה או לפני {label}.',
	startMonth: 'נא לבחור חודש התחלה',
	sameMonth: 'שני תאריכים אלה צריכים להיות באותו חודש - נא לשנות אחד התאריכים.',
	creditcard: 'מספר כרטיס האשראי שהוזן אינו חוקי. נא לבדוק שנית. הוזנו {length} ספרות.'

});
