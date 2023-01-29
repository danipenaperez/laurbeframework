import laurbe from "../../core/core.module.js";
import extend from "../../core/common.module.js";

laurbe.prototype.ValidateCodeLoginView = extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'validateCodeLoginView',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "validateCodeLoginTemplate",
				url: '/html/components/login/validateCodeLoginTemplate.html'
	},
	/**
	* Return the div Id where the child element must be append
	**/
	_getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
    onShow(){
        
        var self=this;
        $('#'+this.id+'_continue_button').on('click', function(){
            //self.destroy();
			self.instanceProperties.onSuccess(self);
        });
    },
	close:function(){
		$('#'+this.id+'_close_button').click();
	}
		

});


/**
 * Constructor definition
 */
laurbe.ValidateCodeLoginView = function ValidateCodeLoginView(args){
	
	/** Init values for laurbe.navBar **/
	var defaults = {
		security:{
			title:'Login to MyApp'
		},
		onSuccess:function(){
			console.log('not Defined on Success behavour');
		}
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.ValidateCodeLoginView.type) ;

	/** Return the instance **/
	var instance = extend({}, laurbe.prototype.ValidateCodeLoginView, {instanceProperties:initializationProps});


	return instance;
}

console.log('Component ValidateCodeLoginView view Loaded');

export default laurbe;