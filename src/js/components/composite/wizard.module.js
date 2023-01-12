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
        this.initShow();
    },
    /**
     * Manage initialization and first navigation
     */
    initShow:function(){
        
        this.instanceProperties.steps.forEach(function (item, index) {
            item._renderTo('stepWrapperContent_'+item.instanceProperties.id);
        });


        this.setBreadCamp(0);
        // this.currentStep= this.instanceProperties.steps[0];
        console.log('y el current step es ');
        console.log(this.currentStep);
        

        
        // laurbe.utils.addClassToElement( 'wizard_breadCamp_'+this.currentStep.id,  'progressbar-selected-index');
        // laurbe.utils.addClassToElement( 'wizard_breadCamp_'+this.currentStep.id,  'active');
        // this.instanceProperties.steps.forEach(function (item, index) {
        //     if(index>0){
        //         laurbe.utils.addClassToElement( 'wizard_breadCamp_'+item.id,  'progressbar-selected-index'); 
        //     }
        // });
        

        //Bind buttons 
        $('#'+'nextButton_wizard_'+this.id).on('click', this.onNext);
        $('#'+'previousButton_wizard_'+this.id ).on('click', this.onPrevious);
        console.log('#'+'wizard_'+this.id+'_nextButton');

    },
    setBreadCamp:function(currentStepIndex){
        let targetIndexStep = currentStepIndex || 0;
        let targetStep = this.instanceProperties.steps[targetIndexStep];
        console.log('targetStep es ');
        console.log(targetStep);
        let self = this;
        console.log('y this es ');
        console.log(this);
        this.instanceProperties.steps.forEach(function (item, index) {

            console.log(item);
            console.log(item.instanceProperties.id);
            laurbe.utils.addClassToElement( 'wizard_breadCamp_'+item.instanceProperties.id,  'progressbar-selected-index');
            console.log('estoy comparando '+ targetStep.instanceProperties.id +  ' con ' + item.instanceProperties.id);
            if(targetStep.instanceProperties.id == item.instanceProperties.id){
                laurbe.utils.addClassToElement( 'wizard_breadCamp_'+item.instanceProperties.id,  'active'); 
                $('#'+'stepWrapperContent_'+item.instanceProperties.id).show();
            }else{
                laurbe.utils.removeClassToElement( 'wizard_breadCamp_'+item.instanceProperties.id,  'active'); 
                $('#'+'stepWrapperContent_'+item.instanceProperties.id).hide();
            }

        });
        this.currentIndexStep=targetIndexStep;
        this.currentStep=targetStep;
    },
    onNext:function(){
        
        console.log(this.id);
        let wizardID = this.id.replace('nextButton_wizard_', '');
        let wizard = laurbe.Directory[wizardID];
        wizard.setBreadCamp(wizard.currentIndexStep+1);
    },
    onPrevious:function(){
        console.log(this.id);
        let wizardID = this.id.replace('previousButton_wizard_', '');
        let wizard = laurbe.Directory[wizardID];
        wizard.setBreadCamp(wizard.currentIndexStep-1);
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
			title:'Wizard Untiled',
            description: 'Use this wizard to create account',
            steps:[
                new laurbe.WizardStep({ //id: 'data', 
                                        stepTitle:'Datos', 
                                        formTitle:'Datos personales' , 
                                        description: 'dame tus datos',
                                        items:[
                                            new laurbe.Form({
                                                items:[
                                                    new laurbe.TextField({
                                                        //label:'email',
                                                        value:'aucton@hotmail.com'
                                                    }),
                                                    new laurbe.TextField({
                                                        //label:'edad',
                                                        value:'25'
                                                    }),
                                                    new laurbe.TextField({
                                                        //label:'Features',
                                                        value:'vago y gandul'
                                                    })
            
                                                ]
                                            })
                                        ]
                                    }),
                new laurbe.WizardStep({ //id: 'payes', 
                                        stepTitle:'Pagamientos', 
                                        formTitle:'DAtos Bancarios' , 
                                        description: 'como vas a pagar' , 
                                        items:[
                                            new laurbe.Image({
                                                img_src: 'http://es.web.img2.acsta.net/c_215_290/medias/nmedia/18/92/45/07/20200361.jpg',
                                                alt:'Amrio casa',
                                                onclick: function(){
                                                    alert('me han clickado y soy la imagen del '+this.alt);
                                                    loadMore();
            
                                                }
                                            })
                                        ]
                                    }),

                new laurbe.WizardStep({//id: 'ver', 
                                    stepTitle:'Ya veo', formTitle:'Gafas personales' , description: 'pues yo no veo nada', 
                items:[
                    new laurbe.Image({
                        img_src: 'http://es.web.img2.acsta.net/c_215_290/medias/nmedia/18/92/45/07/20200361.jpg',
                        alt:'Amrio casa',
                        onclick: function(){
                            alert('me han clickado y soy la imagen del '+this.alt);
                            loadMore();

                        }
                    })
                ] }),
                new laurbe.WizardStep({//id: 'finish', 
                                        stepTitle:'Finalizar', formTitle:'Datos personales' , description: 'terminar', 
                items:[
                    new laurbe.Image({
                        img_src: 'http://es.web.img2.acsta.net/c_215_290/medias/nmedia/18/92/45/07/20200361.jpg',
                        alt:'Amrio casa',
                        onclick: function(){
                            alert('me han clickado y soy la imagen del '+this.alt);
                            loadMore();

                        }
                    })
                ] })
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

    /** Add references step to Divs */
    instance.instanceProperties.steps.forEach(function (item, index) {
        item.parentWizardId=instance.instanceProperties.id;
    });

	return instance;
}

console.log('Component Wizard Loaded');

export default laurbe;