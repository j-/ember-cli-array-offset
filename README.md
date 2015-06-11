# ember-cli-array-offset

[![master branch build status][build-icon]][build-link]

Ember CLI array offset addon.

`ember-cli-array-offset` exposes an [Ember][ember] [ArrayProxy][proxy] subclass
which returns only the content array items after a certain offset.

## Example

```js
import Ember from 'ember';
import ArrayOffset from 'array-offset';

var arr = Ember.A(['a', 'b', 'c', 'd', 'e', 'f']);
var proxy = ArrayOffset.create({
	content: arr,
	offset: 3
});

console.log(proxy.toArray()); // ['d', 'e', 'f']
proxy.incrementProperty('offset');
console.log(proxy.toArray()); // ['e', 'f']
arr.pushObject('g');
console.log(proxy.toArray()); // ['e', 'f', 'g']
```

## Properties

**`content`**: Ember.Array (optional, default = `null`)

The content array. Must be an object that implements `Ember.Array` and/or
`Ember.MutableArray`. See [`Ember.ArrayProxy#content`][content].

**`offset`**: Number (optional, default = `0`)

This value determines the index of the first element to return.

## Installing

With [npm][npm]:

```sh
$ npm install --save-dev ember-cli-array-offset
```

Or with [Ember CLI][cli]:

```sh
$ ember install ember-cli-array-offset
```

## License

[MIT license](LICENSE.md).

[build-icon]: https://travis-ci.org/j-/ember-cli-array-offset.svg?branch=master
[build-link]: https://travis-ci.org/j-/ember-cli-array-offset
[ember]: http://emberjs.com/
[proxy]: http://emberjs.com/api/classes/Ember.ArrayProxy.html
[content]: http://emberjs.com/api/classes/Ember.ArrayProxy.html#property_content
[npm]: https://www.npmjs.com/
[cli]: http://www.ember-cli.com/
