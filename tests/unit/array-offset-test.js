/* global QUnit */
import Em from 'ember';
import ArrayOffset from 'array-offset';

QUnit.module('ArrayOffset');

QUnit.test('constructor exists', function (assert) {
	assert.ok(ArrayOffset, 'ArrayOffset is not null or undefined');
	assert.equal(typeof ArrayOffset, 'function', 'ArrayOffset is function');
});

QUnit.test('can be initialized without content', function (assert) {
	assert.ok(ArrayOffset.create(), 'ArrayOffset is created without content');
});

QUnit.test('content is initialized', function (assert) {
	var arr = Em.A(['a', 'b', 'c']);
	var proxy = ArrayOffset.create({
		content: arr
	});
	assert.equal(proxy.get('arrangedContent.length'), 3);
	assert.equal(proxy.get('content.length'), 3);
	assert.equal(proxy.get('length'), 3);
	assert.deepEqual(proxy.toArray(), ['a', 'b', 'c']);
});

QUnit.test('default offset', function (assert) {
	var proxy = ArrayOffset.create();
	assert.equal(proxy.get('offset'), 0, 'Default offset is zero');
});

QUnit.test('can be initialized with offset', function (assert) {
	var arr = Em.A(['a', 'b', 'c', 'd', 'e', 'f']);
	var proxy = ArrayOffset.create({
		content: arr,
		offset: 3
	});
	assert.equal(proxy.get('offset'), 3, 'Can set offset');
	assert.deepEqual(proxy.toArray(), ['d', 'e', 'f']);
});

QUnit.test('can update offset', function (assert) {
	var arr = Em.A(['a', 'b', 'c', 'd', 'e', 'f']);
	var proxy = ArrayOffset.create({
		content: arr
	});
	assert.equal(proxy.objectAt(0), 'a', 'Default offset');
	proxy.set('offset', 1);
	assert.equal(proxy.objectAt(0), 'b', 'Offset of 1');
	proxy.set('offset', 5);
	assert.equal(proxy.objectAt(0), 'f', 'Offset of 5');
	proxy.set('offset', 6);
	assert.equal(proxy.objectAt(0), undefined, 'Offset of content length');
});

QUnit.test('length is updated', function (assert) {
	var arr = Em.A(['a', 'b', 'c', 'd', 'e', 'f']);
	var proxy = ArrayOffset.create({
		content: arr
	});
	assert.equal(proxy.get('length'), 6, 'Default offset');
	proxy.set('offset', 1);
	assert.equal(proxy.get('length'), 5, 'Offset of 1');
	proxy.set('offset', 5);
	assert.equal(proxy.get('length'), 1, 'Offset of 5');
	proxy.set('offset', 6);
	assert.equal(proxy.get('length'), 0, 'Offset of content length');
});

QUnit.test('can push with no offset', function (assert) {
	var arr = Em.A(['a', 'b', 'c']);
	var proxy = ArrayOffset.create({
		content: arr
	});
	assert.equal(proxy.get('length'), 3, 'Initial length');
	assert.deepEqual(proxy.toArray(), ['a', 'b', 'c'], 'Initial length');
	arr.pushObject('d');
	assert.equal(proxy.get('length'), 4, 'Pushed 1 object');
	assert.deepEqual(proxy.toArray(), ['a', 'b', 'c', 'd'], 'Pushed 1 object');
	arr.pushObjects(['e', 'f']);
	assert.equal(proxy.get('length'), 6, 'Pushed 2 objects');
	assert.deepEqual(proxy.toArray(), ['a', 'b', 'c', 'd', 'e', 'f'], 'Pushed 2 objects');
});
