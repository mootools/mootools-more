/*
---

name: Locale.pt-PT.Form.Validator

description: Form Validator messages for Portuguese.

license: MIT-style license

authors:
  - Miquel Hudin

requires:
  - /Locale

provides: [Locale.pt-PT.Form.Validator]

...
*/

Locale.define('pt-PT', 'FormValidator', {

	required: 'Este campo é necessário.',
	minLength: 'Digite pelo menos{minLength} caracteres (comprimento {length} caracteres).',
	maxLength: 'Não insira mais de {maxLength} caracteres (comprimento {length} caracteres).',
	integer: 'Digite um número inteiro neste domínio. Com números decimais (por exemplo, 1,25), não são permitidas.',
	numeric: 'Digite apenas valores numéricos neste domínio (p.ex., "1" ou "1.1" ou "-1" ou "-1,1").',
	digits: 'Por favor, use números e pontuação apenas neste campo (p.ex., um número de telefone com traços ou pontos é permitida).',
	alpha: 'Por favor use somente letras (a-z), com nesta área. Não utilize espaços nem outros caracteres são permitidos.',
	alphanum: 'Use somente letras (a-z) ou números (0-9) neste campo. Não utilize espaços nem outros caracteres são permitidos.',
	dateSuchAs: 'Digite uma data válida, como {date}',
	dateInFormatMDY: 'Digite uma data válida, como DD/MM/YYYY (p.ex. "31/12/1999")',
	email: 'Digite um endereço de email válido. Por exemplo "fred@domain.com".',
	url: 'Digite uma URL válida, como http://www.example.com.',
	currencyDollar: 'Digite um valor válido $. Por exemplo $ 100,00. ',
	oneRequired: 'Digite algo para pelo menos um desses insumos.',
	errorPrefix: 'Erro: ',
	warningPrefix: 'Aviso: '

});
