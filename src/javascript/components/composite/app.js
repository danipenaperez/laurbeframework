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
laurbe.prototype.App = $.extend({}, laurbe.prototype.BaseAPP, {
	/**
	* String type definition
	**/
	type: 'app',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "layoutTemplate",
				url: '/html/components/layout/layoutTemplate.html'
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
laurbe.App = function APP(args){
	
	/** Init values for laurbe.navBar **/
	var defaults = {
			wrapper:{
				tag:'<div>',
				class:'mt-1' //Spacing tòp 1
			},
			text:'Option',
			selected: true
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Layout.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Layout, {instanceProperties:initializationProps});


	return instance;
}