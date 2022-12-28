/**
 * The menu item prototype
 */
laurbe.prototype.Video = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'video',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "videoTemplate",
				url: '/html/components/video/videoTemplate.html'
	}
		

});


/**
 * Constructor definition
 */
laurbe.Video = function Video(args){
	
	/** Init values **/
	var defaults = {
			//src: 'http://clips.vorwaerts-gmbh.de/VfE_html5.mp4'
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Video.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Video, {instanceProperties:initializationProps});


	return instance;
}