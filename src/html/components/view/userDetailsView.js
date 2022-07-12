/**
 * The menu item prototype
 */
laurbe.prototype.UserDetailsView = $.extend({}, laurbe.View, {
	/**
	* String type definition
	**/
	menuName:'Details'
	
		

});


/**
 * Constructor definition
 */
laurbe.UserDetailsView = function UserDetailsView(args, specifications){
	
	/** Init values **/
	var defaults = {
			menuName:'Details',
			items:[]
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.UserDetailsView, {instanceProperties:initializationProps});

	var layout = new laurbe.Layout({});
	var region = new laurbe.Region({});
	var form = new laurbe.Form({});
	$.each(args, function( key, value ) {
		console.log(item);
		form.items.push(new laurbe.TextField({
										label:key,
										value:value
									}));
	});

	return instance;
}