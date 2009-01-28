/*
Script: PostEditor.Snippets.js
	Default snippets for PostEditor.

Author:
	Daniel Mota aka IceBeat, <http://icebeat.bitacoras.com>

Contributors:
	Sergio Álvarez aka Xergio, <http://xergio.net>
	Jordi Rivero aka Godsea, <http://godsea.dsland.org>
	Aaron Newton, <http://www.clientcide.com>

License:
	MIT-style license.
*/
if(!language) var language = {};

language.FORUM = {

	snippets: {

		"strong" : ["<strong>\n		","something here","\n</strong>"],
		"em" : ["<em>\n		","something here","\n</em>"],
		"blockquote" : ["<blockquote>\n		","something here","\n</blockquote>"],
		"code" : ["<code>\n		","something here","\n</code>"],
		"javascript" : ["<javascript>\n		","something here","\n</javascript>"],
		"html" : ["<html>\n		","something here","\n</html>"],
		"bq" : ["<blockquote>\n		","something here","\n</blockquote>"],
		"js" : ["<javascript>\n		","something here","\n</javascript>"],

		"$" : {
			snippet:["$('","id')","."],
			tab:['id','']
		},

		"ul" : {
			snippet:["<ul>\n		<li>","something here","</li>\n</ul>"],
			tab:['something here',''],
			start: 5
		},

		"ol" : {
			snippet:["<ol>\n		<li>","something here","</li>\n</ol>"],
			tab:['something',''],
			completion: {
				'something':['text','snippet']
			},
			loop: true, //optional, default true
			start: 5 //position snippet[2] default false == snippet[2].length, true == 0
		},

		"li" : {
			snippet:["<li>","something here","</li>"],
			tab:['something here','']
		},
		"</li>" : {
			snippet:["</li>\n<li>","something here","</li>"],
			tab:['something here','']
		},

		"new Class" : {
			scope: {"<javascript>":"</javascript>"},
			snippet:["new Class({\n		initialize: function(value){\n				","this.key = value;","\n		}\n});"],
			tab:['this.key','key','value']
		},

		".extend" : {
			snippet:[".extend({\n		","initialize: function(value){\n				","\n		}\n});"],
			tab:['initialize','value',''],
			start:true
		},

		"date" : {
			command: function(k) {
				var dayNames = ["Sunday","Monday","Tuesday","Wednesday","Thursday","Friday","Saturday"],
						monthNames = ["January","February","March","April","May","June","July","August","September","October","November","December"],
						dt = new Date(),
						y	= dt.getYear();
				if (y < 1000) y +=1900;
				return {
					//key:"date", optional
					snippet:['',dayNames[dt.getDay()] + ", " + monthNames[dt.getMonth()] + " " + dt.getDate() + ", " + y,' '],
					tab:[dayNames[dt.getDay()] + ", " + monthNames[dt.getMonth()] + " " + dt.getDate() + ", " + y,'']
				};
			}
		},

		"a" : {
			snippet:['<a href="','http://" title="desc">text','</a> '],
			tab:['http://',' title="desc"','desc','text','']
		},

		"{" : ["{\n		","","\n"]

	},

	smartTypingPairs: {
		'"' : '"',
		'(' : ')',
		'{' : '}',
		'[' : ']',
		"<" : ">",
		"`" : "`",
		"'" : {
			scope:{
				"<javascript>":"</javascript>",
				"<code>":"</code>",
				"<html>":"</html>"
			},
			pair:"'"
		}
	},

	//ctrl+shift+number
	selections: {
		"0": function(sel) {
			return ['<strong>',sel,'</strong>'];
		},
		"1": function(sel) {
			return ['<em>',sel,'</em>'];
		},
		"2": function(sel) {
			return ['<blockquote>',sel,'</blockquote>'];
		},
		"3": function(sel) {
			return ['<code>',sel,'</code>'];
		},
		"4": function(sel) {
			return ['<javascript>',sel,'</javascript>'];
		},
		"5": function(sel) {
			return ['<html>',sel,'</html>'];
		},
		"6": function(sel) {
			return ['<a href="">',sel,'</a>'];
		},
		"7": function(sel) {
			return {
				selection: [this.ss(),this.se()],
				snippet: ['',sel.toLowerCase(),'']
			};
		},
		"8": function(sel) {
			return ['',sel.toUpperCase(),''];
		},
		"9": function(sel) {
			var mtoc = /<([^<>]*)>/g;
			return ['',sel.replace(mtoc,"&lt;$1&gt;"),''];
		}
	}

};