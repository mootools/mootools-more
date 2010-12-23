
(function(context){

var Configuration = context.Configuration = {};

// Runner name
Configuration.name = 'MooTools More';


// Presets - combine the sets and the source to a preset to easily run a test
Configuration.presets = {

	'more-base': {
		sets: ['1.3-base'],
		source: ['core-1.3-base', 'more-1.3-base']
	},

	'more-all': {
		sets: ['1.3-base', '1.3-client'],
		source: ['core-1.3-base', 'core-1.3-client', 'more-1.3-base', 'more-1.3-client']
	}

};

Configuration.defaultPresets = {
	browser: 'more-all',
	nodejs: 'more-base',
	jsdt: 'more-all'
};

/*
 * An object with sets. Each item in the object should have an path key,
 * that specifies where the spec files are and an array with all the files
 * without the .js extension relative to the given path
 */
Configuration.sets = {

	'1.3-base': {
		path: '1.3/',
		files: [
			'Class/Class.Binds', 'Class/Class.Refactor', 'Class/Events.Pseudos',
			'Class/Chain.Wait',
			'Types/Array.Extras', 'Types/Object.Extras',
			'Types/String.Extras', 'Types/String.QueryString', 'Types/Number.Format',
			'Types/Hash', 'Types/Hash.Extras', 'Types/Date',
			'Types/Date.Extras', 'Locale/Locale',
			'Utilities/Color', 'Utilities/Group'
		]
	},

	'1.3-client': {
		path: '1.3/',
		files: [
			'Class/Class.Occlude',
			'Element/Element.Forms', 'Element/Element.Measure', 'Element/Elements.From', 'Element/Element.Shortcuts',
			'Element/Element.Event.Pseudos', 'Element/Element.Event.Pseudos.Keys', 'Element/Element.Delegation',
			'Types/URI', 'Types/URI.Relative',
			'Interface/Keyboard', 'Interface/HtmlTable', 'Interface/HtmlTable.Sort',
			'Forms/Form.Validator',
      'Fx/Fx.Reveal',
			'Request/Request.JSONP',
			'Utilities/Hash.Cookie', 'Utilities/Assets'
		]
	}

};


/*
 * An object with the source files. Each item should have an path key,
 * that specifies where the source files are and an array with all the files
 * without the .js extension relative to the given path
 */
Configuration.source = {

	'core-1.3-base': {
		path: 'mootools-core/Source/',
		files: [
			'Core/Core',

			'Slick/Slick.Parser',

			'Types/Array',
			'Types/Function',
			'Types/Number',
			'Types/String',
			'Types/Object',

			'Class/Class',
			'Class/Class.Extras',

			'Fx/Fx'
		]
	},
	'core-1.3-client': {
		path: 'mootools-core/Source/',
		files: [
			'Types/Event',

			'Browser/Browser',

			'Slick/Slick.Parser',
			'Slick/Slick.Finder',

			'Element/Element',
			'Element/Element.Event',
			'Element/Element.Style',
			'Element/Element.Dimensions',

			'Utilities/DOMReady',
			'Utilities/JSON',
			'Utilities/Cookie',
			'Utilities/Swiff',

			'Fx/Fx',
			'Fx/Fx.CSS',
			'Fx/Fx.Tween',
			'Fx/Fx.Morph',
			'Fx/Fx.Transitions',

			'Request/Request',
			'Request/Request.HTML',
			'Request/Request.JSON'
		]
	},

	'more-1.3-base': {
		path: '../Source/',
		files: [
			'More/More',

			'Locale/Locale',
			'Locale/Locale.en-US.Form.Validator',
			'Locale/Locale.en-US.Date',
			'Locale/Locale.fr-FR.Date',
			'Locale/Locale.en-US.Number',

			'Class/Class.Binds',
			'Class/Class.Refactor',
			'Class/Events.Pseudos',
			'Class/Chain.Wait',

			'Types/Array.Extras',
			'Types/Object.Extras',
			'Types/Hash',
			'Types/Hash.Extras',
			'Types/Date',
			'Types/Date.Extras',
			'Types/String.Extras',
			'Types/String.QueryString',

			'Types/Number.Format',

			'Utilities/Color',
			'Utilities/Group'

		]
	},

	'more-1.3-client': {
		path: '../Source/',
		files: [
			'Class/Class.Occlude',

			'Element/Element.Forms',
			'Element/Element.Measure',
			'Element/Element.Shortcuts',
			'Element/Elements.From',

			'Element/Element.Event.Pseudos',
			'Element/Element.Event.Pseudos.Keys',
			'Element/Element.Delegation',

      'Forms/Form.Validator',

			'Types/URI',
			'Types/URI.Relative',

			'Interface/Keyboard',
			'Interface/HtmlTable',
			'Interface/HtmlTable.Sort',

			'Fx/Fx.Reveal',

			'Request/Request.JSONP',

			'Utilities/Hash.Cookie',
			'Utilities/Assets'
		]
	}

};

})(typeof exports != 'undefined' ? exports : this);
