import Em from 'ember';
var get = Em.get;
var computed = Em.computed;
var min = Math.min, max = Math.max;

var DEFAULT_OFFSET = 0;

var ArrayOffset = Em.ArrayProxy.extend({
	content: computed({
		get: function () {
			return Em.A();
		}
	}),

	offset: computed({
		get: function () {
			return DEFAULT_OFFSET;
		},
		set: function (name, offset, old) {
			offset = Number(offset); // ensure offset is number
			offset = max(offset, 0); // do not allow negative offset
			if (old === undefined) {
				// being set for first time, no need to update
				return offset;
			}
			var diff = offset - old;
			if (diff === 0) {
				// no need to continue if no difference
				return offset;
			}
			var arranged = this.get('arrangedContent');
			// offset added, remove items
			if (diff > 0) {
				var arrangedLength = get(arranged, 'length');
				var removeCount = min(diff, arrangedLength);
				arranged.replace(0, removeCount);
			}
			// offset removed, add items
			else {
				var content = this.get('content');
				var toAdd = content.slice(offset, old);
				arranged.replace(0, 0, toAdd);
			}
			return offset;
		}
	}),

	arrangedContent: computed('content', {
		get: function () {
			var content = this.get('content');
			var offset = this.get('offset');
			var slice = content.slice(offset);
			return Em.A(slice);
		}
	}),

	// process items removed
	contentArrayWillChange: function (arr, idx, removedCount/*, addedCount*/) {
		var arrangedContent = this.get('arrangedContent');
		var arrangedContentLength = this.get('arrangedContent.length');
		var offset = this.get('offset');
		var start = max(idx - offset, 0);
		var end = min(arrangedContentLength - start, removedCount);
		if (start < arrangedContentLength) {
			arrangedContent.replace(start, end);
		}
	},

	// process items added
	contentArrayDidChange: function (arr, idx, removedCount, addedCount) {
		var offset = this.get('offset');
		if (idx + addedCount > offset) {
			var toAdd = arr.slice(idx, idx + addedCount);
			var arrangedContent = this.get('arrangedContent');
			var start = idx - offset;
			arrangedContent.replace(start, 0, toAdd);
		}
	}
});

export default ArrayOffset;
