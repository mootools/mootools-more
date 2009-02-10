THIS IS A TODO FILE

Script: PostEditor.js
	Using postEditor you can tabulate without losing your focus and maintain the tabsize in line brakes.
	You can also use snippets like in TextMate.

Author:
	Daniel Mota aka IceBeat, <http://icebeat.bitacoras.com>

Contributors:
	Sergio Álvarez aka Xergio, <http://xergio.net>
	Jordi Rivero aka Godsea, <http://godsea.dsland.org>
	Aaron Newton, <http://www.clientcide.com>

License:
	MIT-style license.

Class: PostEditor
	The base class of the postEditor.

Arguments:
	el - required. the textarea $(element) to apply postEditor.
	next - optional. the $(element) to apply the next tab (shift+enter).
	options - optional. The options object.

Options:
	snippets - optional, Snippets like in TextMate.
	smartTypingPairs - optional, smartTypingPairs.
	selections - optional, functions to execute with selections.
