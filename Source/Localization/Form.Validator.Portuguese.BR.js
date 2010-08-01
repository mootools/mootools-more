/*
---

script: Form.Validator.Portuguese.BR.js

name: Form.Validator.Portuguese.BR

description: Form Validator messages in Portuguese-BR.

license: MIT-style license

authors:
  - Fábio Miranda Costa

requires:
  - /Lang

provides: [Form.Validator.Portuguese.BR]

...
*/

MooTools.lang.set('pt-BR', 'Form.Validator', {

	required: 'Este campo é obrigatório.',
	minLength: 'Digite pelo menos {minLength} caracteres (tamanho atual: {length}).',
	maxLength: 'Não digite mais de {maxLength} caracteres (tamanho atual: {length}).',
	integer: 'Por favor digite apenas um número inteiro neste campo. Não são permitidos números decimais (por exemplo, 1,25).',
	numeric: 'Por favor digite apenas valores numéricos neste campo (por exemplo, "1" ou "1.1" ou "-1" ou "-1,1").',
	digits: 'Por favor use apenas números e pontuação neste campo (por exemplo, um número de telefone com traços ou pontos é permitido).',
	alpha: 'Por favor use somente letras (a-z). Espaço e outros caracteres não são permitidos.',
	alphanum: 'Use somente letras (a-z) ou números (0-9) neste campo. Espaço e outros caracteres não são permitidos.',
	dateSuchAs: 'Digite uma data válida, como {date}',
	dateInFormatMDY: 'Digite uma data válida, como DD/MM/YYYY (por exemplo, "31/12/1999")',
	email: 'Digite um endereço de email válido. Por exemplo "nome@dominio.com".',
	url: 'Digite uma URL válida. Exemplo: http://www.google.com.',
	currencyDollar: 'Digite um valor em dinheiro válido. Exemplo: R$100,00 .',
	oneRequired: 'Digite algo para pelo menos um desses campos.',
	errorPrefix: 'Erro: ',
	warningPrefix: 'Aviso: ',

	// Form.Validator.Extras
	noSpace: 'Não é possível digitar espaços neste campo.',
	reqChkByNode: 'Não foi selecionado nenhum item.',
	requiredChk: 'Este campo é obrigatório.',
	reqChkByName: 'Por favor digite um {label}.',
	match: 'Este campo deve ser igual ao campo {matchName}.',
	startDate: 'a data inicial',
	endDate: 'a data final',
	currendDate: 'a data atual',
	afterDate: 'A data deve ser igual ou posterior a {label}.',
	beforeDate: 'A data deve ser igual ou anterior a {label}.',
	startMonth: 'Por favor selecione uma data inicial.',
	sameMonth: 'Estas duas datas devem ter o mesmo mês - você deve modificar uma das duas.',
	creditcard: 'O número do cartão de crédito informado é inválido. Por favor verifique o valor e tente novamente. {length} números informados.'

});
