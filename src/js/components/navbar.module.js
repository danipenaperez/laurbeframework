import laurbe from "../core/core.module.js";
import extend from "../core/common.module.js";
import BaseViewElement from "./baseView.module.js"

laurbe.prototype.NavBar =  extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'navBar',
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "navbarWrapperTemplate",
				url: '/html/components/navBar/navBarTemplate.html'
	},
	/**
	* Force a click over a item menu
	**/
	_selectMenuItem:function(menuItem){
		this.instanceProperties.items.forEach(function (item, index) {
			if(menuItem.instanceProperties.id == item.instanceProperties.id){
				item.setActive(true);
			}else{
				item.setActive(false);
			}
		});

	},
	/**
	* Return the div Id where the child element must be append
	**/
	_getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
	onChildItemEvent:function (eventType, event, eventItem){
		console.log(eventItem.id+ ' me avisa que le han clickado ');
		console.log('sus hermanos son ');
		console.log(this.instanceProperties.items);
		 $.each(this.instanceProperties.items, function( index, item ) {
		  		if(item.id==eventItem.id){
			  		item.setActive(true);
			  	}else{
			  		item.setActive(false);
			  	}
		});
	},
	/**
	* Clicked and MenuItemDlement
	**/
	onclickHandler: function(ev){
		console.log('soy navBar y me han pulsado');
		/**
		var currentObject = laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')];
		if(currentObject.instanceProperties.onclick){
			currentObject.instanceProperties.onclick(ev);
		}else{
			console.log('no hay event definido para '+currentObject.id);
		}
		
		console.log(ev);
		console.log(ev.currentTarget.id);
		self = laurbe.Directory[ev.currentTarget.id];
		console.log(self.instanceProperties.items);
		 each(self.instanceProperties.items, function( index, item ) {
					  	item.setActive();
					});
		**/
		
	}

});


/**
 * Constructor definition
 */
laurbe.NavBar = function NavBar(args){
	
	console.log('y los themes son ');
	console.log(laurbe.themes);
	let theme = laurbe.themes['dark'];
	console.log('el theme elegido es ');
	console.log(theme);

	/** Init values for laurbe.navBar **/
	var navBarDefaults = {
			title:'defaultTitle',
			wrapper:{
				tag:'<div>'
			},
			brand:{
				logoUrl:'https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-outline.svg',
				extraClass:'rounded-circle'
			},
			// theme:theme,
			/**
			 * Indica donde queda fijo el menu
			 * Si es fixed-top  debe tener esto el body para que el contenido no se meta debajo del navbar
			 * fixed-top: siempre fijo arriba
			 * body{
				min-height: 75rem;
				padding-top: 4.5rem;
				}  
				fixed-bottom: siempre fijo abajo
				vacio: se muestra inblock y no hace falta aplicar nada al body, pero al hacer scroll se pierde
			 */
			position: 'fixed-top',
			/**
			 * If true, the menu is centered an not fully expanded
			 * default false, so fully centered
			 */
			centered: false, 
			//bg_color: 'bg-dark',  
			items: []
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps =  extend({}, navBarDefaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.NavBar.type) ;
	
	/** Return the instance **/
	var instance =  extend({}, laurbe.prototype.NavBar, {instanceProperties:initializationProps});
	
	
	console.log('y el position es ')
	console.log(instance.instanceProperties.position);
	if('fixed-top' == instance.instanceProperties.position){
		console.log('es top');
		console.log('es top');
		console.log('es top');
		// document.body.style['min-height'] = '75rem'; si dejo esto, saca siempre scroll y hay que calcular, asi que mal, lo quito
		document.body.style['padding-top'] = '4.5rem';
	}else if('fixed-bottom' == instance.instanceProperties.position){
		console.log('fixed-bottom');
		console.log('fixed-bottom');
		console.log('fixed-bottom');
		// document.body.style['min-height'] = '75rem';
		document.body.style['padding-top'] = '0px';
		document.body.style['padding-bottom'] = '2.5rem';
	}else if('fixed-left'== instance.instanceProperties.position){
		//referenced https://github.com/mladenplavsic/bootstrap-navbar-sidebar

		//TODO: CAmbiar para sacar el path de laurbe.configuration
		laurbe.utils.loadCSS('/thirdparty/css/navbar-fixed-left.css'); //TODO: No funciona bien con el brand y overflow de textos largos
	}else if('fixed-right'== instance.instanceProperties.position){
		//referenced https://github.com/mladenplavsic/bootstrap-navbar-sidebar
		laurbe.utils.loadCSS('/thirdparty/css/navbar-fixed-rigth.css'); //TODO: No funciona bien con el brand y overflow de textos largos
	}else if('transparent-top'== instance.instanceProperties.position){
		//referenced https://github.com/mladenplavsic/bootstrap-navbar-sidebar
		laurbe.utils.loadCSS('/thirdparty/css/navbar-fixed-rigth.css'); //TODO: No funciona bien con el brand y overflow de textos largos
	}
	
	return instance;
}

console.log('Component NavBar Loaded');

export default laurbe;