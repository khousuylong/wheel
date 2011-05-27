/**
 * Animator
 * @constructor
 */
YK.Animator = {
	_node: null,
	_startProperties: null,
	_endProperties: null,
	bindProperties: function(node, startProperties, endProperties, duration){
			node.startProperties = startProperties || {};
			node.endProperties = endProperties || {};
			node.duration = duration || "0.5s";

			for(var el in startProperties)
					node.style[el] = startProperties[el];
			node.style.WebkitTransitionDuration = duration;
			node.style.MozTransitionDuration = duration;
			node.style.OTransitionDuration = duration;
	},
	go: function(node){
			for(var el in node.endProperties)
					node.style[el] = node.endProperties[el];
	},
	back: function(node){
			for(var el in node.startProperties)
					node.style[el] = node.startProperties[el];
	}
}
