
(function(context){

var Configuration = context.Configuration = {};

// Runner name
Configuration.name = 'MooTools More';


// Presets - combine the sets and the source to a preset to easily run a test
Configuration.presets = {
	
	'more-all': {
		sets: ['1.3-all'],
		source: ['core-1.3-base', 'core-1.3-client', 'more-1.3-all']
	}
	
};


/*
 * An object with sets. Each item in the object should have an path key, 
 * that specifies where the spec files are and an array with all the files
 * without the .js extension relative to the given path
 */
Configuration.sets = {

	'1.3-all': {
		path: '1.3/',
		files: [
			'Core/Lang', /* 'Core/Log',*/
			'Class/Class.Binds', 'Class/Class.Occlude', 'Class/Class.Refactor', 'Class/Events.Pseudos',
			'Element/Element.Forms', 'Element/Element.Measure', 'Element/Elements.From', 'Element/Element.Shortcuts',
			'Element/Element.Pseudos',
			'Types/Array.Extras', 'Types/Date.Extras', 'Types/Date', 'Types/Object.Extras', 'Types/Hash.Extras',
			'Types/String.Extras', 'Types/String.QueryString', 'Types/URI', 'Types/URI.Relative',
			'Utilities/Color', 'Utilities/Hash.Cookie'
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

			'Types/Array',
			'Types/Function',
			'Types/Number',
			'Types/String',
			'Types/Object',

			'Class/Class',
			'Class/Class.Extras'
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

			'Utilities/DomReady',
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
	
	'more-1.3-all': {
		path: '../Source/',
		files: [
			'Core/More',
			'Core/Log',
			'Core/Lang',
			'Localization/Form.Validator.English',
			'Localization/Date.English.US',
	
			'Class/Class.Binds',
			'Class/Class.Occlude',
			'Class/Class.Refactor',
			'Class/Events.Pseudos',
	
			'Element/Element.Forms',
			'Element/Element.Measure',
			'Element/Element.Shortcuts',
			'Element/Elements.From',
			'Element/Element.Pseudos',
	
			'Types/Array.Extras',
			'Types/Date',
			'Types/Date.Extras',
			'Types/Object.Extras',
			'Types/Hash',
			'Types/Hash.Extras',
			'Types/String.Extras',
			'Types/String.QueryString',
			'Types/URI',
			'Types/URI.Relative',
	
			'Utilities/Color',
			'Utilities/Hash.Cookie'
		]
	}

};

})(typeof exports != 'undefined' ? exports : this);
