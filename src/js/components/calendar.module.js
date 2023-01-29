import laurbe from "../core/core.module.js";
import extend from "../core/common.module.js";
import calendar from "../../thirdparty/js/calendar_one_clck.js";


laurbe.prototype.Calendar =  extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'calendar',
	/**
	* The laurbe owner element
	**/
	owner:null,
    /**
     * Main core
     */
    engine:calendar,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "calendarTemplate",
				url: '/html/components/calendar/calendarTemplate.html'
	},
	onclickHandler: function(ev){
		console.log('onClickHander del calendar');
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
	},
	/**
	* Return the div Id where the child element must be append
	**/
	_getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
    /**
     * On show loading
     * @param {} args 
     */
    onShow:function(args){
        
        this.engine.init();
        
    }
		

});


/**
 * Constructor definition
 */
laurbe.Calendar = function Calendar(args){
	
	/** Init values **/
	var defaults = {
        style:{
            custom:'min-height: 600px;width: 100%;'
        },
        /**
        wrapper:{
            tag:'<div>',
            class :'container'
            //,class:'d-flex justify-content-center align-self-center'
        }
        **/
			
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps =  extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Calendar.type) ;

	/** Return the instance **/
	var instance =  extend({}, laurbe.prototype.Calendar, {instanceProperties:initializationProps});

    /**LOAD CSS */	
    laurbe.utils.loadCSS('/stylesheets/components/calendar/calendar.css');

	return instance;
}

console.log('Component Calendar Loaded');

export default laurbe;