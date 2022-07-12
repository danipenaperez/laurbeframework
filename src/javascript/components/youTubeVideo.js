/**
 * The menu item prototype
 */
laurbe.prototype.YouTubeVideo = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'youTubeVideo',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "youTubeVideoTemplate",
				url: '/html/components/video/youTubeVideoTemplate.html'
	}
		

});


/**
 * Constructor definition
 */
laurbe.YouTubeVideo = function YouTubeVideo(args){
	
	/** Init values **/
	var defaults = {
			//src: 'https://www.youtube.com/embed/fA4IHJnKYiw'
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.YouTubeVideo.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.YouTubeVideo, {instanceProperties:initializationProps});


	return instance;
}