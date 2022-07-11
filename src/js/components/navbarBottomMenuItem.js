/**
 * The menu item prototype
 */
 laurbe.prototype.NavBarBottomMenuItem = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'navBarBottomMenuItem',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "navBarBottomMenuItemTemplate",
				url: '/html/components/navBar/navBarBottomMenuItemTemplate.html'
	},
	/**
	 * Returns the wrapper Id
	 */
	_getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
	onclickHandler: function(ev){
		console.log('soy item y me han pulsado');
		console.log(this);
		var currentObject = laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')];
		if(currentObject.instanceProperties.onclick){
			currentObject.instanceProperties.onclick(ev);
		}else{
			console.log('no hay event definido para '+currentObject.id);
		}

		//up the notification
		if(currentObject.owner){
			currentObject.owner.onChildItemEvent(ev, ev, currentObject);
		}
	},
	onItemClicked:function (menuItem){
		console.log(menuItem.id+ ' me avisa que le han clickado ');
		console.log(this.instanceProperties.items);
	},
	/**
	* Mark this item as active render
	**/
	setActive:function(isActive){
		if(isActive){
			this.instanceProperties.selected=true;
			$('#'+this.id).addClass('active');
		}else{
			this.instanceProperties.selected=false;
			$('#'+this.id).removeClass('active');
		}
	}	

});


/**
 * Constructor definition
 */
laurbe.NavBarBottomMenuItem = function NavBarBottomMenuItem(args){
	
	/** Init values for laurbe.navBar **/
	var defaults = {
			// wrapper:{
			// 	tag:'<div class="col text-center">'
			// },
			// text:'Option',
			// selected: true
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.NavBarBottomMenuItem.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.NavBarBottomMenuItem, {instanceProperties:initializationProps});


	return instance;
}