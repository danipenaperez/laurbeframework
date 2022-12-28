/**
 * Prototype Definition 
 */
 laurbe.prototype.NavBarBottom = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'navBarBottom',
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "navbarBottomWrapperTemplate",
				url: '/html/components/navBar/navBarBottomTemplate.html'
	},
	/**
	* Force a click over a item menu
	**/
	_selectMenuItem:function(menuItem){
		$.each(this.instanceProperties.items, function( index, item ) {
			if(menuItem.instanceProperties.id == item.instanceProperties.id){
				item.setActive(true);
			}else{
				item.setActive(false);
			}
		});
	},
	/**
	* Return the div Id where the child element must be append
	**/
	_getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
	onChildItemEvent:function (eventType, event, eventItem){
		console.log(eventItem.id+ ' me avisa que le han clickado ');
		console.log('sus hermanos son ');
		console.log(this.instanceProperties.items);
		$.each(this.instanceProperties.items, function( index, item ) {
		  		if(item.id==eventItem.id){
			  		item.setActive(true);
			  	}else{
			  		item.setActive(false);
			  	}
		});
	},
	/**
	* Clicked and MenuItemDlement
	**/
	onclickHandler: function(ev){
		console.log('soy navBarBottom y me han pulsado');
		/**
		var currentObject = laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')];
		if(currentObject.instanceProperties.onclick){
			currentObject.instanceProperties.onclick(ev);
		}else{
			console.log('no hay event definido para '+currentObject.id);
		}
		
		console.log(ev);
		console.log(ev.currentTarget.id);
		self = laurbe.Directory[ev.currentTarget.id];
		console.log(self.instanceProperties.items);
		$.each(self.instanceProperties.items, function( index, item ) {
					  	item.setActive();
					});
		 */
		
	}

});


/**
 * Constructor definition
 */
laurbe.NavBarBottom = function NavBarBottom(args){
	
	/** Init values for laurbe.navBar **/
	var navBarBottomDefaults = {
		
		wrapper:{
			tag:'<div>'
		},
		items: []
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, navBarBottomDefaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.NavBarBottom.type) ;
	
	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.NavBarBottom, {instanceProperties:initializationProps});
	

	
	return instance;
}