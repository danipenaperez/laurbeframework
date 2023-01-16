import laurbe from "../../../core/core.module.js";
import extend from "../../../core/common.module.js";

laurbe.prototype.Profile =  extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'profile',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "profileTemplate",
				url: '/html/components/composite/profile/profileTemplate.html'
	},
    /**
     * Reference for current step
     */
    currentStep: null,
    currentIndexStep: 0,
	onclickHandler: function(ev){
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
    onShow: function(){
        console.log('mostrando profile');
    }
   
		

});


/**
 * Constructor definition
 */
laurbe.Profile = function Profile(args){
	
	/** Init values **/
	var defaults = {
			name:'',
			img:''
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps =  extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Profile.type) ;

	/** Return the instance **/
	var instance =  extend({}, laurbe.prototype.Profile, {instanceProperties:initializationProps});

    /**LOAD CSS */
    laurbe.utils.loadCSS('/stylesheets/components/composite/profile/profile.css');

	return instance;
}

console.log('Component Wizard Loaded');

export default laurbe;