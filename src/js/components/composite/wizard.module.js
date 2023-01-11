import laurbe from "../../core/core.module.js";
import extend from "../../core/common.module.js";

laurbe.prototype.Wizard =  extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'wizard',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "wizardTemplate",
				url: '/html/components/composite/wizard/wizardTemplate.html'
	},
    /**
     * Reference for current step
     */
    currentStep: null
    ,
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
        this.initShow();
    },
    /**
     * Manage initialization and first navigation
     */
    initShow:function(){
        alert(' inicializando el wizard');
        this.currentStep= this.instanceProperties.steps[0];
        console.log('y el current step es ');
        console.log(this.currentStep);
        alert(' voy a setear '+'wizard_breadCamp_'+this.currentStep.id);
        laurbe.utils.addClassToElement( 'wizard_breadCamp_'+this.currentStep.id,  'progressbar-selected-index');

        

    },
    /**
     * Show the specified step content, and update menu breadcomp
     * @param {} stepId 
     */
    showStep:function(stepIndex){

    }
		

});


/**
 * Constructor definition
 */
laurbe.Wizard = function Wizard(args){
	
	/** Init values **/
	var defaults = {
			items:[],
            title:'Wizard Untiled',
            description: 'Use this wizard to create account',
            steps:[
                {id: 'data', stepTitle:'Datos', formTitle:'Datos personales' , description: 'dame tus datos' },
                {id: 'payes', stepTitle:'Pagamientos', formTitle:'DAtos Bancarios' , description: 'como vas a pagar' },
                {id: 'ver', stepTitle:'Ya veo', formTitle:'Gafas personales' , description: 'pues yo no veo nada' },
                {id: 'finish', stepTitle:'Finalizar', formTitle:'Datos personales' , description: 'terminar' }
            ]
			// wrapper:{
			// 	tag:'<div>', 
			// 	class:'d-flex justify-content-center align-self-center'
			// }
			//,width:"32"
			//,height:"32"
            
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps =  extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Wizard.type) ;

	/** Return the instance **/
	var instance =  extend({}, laurbe.prototype.Wizard, {instanceProperties:initializationProps});
    /**LOAD CSS */
    laurbe.utils.loadCSS('/stylesheets/components/composite/wizard/wizard.css');

	return instance;
}

console.log('Component Wizard Loaded');

export default laurbe;