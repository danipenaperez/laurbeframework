/**
 * The menu item prototype
 */
laurbe.prototype.ButtonGroup = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'buttonGroup',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "buttonGroupTemplate",
				url: '/html/components/form/buttonGroupTemplate.html'
	},
	onclickHandler: function(ev){
		alert('soy Button group');
		console.log(this);
		var currentObject = laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')];
		if(currentObject.instanceProperties.onclick){
			currentObject.instanceProperties.onclick(ev);
		}else{
			console.log('no hay event definido para '+currentObject.id);
		}

		//up the notification
		if(currentObject.owner && currentObject.owner.onChildItemEvent){
			currentObject.owner.onChildItemEvent(ev, ev, currentObject);
		}

		

	},
	onItemClicked:function (childItem){
		console.log(childItem.id+ ' me avisa que le han clickado ');
		console.log(this.instanceProperties.items);
	},
	/**
	* Return the div Id where the child element must be append
	**/
	_getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
		

});


/**
 * Constructor definition
 */
laurbe.ButtonGroup = function ButtonGroup(args){
	
	/** Init values **/
	var defaults = {
			text: 'button',
			//important do not use wrapper!!
			type:'primary',
			//align: 'float-right'
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.ButtonGroup.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.ButtonGroup, {instanceProperties:initializationProps});


	return instance;
}