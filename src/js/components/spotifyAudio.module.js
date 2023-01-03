import laurbe from "../core/core.module.js";
import extend from "../core/common.module.js";
import BaseViewElement from "./baseView.module.js"

laurbe.prototype.SpotifyAudio =  extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'spotifyAudio',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "spotifyAudioTemplate",
				url: '/html/components/audio/spotifyAudioTemplate.html'
	}
		

});


/**
 * Constructor definition
 */
laurbe.SpotifyAudio = function SpotifyAudio(args){
	
	/** Init values **/
	var defaults = {
			//src: 'https://www.youtube.com/embed/fA4IHJnKYiw'
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps =  extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.SpotifyAudio.type) ;

	/** Return the instance **/
	var instance =  extend({}, laurbe.prototype.SpotifyAudio, {instanceProperties:initializationProps});


	return instance;
}

console.log('Component SpotifyAudio Loaded');

export default laurbe;