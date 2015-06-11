/* global QUnit */
import Em from 'ember';
import ArrayOffset from 'array-offset';

QUnit.module('ArrayOffset');

QUnit.test('constructor exists', function (assert) {
	assert.ok(ArrayOffset, 'ArrayOffset is not null or undefined');
	assert.equal(typeof ArrayOffset, 'function', 'ArrayOffset is function');
});
