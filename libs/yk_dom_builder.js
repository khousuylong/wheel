YK.domBuilder = {
	doc: document,
	create: function(args){
	    if(!args.tag){ return null; }
	    var tag;
	    if((args.name || args.type) && this.ie) {
	      var name = (args.name) ? "name='" + args.name + "'" : "";
	      var type = (args.type) ? "type='" + args.type + "'" : "";
	      var html = '<' + args.tag + ' ' + name + ' '+ type +' />';
	      tag = this.doc.createElement(html);
	      delete args.name;
	    }
	    else {
	        tag = this.doc.createElement(args.tag);
        }
	    delete args.tag;

	    if(args.append) {
	      args.append.appendChild(tag);
	      delete args.append;
	    }

	    args.edit = tag;
	    tag = this.edit(args);

	    return tag;
    },
    edit: function(args){
	    var tag = args.edit;
	    delete args.edit;

	    if(args.text) {
	      tag.appendChild(this.doc.createTextNode(args.text));
	      delete args.text;
	    }

	    if(args.className){
		    tag.className = args.className;
		    delete args.className;
	    }

		    //in IE dom.setAttribute("style", "...") doesn't work, so we need to split style string into pieces and assign them one by one to the dom
		    var style = args.style;
	    if (style && this.ie) {
		    var styleCollections = style.split(";"), len = styleCollections.length;
		    for (var i=styleCollections.length; i--;) {
			    var styleString = styleCollections[i].replace(/ /g, '');
			    if (styleString) {
                    var styleKeyValue = styleString.split(":");
                    tag.style[this._camelize(styleKeyValue[0])] = styleKeyValue[1];
			    }
		    }
		
		    delete style ;
	    }

	    for(property in args){
	      tag.setAttribute(property, args[property]);
	    }
	    return tag; 
    },
	/*
	* Return the width and height of given text
	* @param {string} - text to be measured
	* @return {array} - widht and height of text
	*/
	getTextSize: function(text){
		var span = YK.domBuilder.create({'tag': 'span', 'text': text});
		document.body.appendChild(span);
		var size = [span.offsetWidth, span.offsetHeight];
		document.body.removeChild(span);
		return size;
	},

	/**
	* showElement() method 
	* @param {object} dom  : dom object
	*/
	showElement: function(element){
		element.style.display = "block";
	},
	
	/**
	* showElement() method 
	* @param {object} dom  : dom object
	*/
	hideElement: function(element){
		element.style.display = "none";
	},
	
	isShowed: function(element){
	    return element.style.display === "none" ? false : true;
	},
	applyAttributes: function(dom, attr){
        for(var el in attr) dom.style[el] = attr[el];
	}
};
