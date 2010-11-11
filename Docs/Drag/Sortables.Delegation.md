Class: Sortables.Delegation {#Sortables.Delegation}
===================================================

An event delegated interface for drag and drop sorting.

### Extends Sortables

* [Sortables][]

### Syntax

	new Sortables.Delegation([list, options])

### Arguments

1. list - (*mixed*) required, the list or lists that will become sortable.
 * This argument can be an [Element][], an array of [Elements][], or a selector. When a single list (or id) is passed, that list will be sortable only with itself.
 * To enable sorting between lists, one or more lists or id's must be passed using an array or a selector. See Examples below.
2. options - (*object*) See options and events below.

### Options

* all options defined by [Sortables][], plus:
* relay - (*string*; defaults to '*') A selector used to target which child elements will become sortable.

### Events

* all events defined by [Sortables][]

### Notes

- Adding a sortable item is as simple as injecting an element into a list element.

Sortables Method: addLists {#Sortables:addLists}
------------------------------------------------

Allows one or more entire lists to be added to an existing Sortables instance, allowing sorting between the new and old lists. The relay specified in the instance options will be applied in delegating these lists.

### Syntax

	mySortables.addLists(list1[, list2[, list3[, ...]]]);

### Arguments

1. lists - (*mixed*) Since Array.flatten is used on the arguments, a single element, several elements, an array of elements, or any combination thereof may be passed to this method.

### Returns

* (*object*) This Sortables instance.

### Examples

	var mySortables = new Sortables('list1');
	mySortables.addLists($('list2'));

### See Also

- [Sortables:removeLists](#Sortables:removeLists)

Sortables Method: removeLists {#Sortables:removeLists}
------------------------------------------------------

Allows one or more entire lists to be removed from an existing Sortables instance, preventing sorting between the lists.

### Syntax

	mySortables.removeLists(list1[, list2[, list3[, ...]]]);

### Arguments

1. lists - (*mixed*) Since Array.flatten is used on the arguments, a single element, several elements, an array of elements, or any combination thereof may be passed to this method.

### Returns

* (*Elements*) An Elements collection of all the lists that were removed.

### Examples

	var mySortables = new Sortables('#list1, #list2');
	mySortables.removeLists($('list2'));

### See Also

- [Sortables:addLists](#Sortables:addLists)
