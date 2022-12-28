/**
 * Prototype Definition 
 */
laurbe.prototype.ModalDialog = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'modalDialog',
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "modalDialogTemplate",
				url: '/html/components/modalDialog/modalDialogTemplate.html'
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
	* Show the modalDialog
	**/
	show:function(){
		this.render();
	},
	_afterRender:function(){
		$('#'+this.id).show();
	},
	/**
	* hide it
	**/ 
	hide:function(){
		$('#'+this.id).hide();
	},
	/**
	* Clicked and MenuItemDlement
	**/
	onclickHandler: function(ev){
		console.log('soy modalDialog y me han pulsado');
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
		**/
		
	}

});


/**
 * Constructor definition
 */
laurbe.ModalDialog = function ModalDialog(args){
	
	/** Init values for laurbe.navBar **/
	var defaults = {
			title:'defaultTitle',
			renderTo:'appMainViewContainer',
			wrapper:{
				tag:'<div>'
			},
			items: []
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.ModalDialog.type) ;
	
	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.ModalDialog, {instanceProperties:initializationProps});
	

	
	return instance;
}