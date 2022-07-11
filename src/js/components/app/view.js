/**
**

var usersView = new View().fromRest("/users")
							.with({initView:'astable',excludedFields:['creditCard']})
							.and()
							.editData('asForm')
							.with({noneditableFields:['id','email','creditcard']});
var cartsView = new View().fromRest("/carts")
							.with({initView:'table'})
							and()
							.editData('asForm').
							with('notEditable');
var app = new App().withStyleDetfauls().usingViews([new View({'users'}),new View({'carts'})]);
**/
laurbe.prototype.View = $.extend({}, laurbe.BaseViewElement, {

	type:'view',
	/**
	* flag for initialization of current Object
	**/
	initialized:false,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
			scriptId : "viewTemplate",
			url: '/html/components/layout/viewTemplate.html'
	},
	/**
	*
	**/
	instanceProperties:{
		/**
		 *  the App title and name
		**/
		menuName: 'View 1',
		

	},
	/**
	 * If this view is associate with a topNavBar Menu Item
	 */
	relatedMenuItem:null,
	/**
	* View elements
	**/
	items:[],
	
	/**
	* Builds:
	**/
	// init:function(){
	// 	this.id = this.instanceProperties.id;
	// 	laurbe.Directory[this.id] = this;
	// 	initialized=true;
	// },

	// renderTo:function(wrapperId){
	// 	console.log('soy el render to de la view '+wrapperId);
	// 	$.each(this.instanceProperties.items, function( index, item ) {
	// 		item.renderTo(wrapperId);
	// 	});
	// },
	/**
	* Return the div Id where the child element must be append
	**/
	_getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
	onShow:function(){
		laurbe.logger.log('estoy haciendo onshow de una View '+this.id );
		if(this.instanceProperties.onShow)
			this.instanceProperties.onShow(this);
	},
	/**
	 * Called on view infinite scroll
	 */
	onInfiniteScroll:function(){
		console.log('estoy on infiniteScroll');
		if(this.instanceProperties.onInfiniteScroll)
			this.instanceProperties.onInfiniteScroll(this);
		
	}
});


/**
 * Constructor definition
 */
laurbe.View = function View(args){
	
	/** Init values for laurbe.navBar **/
	var defaults = {
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || initializationProps.menuName+'_View' ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.View, {instanceProperties:initializationProps});


	return instance;
}