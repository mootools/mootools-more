Element.Event.Pseudo :keys {#Pseudos}
=====================================

Defines the `:keys` Element Event Pseudo. It captures key combinations and fires an event when all keys are pressed.

### See Also

- [Element.Event.Pseudos][]
- [Keyboard][]

### Note

- This plugin adds some common used keys to the keys you can use, like `-`, `end` or `=`. See for the complete list below.
- You can have multiple key combinations separated by comma

Pseudo: keys {#Pseudos:keys}
----------------------------

The event will only fire when a key combination is pressed. This only works with the `keydown` and `keyup` events.

### Examples

	myElement.addEvent('keydown:keys(shift+a+b)', function(){
		alert('You pressed the following keys: shift, a and b');
	});
	
	myElement.addEvent('keydown:keys(shift+a, delete, ,)', function(){
		alert('You pressed one of the following keys: shift + a, delete or ,');
	});


Element Event Keys
------------------

The following list is a list of the special characters you can use besides the alpha-numerical characters like a, b, 1 and 3.

- enter
- up
- down
- left
- right
- esc
- space
- backspace
- tab
- delete
- shift
- control
- alt
- capslock
- pageup
- pagedown
- end
- home
- numlock
- scrolllock
- ;
- =
- ,
- -
- .
- /
- `
- [
- \
- ]
- '
- +


[Element.Event.Pseudos]: /more/Element/Element.Event.Pseudos
[Keyboard]: /more/Interface/Keyboard
