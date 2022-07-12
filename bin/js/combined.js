var functionalFunction = {
	
	afterThen:function(){

	},
	then:function(){
		
		return this;
	}

}

/**
**

var usersView = new View().fromRest("/users")
							.with({initView:'astable',excludedFields:['creditCard']})
							.and()
							.editData('asForm')
							.with({noneditableFields:['id','email','creditcard']});
var cartsView = new View().fromRest("/carts")
							.with({initView:'table'})
							and()
							.editData('asForm').
							with('notEditable');
var app = new App().withStyleDetfauls().usingViews([new View({'users'}),new View({'carts'})]);
**/
/**
 * Main object namespace

 $('<div/>', {
    'id':'myDiv',
    'class':'myClass',
    'style':'cursor:pointer;font-weight:bold;',
    'html':'<span>For HTML</span>',
    'click':function(){ alert(this.id) },
    'mouseenter':function(){ $(this).css('color', 'red'); },
    'mouseleave':function(){ $(this).css('color', 'black'); }
}).appendTo('body');
 */
var laurbe ={
		logger: {
			enabled:true,
			log:function(obj){
				if(this.enabled){
					console.log(obj);
				}
			}
		},
		/**
		 * Reference for all created elements
		 */
		Directory:{

		},
		/**
		 * Reference for current APP Instance
		 */
		currentApp:{

		},
		FunctionalElement:{
			lastWithReference:this,
			lastAndReference:this,
			with:function(){
				return this;
			},
			and:function(){
				return this;
			}
		},
		/**
		 * Base view element 
		 */
		BaseViewElement:{
			/**
			* String type definition
			**/
			type: 'laurbeBaseViewElement',
			/**
			 * Current element Id
			 */
			id:null,
			/**
			 * The wrapper element
			 */
			ele:null,
			/**
			 * InstanceProperties
			 */
			instanceProperties:null,
			/**
			* flag for initialization of current Object
			**/
			initialized:false,
			/**
			* Returns the id
			**/
			_getName: function(){
				return this.id;
			},
			/**
			* RenderTo Element Jquery reference
			**/
			fatherElement: null,
			/**
			* initialize the wrapper
			**/
			_init: function(){
				this.id = this.instanceProperties.id;
				laurbe.Directory[this.id] = this;
				this.fatherElement = $('#'+this.instanceProperties.renderTo);
				
				if(this.instanceProperties.wrapper && this.instanceProperties.wrapper.tag){
					this.ele = $(this.instanceProperties.wrapper.tag, { 
											 'id':this.id+'Wrapper',
											 'click': this.onclickHandler,
											 'class': this.instanceProperties.wrapper.class
											 //'html':'<span> soy el '+this.id+'</span>'
								 			});
					this.ele.appendTo(this.fatherElement);
				}else{
					this.ele = this.fatherElement; //father and elewrapper are the same object
				}
				//this.bindEvents();
				if(!this.instanceProperties.items){
					this.instanceProperties.items =[];
				}
				this.initialized = true;
			},
			/**
			* If the component is based on template building
			**/
			template: null,

			
			_render: function(){
				if(!this.initialized){
			  		this._init();
			  	}
				if(this.template){
					var self = this;
					var templateInfo = {appendTo: self.ele, data: self.instanceProperties};
					//always load to templateManager div container
					$('#templateManager').load(laurbe.templateManager.templatePath+self.template.url, function(templateString,  ajaxObject, ajaxState){
						$('#'+self.template.scriptId).tmpl(templateInfo.data).appendTo(templateInfo.appendTo);
						self._afterRender();
						if(self.onShow){
							self.onShow(this);
						}
					});
				}
				
				// else{
				// 	console.log('no tiene on show '+ this.id);
				// }
			},
			/**
			* Rebuild/reinitalize the entire element, and render
			**/
			_renderTo:function(wrapperId){
				this.instanceProperties.renderTo=wrapperId;
				this.initialized=false;
				this._render();
			},
			//reload the view component
			refresh:function(){
				console.log('laurbe.refresh()');
				this.destroy();
				this._render();
				// console.log('refreshcated');
			},
			/**
			* After render callback
			**/
			_afterRender:function(){
				if(!this.instanceProperties.wrapper){ //usefull when this.instanceProperties.wrapper is undefined
					$('#'+this.id).on('click', this.onclickHandler);
				}
				
				var self = this;
				//self.bindEvents();
				if(self.instanceProperties.items){
					$.each(self.instanceProperties.items, function( index, item ) {
						item.owner = self;//reference to parent laurbe object
					  	item._renderTo(self._getRenderChildWrapperId());
					});
					// for(item of self.instanceProperties.items){
					// 	item.owner = self;//reference to parent laurbe object
					//   	item._renderTo(self._getRenderChildWrapperId());
					// }
					// for  (i=0;i<self.instanceProperties.items.length;i++){
					// 	self.instanceProperties.items[i].owner = self;//reference to parent laurbe object
					// 	self.instanceProperties.items[i]._renderTo(self._getRenderChildWrapperId());
					// }
				}

			},
			/**
			* If exists this.items (child laurbe Objects) will renderIt
			**/
			_appendChilds:function(items, renderNow){
				var self = this;
				// $.each(items, function( index, item ) {
				// 	console.log('_appendChilds '+ self._getRenderChildWrapperId());
				// 	self.instanceProperties.items.push(item);
				// 	item.owner = self;//reference to parent laurbe object
				//   	item.instanceProperties.renderTo = self._getRenderChildWrapperId();
				//   	if(renderNow == true){
				// 	  	item._render();
				// 	}
				// });

				for  (i=0;i<items.length;i++){  // Maybe ensure synchronously
					console.log('_appendChilds '+ self._getRenderChildWrapperId());
					var item = items[i];
					self.instanceProperties.items.push(item);
					item.owner = self;//reference to parent laurbe object
				  	item.instanceProperties.renderTo = self._getRenderChildWrapperId();
				  	if(renderNow == true){
					  	item._render();
					}
				}

			
			},

			/**
			* Where to render child elements
			**/
			_getRenderChildWrapperId:function(){
				console.log('The component '+ this.id+ ' not allows child objects');
			},
			/**
			* Remove all childs
			*/
			removeAllChilds:function(){
				console.log('laurbe.removeAllChilds()');
				$('#'+this._getRenderChildWrapperId()).empty();//jquery visual destroy
				this.instanceProperties.items = []; //reinitialize items as empty array
				// console.log('all childs have been removed');
			},
			/**
			* destroy the element
			**/
			destroy:function(){
				console.log('laurbe.destroy()')
				var self = this;
				$.each(this.items, function( index, item ) {
					destroy();
				});
				this.fatherElement.empty();//jquery visual destroy
				// console.log('internal destroy END');
			},
			/**
			* default onclick framework handlers
			**/
			onclickHandler: function(ev){
				if(true){
					console.log('laurbe.OnclickHandler()')
					// console.log('el evento es');
					// console.log(ev);
					// console.log(' y el elemento es');
					// console.log(this);
					// console.log('y el laurbe element es ');
					// console.log(laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')]);
				}
			},
			/**
			* To string log traces
			**/
			toString:function(){
				console.log('-----------------------');
				console.log('instanceProperties');
				console.log(this.instanceProperties);
				console.log('this.ele');
				console.log(this.ele);
				console.log('this.fatherElement');
				console.log(this.fatherElement);
				console.log('-----------------------');
			}

		},
		/**
		 * Default store for prototype loaded references
		 * (if the Js file is loaded will be added here to be available
		 */
		prototype:{
			BaseApp:{},
			BaseView:{},
			composite:{}
		},
		
		
		/***********************************/
		/***********************************/
		/***********************************/
		
		
		
		/**
		 * Utils 
		 */
		utils:{
			id:0,
			/**
			 * Return a generated unique sequencial string
			 */
			getIdFor:function(prefix){
				this.id++;
				return prefix + this.id;
			},
			isMobile:function(){
				var isMobile = {
					Android: function() {
						return navigator.userAgent.match(/Android/i);
					},
					BlackBerry: function() {
						return navigator.userAgent.match(/BlackBerry/i);
					},
					iOS: function() {
						return navigator.userAgent.match(/iPhone|iPad|iPod/i);
					},
					Opera: function() {
						return navigator.userAgent.match(/Opera Mini/i);
					},
					Windows: function() {
						return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
					},
					any: function() {
						return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
					}
				};
				return isMobile.any();
			},
			focusAndScrollToElement:function(elementId){
				var el = document.getElementById(elementId);
    			el.scrollIntoView(true);
			},
			pairDataArraywise(arr,groupSize , func ){
				groupSize = groupSize || 1;
				var index=0;
				var maxSinglesRepeated=3;
				var currentSingleRowRepeated=0;
				for(index; index < arr.length; index=index+2){
					if(Math.random() < 0.5){
						func(arr[index], arr[index + 1]);
						currentSingleRowRepeated=0;
					}else{
						if(currentSingleRowRepeated < maxSinglesRepeated){
							func(arr[index]);
							index=index-1;
							currentSingleRowRepeated++;
						}else{
							func(arr[index], arr[index + 1]);
							currentSingleRowRepeated=0;
						}
						
					}
					
				}
			}
		},

		/**
		* Init framework
		**/
		_init:function(){
			//create div to load template Manager
			this.templateManager._init();
			this.modalDialogManager._init();//create div to load modalDialog Manager
		},
		/**
		* Template Manager
		*  
		* https://stackoverflow.com/questions/327047/what-is-the-most-efficient-way-to-create-html-elements-using-jquery
		*
		**/
		templateManager:{
			templatePath: '.',
			initialized:false,
			_init: function(){
				if(!this.initialized){
					$('<div/>', { 'id':'templateManager'}).appendTo('body');
					console.log('templateManager Initialized OK.');
				}else{
					console.log('templateManager Already Initialized.');
				}
			}	
		},
		modalDialogManager:{
			templatePath: '.',
			initialized:false,
			_init: function(){
				if(!this.initialized){
					$('<div/>', { 'id':'modalDialogManager'}).appendTo('body');
					console.log('modalDialogManager Initialized OK.');
				}else{
					console.log('modalDialogManager Already Initialized.');
				}
			}	
		},
		DAOManager:{

		},
		LocalStorageManager:{

		},
		Navigator:{

		},
		ShareSocialManager:{

		}
		

};

laurbe._init();


/*****************************
 * PASAR A OTROS ARCHIVOS
 ****************************/

/**
 *  Base de todas las vistas compuestas
 */
 laurbe.CompositeViewElement = {
		/**
		* String type definition
		**/
		type: 'laurbeBaseViewElement',
 }
/**
 * The menu item prototype
 */
 laurbe.prototype.NavigatorManager = $.extend({}, laurbe.Navigator, {

	/**
	 * Base host url (http://localhost:3000/myapi)
	 */
	urlParamsMap:{
        viewId: 'viewId'
    },
    /**
     * History loading
     */
    history:[],
    /**
     * Related Main APP
     */
    relatedApp:null,
	/**
	* Initialization DAO Phase
	**/
	init:function(){
	},
    /**
     * From a queryString key=val$key2=val2 ... returns ajavascript object
     * can be used as var val1 = laurbe.utils.getUrlVars()["key1"];
     * @returns 
     */
    _getURLArgs:function(){
        var vars = [], hash;
        var hashes = window.location.href.slice(window.location.href.indexOf('?') + 1).split('&');
        for(var i = 0; i < hashes.length; i++)
        {
            hash = hashes[i].split('=');
            vars.push(hash[0]);
            vars[hash[0]] = hash[1];
        }
        return vars;
    },
    /**
     * Return a String with this format key1=val1&key2=val2&key3=val3 ....
     * @param {javascript object} obj 
     */
    _toKeyValueQueryParams:function(data){
        var str = Object.keys(data).map(key => `${key}=${data[key]}`).join("&");
        return str;
    },
	/**
	* Return the current viewId Url Parameter
	**/
	getCurrentViewId: function(){
		return this._getURLArgs()[this.urlParamsMap.viewId];
	},
    /**
	* Return the current viewId Url Arg Parameter
	**/
	getCurrentViewArg: function(paramName){
        console.log('los argumentos actuales son ');
        console.log(this._getURLArgs());
        console.log('------');
		return this._getURLArgs()[paramName];
	},
    /**
     * 
     * @returns Returns the whole URL for the current View
     */
    getCurrentViewCompleteURL: function(){
        return window.location.href;
    },
    /**
	* Return the current viewId Url All args
	**/
	getCurrentViewAllArgs: function(){
		return this._getURLArgs();
	},
    /**
     * Store Navigation Info
     * @param {} viewId 
     * @param {*} args 
     */
    storeNavigationInfo:function(viewId, args){
		if(!args)
			args={};
		args.viewId=viewId;
		var view_args = this._toKeyValueQueryParams(args);
		//1.Set the navigation params and add to history
		var destinationURL = window.location.protocol + "//" + window.location.host + window.location.pathname + '?'+view_args;    
        //2.store local array
        this.history.push({viewId:viewId, args:args});
        
        window.location.hash=viewId;
        //3.Write to URL Navbar
        window.history.pushState({ path: destinationURL }, '', destinationURL);
    },
    onBackPressNavigation:function(){
        //alert('vamos patras ');
        var hist='';
        for(i=0;i<this.history.length;i++){
            hist=hist+this.history[i]+' \r ';
        }

        //alert(hist);
        // console.log('y la app es');
        // console.log(this.relatedApp);
        
        //alert('la ulrima vista es '+ last.viewId+ ' '+last.args);

        if(this.history.length > 1 ){
            var last = this.history[this.history.length - 2];
            alert('estoy en '+ this.getCurrentViewId()+' y last es '+ last.viewId);

            //if(JSON.stringify(last) == JSON.stringify())
            //this.relatedApp._navigate(last.viewId, last.args);
        }else{
            alert('No tengo historial');
        }
          
    }
	

});


/**
 * Constructor definition
 * for a common Rest DaO
 */
laurbe.NavigatorManager = function NavigatorManager(args){
	
	/** Init values **/
	var defaults = {
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.NavigatorManager, initializationProps);


	return instance;
}
/**
 * The menu item prototype
 */
 laurbe.prototype.ShareSocialManager = $.extend({}, laurbe.ShareSocialManager, {
    /**
     * Navigator Reference
     */
    navigatorManager:null,
	/**
	* Initialization Phase
	**/
	init:function(){
	},
    /**
     * Show all available share applications installed
     * @returns 
     */
    shareCurrentViewToAllAvailable:function(title, viewURL){
        const shareData = {
            title: title,
            text: 'Join to Vulgus',
            url: viewURL
        };
        //if(navigator && navigator.canShare()){
            navigator.share(shareData);
        // }else{
        //     console.log('Current Device not support native WebShareAPI');
        // }    
    },
    /**
     * Show specified Vendor Wasap
     * @returns 
     */
     shareCurrentViewToWassap:function(viewURL){
        if(laurbe.utils.isMobile()){ //Native Mobile Device
            document.location.href = "whatsapp://send?text="+viewURL;
        }else{ //Web APP api
            document.location.href = "https://api.whatsapp.com/send?phone=1111111111&text="+viewURL;
        }
        
    }
});


/**
 * Constructor definition
 * 
 */
laurbe.ShareSocialManager = function ShareSocialManager(args){
	
	/** Init values **/
	var defaults = {
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.ShareSocialManager, initializationProps);


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.Button = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'button',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "buttonTemplate",
				url: '/html/components/form/buttonTemplate.html'
	},
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
	}
		

});


/**
 * Constructor definition
 */
laurbe.Button = function Button(args){
	
	/** Init values **/
	var defaults = {
			//text: 'button',
			//important do not use wrapper!!
			type:'primary',
			//align: 'float-right',
			//extraClass:'btn-block'
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Button.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Button, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.ButtonGroup = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'buttonGroup',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "buttonGroupTemplate",
				url: '/html/components/form/buttonGroupTemplate.html'
	},
	onclickHandler: function(ev){
		alert('soy Button group');
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
		

});


/**
 * Constructor definition
 */
laurbe.ButtonGroup = function ButtonGroup(args){
	
	/** Init values **/
	var defaults = {
			text: 'button',
			//important do not use wrapper!!
			type:'primary',
			//align: 'float-right'
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.ButtonGroup.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.ButtonGroup, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.Card = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'card',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "cardTemplate",
				url: '/html/components/layout/cardTemplate.html'
	},
	onclickHandler: function(ev){
		console.log('laurbe.Card.onclickHandler()');
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
		console.log('laurbe.Card.onItemClicked()');
		console.log(this.instanceProperties.items);
	},
	/**
	* Return the div Id where the child element must be append
	**/
	_getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
	onShow: function(){
		// console.log('pues han hecho onShow en un Card'+ this.id);
		if(this.instanceProperties.onShow)
			this.instanceProperties.onShow(this);
	}
	

});


/**
 * Constructor definition
 */
laurbe.Card = function Card(args){
	
	/** Init values **/
	var defaults = {
			/**
			wrapper:{
				tag:'<div>',
				class :'container'
				//,class:'d-flex justify-content-center align-self-center'
			}
			**/
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Card.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Card, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.CardGroup = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'cardGroup',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "cardGroupTemplate",
				url: '/html/components/layout/cardGroupTemplate.html'
	},
	onclickHandler: function(ev){
		alert('soy container');
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
	onShow:function(){
		laurbe.logger.log('estoy haciendo onshow de una CardGroup '+this.id );
		if(this.instanceProperties.onShow)
			this.instanceProperties.onShow(this);
	}
		

});


/**
 * Constructor definition
 */
laurbe.CardGroup = function CardGroup(args){
	
	/** Init values **/
	var defaults = {
			items:[]
			/**
			wrapper:{
				tag:'<div>',
				class :'container'
				//,class:'d-flex justify-content-center align-self-center'
			}
			**/
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.CardGroup.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.CardGroup, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.Column = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'column',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "columnTemplate",
				url: '/html/components/grid/columnTemplate.html'
	},
	onclickHandler: function(ev){
		alert('soy container');
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
		

});


/**
 * Constructor definition
 */
laurbe.Column = function Column(args){
	
	/** Init values **/
	var defaults = {
			/**
			wrapper:{
				tag:'<div>',
				class :'container'
				//,class:'d-flex justify-content-center align-self-center'
			}
			**/
			
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Column.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Column, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.Comment = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'comment',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "commentTemplate",
				url: '/html/components/layout/commentTemplate.html'
	},
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
		

});


/**
 * Constructor definition
 */
laurbe.Comment = function Comment(args){
	
	/** Init values **/
	var defaults = {
			//title:'antonio',
			//text:'Opino bastate mal de la jerarquia de clases del sistema neocapitalista actual, asi como de las verduras y pescados en comparacion con las hamburguesas',
			//img:{
			//	src:'data:image/svg+xml;charset=UTF-8,%3Csvg%20width%3D%2232%22%20height%3D%2232%22%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20viewBox%3D%220%200%2032%2032%22%20preserveAspectRatio%3D%22none%22%3E%3Cdefs%3E%3Cstyle%20type%3D%22text%2Fcss%22%3E%23holder_16a88523aaf%20text%20%7B%20fill%3A%23007bff%3Bfont-weight%3Abold%3Bfont-family%3AArial%2C%20Helvetica%2C%20Open%20Sans%2C%20sans-serif%2C%20monospace%3Bfont-size%3A2pt%20%7D%20%3C%2Fstyle%3E%3C%2Fdefs%3E%3Cg%20id%3D%22holder_16a88523aaf%22%3E%3Crect%20width%3D%2232%22%20height%3D%2232%22%20fill%3D%22%23007bff%22%3E%3C%2Frect%3E%3Cg%3E%3Ctext%20x%3D%2211.777777194976807%22%20y%3D%2216.933333349227905%22%3E32x32%3C%2Ftext%3E%3C%2Fg%3E%3C%2Fg%3E%3C%2Fsvg%3E'
			//}
			/**
			wrapper:{
				tag:'<div>',
				class :'container'
				//,class:'d-flex justify-content-center align-self-center'
			}
			**/
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Comment.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Comment, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.CommentsGroup = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'commentsGroup',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "commentsGroupTemplate",
				url: '/html/components/layout/commentsGroupTemplate.html'
	},
	onclickHandler: function(ev){
		alert('soy container');
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
		

});


/**
 * Constructor definition
 */
laurbe.CommentsGroup = function CommentsGroup(args){
	
	/** Init values **/
	var defaults = {
			title:null,
			items:[]
			/**
			wrapper:{
				tag:'<div>',
				class :'container'
				//,class:'d-flex justify-content-center align-self-center'
			}
			**/
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.CommentsGroup.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.CommentsGroup, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.Container = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'container',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "containerTemplate",
				url: '/html/components/layout/containerTemplate.html'
	},
	onclickHandler: function(ev){
		console.log('Container Pulsado');
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
		

});


/**
 * Constructor definition
 */
laurbe.Container = function Container(args){
	
	/** Init values **/
	var defaults = {
		
			wrapper:{
				tag:'<div>',
				class :'container'
				//,class:'d-flex justify-content-center align-self-center'
			},
			marginTop:'mt-5'
			//childsWrapperStyle:'text-align:center'
			
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Container.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Container, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.Form = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'form',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "formTemplate",
				url: '/html/components/form/formTemplate.html'
	},
	/**
	* Return the div Id where the child element must be append
	**/
	_getRenderChildWrapperId:function(){
		return this.id;
	}
		

});


/**
 * Constructor definition
 */
laurbe.Form = function Form(args){
	
	/** Init values **/
	var defaults = {
		//title:'myForm'

	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Form.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Form, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.Grid = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'grid',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "gridTemplate",
				url: '/html/components/grid/gridTemplate.html'
	},
	onclickHandler: function(ev){
		alert('soy container');
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
		

});


/**
 * Constructor definition
 */
laurbe.Grid = function Grid(args){
	
	/** Init values **/
	var defaults = {
			/**
			wrapper:{
				tag:'<div>',
				class :'container'
				//,class:'d-flex justify-content-center align-self-center'
			}
			**/
			
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Grid.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Grid, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.Image = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'image',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "imageTemplate",
				url: '/html/components/image/imageTemplate.html'
	},
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
	}
		

});


/**
 * Constructor definition
 */
laurbe.Image = function Image(args){
	
	/** Init values **/
	var defaults = {
			wrapper:{
				tag:'<div>', 
				class:'d-flex justify-content-center align-self-center'
			}
			//,width:"32"
			//,height:"32"
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Image.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Image, {instanceProperties:initializationProps});


	return instance;
}
/**
 * Main object namespace

 $('<div/>', {
    'id':'myDiv',
    'class':'myClass',
    'style':'cursor:pointer;font-weight:bold;',
    'html':'<span>For HTML</span>',
    'click':function(){ alert(this.id) },
    'mouseenter':function(){ $(this).css('color', 'red'); },
    'mouseleave':function(){ $(this).css('color', 'black'); }
}).appendTo('body');
 */
var laurbe ={
		logger: {
			enabled:true,
			log:function(obj){
				if(this.enabled){
					console.log(obj);
				}
			}
		},
		/**
		 * Reference for all created elements
		 */
		Directory:{

		},
		/**
		 * Reference for current APP Instance
		 */
		currentApp:{

		},
		FunctionalElement:{
			lastWithReference:this,
			lastAndReference:this,
			with:function(){
				return this;
			},
			and:function(){
				return this;
			}
		},
		/**
		 * Base view element 
		 */
		BaseViewElement:{
			/**
			* String type definition
			**/
			type: 'laurbeBaseViewElement',
			/**
			 * Current element Id
			 */
			id:null,
			/**
			 * The wrapper element
			 */
			ele:null,
			/**
			 * InstanceProperties
			 */
			instanceProperties:null,
			/**
			* flag for initialization of current Object
			**/
			initialized:false,
			/**
			* Returns the id
			**/
			_getName: function(){
				return this.id;
			},
			/**
			* RenderTo Element Jquery reference
			**/
			fatherElement: null,
			/**
			* initialize the wrapper
			**/
			_init: function(){
				this.id = this.instanceProperties.id;
				laurbe.Directory[this.id] = this;
				this.fatherElement = $('#'+this.instanceProperties.renderTo);
				
				if(this.instanceProperties.wrapper && this.instanceProperties.wrapper.tag){
					this.ele = $(this.instanceProperties.wrapper.tag, { 
											 'id':this.id+'Wrapper',
											 'click': this.onclickHandler,
											 'class': this.instanceProperties.wrapper.class
											 //'html':'<span> soy el '+this.id+'</span>'
								 			});
					this.ele.appendTo(this.fatherElement);
				}else{
					this.ele = this.fatherElement; //father and elewrapper are the same object
				}
				//this.bindEvents();
				if(!this.instanceProperties.items){
					this.instanceProperties.items =[];
				}
				this.initialized = true;
			},
			/**
			* If the component is based on template building
			**/
			template: null,

			
			_render: function(){
				if(!this.initialized){
			  		this._init();
			  	}
				if(this.template){
					var self = this;
					var templateInfo = {appendTo: self.ele, data: self.instanceProperties};
					//always load to templateManager div container
					$('#templateManager').load(laurbe.templateManager.templatePath+self.template.url, function(templateString,  ajaxObject, ajaxState){
						$('#'+self.template.scriptId).tmpl(templateInfo.data).appendTo(templateInfo.appendTo);
						self._afterRender();
						if(self.onShow){
							self.onShow(this);
						}
					});
				}
				
				// else{
				// 	console.log('no tiene on show '+ this.id);
				// }
			},
			/**
			* Rebuild/reinitalize the entire element, and render
			**/
			_renderTo:function(wrapperId){
				this.instanceProperties.renderTo=wrapperId;
				this.initialized=false;
				this._render();
			},
			//reload the view component
			refresh:function(){
				console.log('laurbe.refresh()');
				this.destroy();
				this._render();
				// console.log('refreshcated');
			},
			/**
			* After render callback
			**/
			_afterRender:function(){
				if(!this.instanceProperties.wrapper){ //usefull when this.instanceProperties.wrapper is undefined
					$('#'+this.id).on('click', this.onclickHandler);
				}
				
				var self = this;
				//self.bindEvents();
				if(self.instanceProperties.items){
					$.each(self.instanceProperties.items, function( index, item ) {
						item.owner = self;//reference to parent laurbe object
					  	item._renderTo(self._getRenderChildWrapperId());
					});
					// for(item of self.instanceProperties.items){
					// 	item.owner = self;//reference to parent laurbe object
					//   	item._renderTo(self._getRenderChildWrapperId());
					// }
					// for  (i=0;i<self.instanceProperties.items.length;i++){
					// 	self.instanceProperties.items[i].owner = self;//reference to parent laurbe object
					// 	self.instanceProperties.items[i]._renderTo(self._getRenderChildWrapperId());
					// }
				}

			},
			/**
			* If exists this.items (child laurbe Objects) will renderIt
			**/
			_appendChilds:function(items, renderNow){
				var self = this;
				// $.each(items, function( index, item ) {
				// 	console.log('_appendChilds '+ self._getRenderChildWrapperId());
				// 	self.instanceProperties.items.push(item);
				// 	item.owner = self;//reference to parent laurbe object
				//   	item.instanceProperties.renderTo = self._getRenderChildWrapperId();
				//   	if(renderNow == true){
				// 	  	item._render();
				// 	}
				// });

				for  (i=0;i<items.length;i++){  // Maybe ensure synchronously
					console.log('_appendChilds '+ self._getRenderChildWrapperId());
					var item = items[i];
					self.instanceProperties.items.push(item);
					item.owner = self;//reference to parent laurbe object
				  	item.instanceProperties.renderTo = self._getRenderChildWrapperId();
				  	if(renderNow == true){
					  	item._render();
					}
				}

			
			},

			/**
			* Where to render child elements
			**/
			_getRenderChildWrapperId:function(){
				console.log('The component '+ this.id+ ' not allows child objects');
			},
			/**
			* Remove all childs
			*/
			removeAllChilds:function(){
				console.log('laurbe.removeAllChilds()');
				$('#'+this._getRenderChildWrapperId()).empty();//jquery visual destroy
				this.instanceProperties.items = []; //reinitialize items as empty array
				// console.log('all childs have been removed');
			},
			/**
			* destroy the element
			**/
			destroy:function(){
				console.log('laurbe.destroy()')
				var self = this;
				$.each(this.items, function( index, item ) {
					destroy();
				});
				this.fatherElement.empty();//jquery visual destroy
				// console.log('internal destroy END');
			},
			/**
			* default onclick framework handlers
			**/
			onclickHandler: function(ev){
				if(true){
					console.log('laurbe.OnclickHandler()')
					// console.log('el evento es');
					// console.log(ev);
					// console.log(' y el elemento es');
					// console.log(this);
					// console.log('y el laurbe element es ');
					// console.log(laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')]);
				}
			},
			/**
			* To string log traces
			**/
			toString:function(){
				console.log('-----------------------');
				console.log('instanceProperties');
				console.log(this.instanceProperties);
				console.log('this.ele');
				console.log(this.ele);
				console.log('this.fatherElement');
				console.log(this.fatherElement);
				console.log('-----------------------');
			}

		},
		/**
		 * Default store for prototype loaded references
		 * (if the Js file is loaded will be added here to be available
		 */
		prototype:{
			BaseApp:{},
			BaseView:{},
			composite:{}
		},
		
		
		/***********************************/
		/***********************************/
		/***********************************/
		
		
		
		/**
		 * Utils 
		 */
		utils:{
			id:0,
			/**
			 * Return a generated unique sequencial string
			 */
			getIdFor:function(prefix){
				this.id++;
				return prefix + this.id;
			},
			isMobile:function(){
				var isMobile = {
					Android: function() {
						return navigator.userAgent.match(/Android/i);
					},
					BlackBerry: function() {
						return navigator.userAgent.match(/BlackBerry/i);
					},
					iOS: function() {
						return navigator.userAgent.match(/iPhone|iPad|iPod/i);
					},
					Opera: function() {
						return navigator.userAgent.match(/Opera Mini/i);
					},
					Windows: function() {
						return navigator.userAgent.match(/IEMobile/i) || navigator.userAgent.match(/WPDesktop/i);
					},
					any: function() {
						return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
					}
				};
				return isMobile.any();
			},
			focusAndScrollToElement:function(elementId){
				var el = document.getElementById(elementId);
    			el.scrollIntoView(true);
			},
			pairDataArraywise(arr,groupSize , func ){
				groupSize = groupSize || 1;
				var index=0;
				var maxSinglesRepeated=3;
				var currentSingleRowRepeated=0;
				for(index; index < arr.length; index=index+2){
					if(Math.random() < 0.5){
						func(arr[index], arr[index + 1]);
						currentSingleRowRepeated=0;
					}else{
						if(currentSingleRowRepeated < maxSinglesRepeated){
							func(arr[index]);
							index=index-1;
							currentSingleRowRepeated++;
						}else{
							func(arr[index], arr[index + 1]);
							currentSingleRowRepeated=0;
						}
						
					}
					
				}
			}
		},

		/**
		* Init framework
		**/
		_init:function(){
			//create div to load template Manager
			this.templateManager._init();
			this.modalDialogManager._init();//create div to load modalDialog Manager
		},
		/**
		* Template Manager
		*  
		* https://stackoverflow.com/questions/327047/what-is-the-most-efficient-way-to-create-html-elements-using-jquery
		*
		**/
		templateManager:{
			templatePath: '.',
			initialized:false,
			_init: function(){
				if(!this.initialized){
					$('<div/>', { 'id':'templateManager'}).appendTo('body');
					console.log('templateManager Initialized OK.');
				}else{
					console.log('templateManager Already Initialized.');
				}
			}	
		},
		modalDialogManager:{
			templatePath: '.',
			initialized:false,
			_init: function(){
				if(!this.initialized){
					$('<div/>', { 'id':'modalDialogManager'}).appendTo('body');
					console.log('modalDialogManager Initialized OK.');
				}else{
					console.log('modalDialogManager Already Initialized.');
				}
			}	
		},
		DAOManager:{

		},
		LocalStorageManager:{

		},
		Navigator:{

		},
		ShareSocialManager:{

		}
		

};

laurbe._init();


/*****************************
 * PASAR A OTROS ARCHIVOS
 ****************************/

/**
 *  Base de todas las vistas compuestas
 */
 laurbe.CompositeViewElement = {
		/**
		* String type definition
		**/
		type: 'laurbeBaseViewElement',
 }
/**
 * The menu item prototype
 */
laurbe.prototype.Layout = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'layout',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "layoutTemplate",
				url: '/html/components/layout/layoutTemplate.html'
	},
	/**
	* Return the div Id where the child element must be append
	**/
	_getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	}
		

});


/**
 * Constructor definition
 */
laurbe.Layout = function Layout(args){
	
	/** Init values for laurbe.navBar **/
	var defaults = {
			wrapper:{
				tag:'<div>',
				class:'mt-1' //Spacing tòp 1
			},
			text:'Option',
			selected: true
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Layout.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Layout, {instanceProperties:initializationProps});


	return instance;
}
/**
 * Prototype Definition 
 */
laurbe.prototype.ModalDialog = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'modalDialog',
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "modalDialogTemplate",
				url: '/html/components/modalDialog/modalDialogTemplate.html'
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
	* Show the modalDialog
	**/
	show:function(){
		this.render();
	},
	_afterRender:function(){
		$('#'+this.id).show();
	},
	/**
	* hide it
	**/ 
	hide:function(){
		$('#'+this.id).hide();
	},
	/**
	* Clicked and MenuItemDlement
	**/
	onclickHandler: function(ev){
		console.log('soy modalDialog y me han pulsado');
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
		$.each(self.instanceProperties.items, function( index, item ) {
					  	item.setActive();
					});
		**/
		
	}

});


/**
 * Constructor definition
 */
laurbe.ModalDialog = function ModalDialog(args){
	
	/** Init values for laurbe.navBar **/
	var defaults = {
			title:'defaultTitle',
			renderTo:'appMainViewContainer',
			wrapper:{
				tag:'<div>'
			},
			items: []
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.ModalDialog.type) ;
	
	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.ModalDialog, {instanceProperties:initializationProps});
	

	
	return instance;
}
/**
 * Prototype Definition 
 */
laurbe.prototype.NavBar = $.extend({}, laurbe.BaseViewElement, {
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
		$.each(this.instanceProperties.items, function( index, item ) {
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
		$.each(self.instanceProperties.items, function( index, item ) {
					  	item.setActive();
					});
		**/
		
	}

});


/**
 * Constructor definition
 */
laurbe.NavBar = function NavBar(args){
	
	/** Init values for laurbe.navBar **/
	var navBarDefaults = {
			title:'defaultTitle',
			wrapper:{
				tag:'<div>'
			},
			brand:{
				logoUrl:'https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-outline.svg'
			},
			fixedTop:false,
			//bg_color: 'bg-dark',  
			items: []
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, navBarDefaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.NavBar.type) ;
	
	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.NavBar, {instanceProperties:initializationProps});
	

	
	return instance;
}
/**
 * The menu item prototype
 */
 laurbe.prototype.NavBarBottomMenuItem = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'navBarBottomMenuItem',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "navBarBottomMenuItemTemplate",
				url: '/html/components/navBar/navBarBottomMenuItemTemplate.html'
	},
	/**
	 * Returns the wrapper Id
	 */
	_getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
	onclickHandler: function(ev){
		console.log('soy item y me han pulsado');
		console.log(this);
		var currentObject = laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')];
		if(currentObject.instanceProperties.onclick){
			currentObject.instanceProperties.onclick(ev);
		}else{
			console.log('no hay event definido para '+currentObject.id);
		}

		//up the notification
		if(currentObject.owner){
			currentObject.owner.onChildItemEvent(ev, ev, currentObject);
		}
	},
	onItemClicked:function (menuItem){
		console.log(menuItem.id+ ' me avisa que le han clickado ');
		console.log(this.instanceProperties.items);
	},
	/**
	* Mark this item as active render
	**/
	setActive:function(isActive){
		if(isActive){
			this.instanceProperties.selected=true;
			$('#'+this.id).addClass('active');
		}else{
			this.instanceProperties.selected=false;
			$('#'+this.id).removeClass('active');
		}
	}	

});


/**
 * Constructor definition
 */
laurbe.NavBarBottomMenuItem = function NavBarBottomMenuItem(args){
	
	/** Init values for laurbe.navBar **/
	var defaults = {
			// wrapper:{
			// 	tag:'<div class="col text-center">'
			// },
			// text:'Option',
			// selected: true
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.NavBarBottomMenuItem.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.NavBarBottomMenuItem, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.NavBarMenuItem = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'navBarMenuItem',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "navbarMenuItemTemplate",
				url: '/html/components/navBar/navBarMenuItemTemplate.html'
	},
	/**
	 * This Menu Item has a related View to show
	 */
	relatedView:null,
	/**
	 * 
	 * @param {*} ev 
	 */
	onclickHandler: function(ev){
		console.log('soy item y me han pulsado');
		console.log(this);
		var currentObject = laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')];
		if(currentObject.instanceProperties.onclick){
			currentObject.instanceProperties.onclick(ev);
		}else{
			console.log('no hay event definido para '+currentObject.id);
		}

		//up the notification
		if(currentObject.owner){
			currentObject.owner.onChildItemEvent(ev, ev, currentObject);
		}

		

	},
	onItemClicked:function (menuItem){
		console.log(menuItem.id+ ' me avisa que le han clickado ');
		console.log(this.instanceProperties.items);
	},
	/**
	* Mark this item as active render
	**/
	setActive:function(isActive){
		if(isActive){
			this.instanceProperties.selected=true;
			$('#'+this.id).addClass('active');
		}else{
			this.instanceProperties.selected=false;
			$('#'+this.id).removeClass('active');
		}
	}	

});


/**
 * Constructor definition
 */
laurbe.NavBarMenuItem = function navBarMenuItem(args){
	
	/** Init values for laurbe.navBar **/
	var defaults = {
			wrapper:{
				tag:'<div>'
			},
			text:'Option',
			selected: true
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.NavBarMenuItem.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.NavBarMenuItem, {instanceProperties:initializationProps});


	return instance;
}
/**
 * Prototype Definition 
 */
 laurbe.prototype.NavBarBottom = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'navBarBottom',
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "navbarBottomWrapperTemplate",
				url: '/html/components/navBar/navBarBottomTemplate.html'
	},
	/**
	* Force a click over a item menu
	**/
	_selectMenuItem:function(menuItem){
		$.each(this.instanceProperties.items, function( index, item ) {
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
		console.log('soy navBarBottom y me han pulsado');
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
		$.each(self.instanceProperties.items, function( index, item ) {
					  	item.setActive();
					});
		 */
		
	}

});


/**
 * Constructor definition
 */
laurbe.NavBarBottom = function NavBarBottom(args){
	
	/** Init values for laurbe.navBar **/
	var navBarBottomDefaults = {
		
		wrapper:{
			tag:'<div>'
		},
		items: []
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, navBarBottomDefaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.NavBarBottom.type) ;
	
	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.NavBarBottom, {instanceProperties:initializationProps});
	

	
	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.Region = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'region',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "regionTemplate",
				url: '/html/components/layout/regionTemplate.html'
	},
	/**
	* Return the div Id where the child element must be append
	**/
	_getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	}
		

});


/**
 * Constructor definition
 */
laurbe.Region = function Region(args){
	
	/** Init values **/
	var defaults = {
			wrapper:null,//no use wrapper
			//text:'Region',
			//align:'float-right',
			fixedSize:''

	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Region.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Region, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.Row = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'row',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "rowTemplate",
				url: '/html/components/grid/rowTemplate.html'
	},
	onclickHandler: function(ev){
		alert('soy container');
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
		

});


/**
 * Constructor definition
 */
laurbe.Row = function Row(args){
	
	/** Init values **/
	var defaults = {
			/**
			wrapper:{
				tag:'<div>',
				class :'container'
				//,class:'d-flex justify-content-center align-self-center'
			}
			**/
			
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Row.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Row, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.SpotifyAudio = $.extend({}, laurbe.BaseViewElement, {
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
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.SpotifyAudio.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.SpotifyAudio, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.TextField = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'textField',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "textFieldTemplate",
				url: '/html/components/form/textFieldTemplate.html'
	},
	onclickHandler: function(ev){
		console('TEXT FIELD PULSADO');
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
	}
		

});


/**
 * Constructor definition
 */
laurbe.TextField = function TextField(args){
	
	/** Init values **/
	var defaults = {
			//label: 'textField',
			//value:'...'
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.TextField.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.TextField, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
laurbe.prototype.Title = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'title',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "titleTemplate",
				url: '/html/components/layout/titleTemplate.html'
	},
	/**
	* Return the div Id where the child element must be append
	**/
	_getRenderChildWrapperId:function(){
		console.log("this element not allows child objects");
	}
		

});


/**
 * Constructor definition
 */
laurbe.Title = function Title(args){
	
	/** Init values **/
	var defaults = {
			wrapper:null,//no use wrapper
			//text:'Region',
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Title.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Title, {instanceProperties:initializationProps});


	return instance;
}
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
/**
**

var usersView = new View().fromRest("/users")
							.with({initView:'astable',excludedFields:['creditCard']})
							.and()
							.editData('asForm')
							.with({noneditableFields:['id','email','creditcard']});
var cartsView = new View().fromRest("/carts")
							.with({initView:'table'})
							and()
							.editData('asForm').
							with('notEditable');
var app = new App().withStyleDetfauls().usingViews([new View({'users'}),new View({'carts'})]);
**/
laurbe.prototype.App = $.extend({}, laurbe.prototype.BaseAPP, {
	/**
	*
	**/
	instanceProperties:{
		views:[],
		appLayoutTemplate:'classic'
	},
	/**
	* Info about APP Layout templates
	**/
	appLayoutTemplates:{
		classic:{
			scriptId : "appTemplate",
			url: '/html/components/app/appClassicTemplate.html'
		},
		dashboard:{
			scriptId : "appTemplate",
			url: '/html/components/app/appDashboardTemplate.html'
		}
	},	
	
	/**
	* The app main Styles , lok and feel
	**/
	style:{
		icon:'',
		theme:'dark'
	},
	/**
	* Asspcoated security and error views
	**/
	security:{
		errorView:{
			401:null,
			403:null,
			404:null,
			500:null
		}
	},
	/**
	 * Global DAO (will be injected in each view to generate laurbe.RESTView?)
	 */
	dao:null,
	/**
	 * Global Storage Engine
	 */
	storageManager:null,
	/**
	 * Global Navigator
	 */
	navigatorManager:null,
	/**
	* 
	**/
	views:[],
	/**
	 * To Access by Id
	 */
	viewDirectory: {},
	/**
	 * Reference for current View
	 */
	currentView:null,
	/**
	* The app menu
	**/
	menu:null,
	/**
	 * The bottom Menu
	 */
	bottomMenu:null,
	/**
	* Footer
	**/
	footer:{
		style:{
			align: 'center'
		},
		elements:[
			/**
			*	The links, the icos, and other laurbe elements
			**/
		]
	},
	/**
	* Builds:
	*	The menu , based on views
	**/
	init:function(){
		//0.Set core elements
		this._setCoreElements(this.instanceProperties);
		//1.Set the views
		this._setViews(this.instanceProperties.views);
		//2.Build The menu based on views
		this._buildMenu();
		//3.Render The Menu
		this._render();

	},
	/**
	 * Initialize DAO or others core features
	 * @param {} instanceProperties 
	 */
	_setCoreElements:function(instanceProperties){
		if(instanceProperties.dao)
			this.dao=instanceProperties.dao;
		if(instanceProperties.storageManager)
			this.storageManager=instanceProperties.storageManager;

		//Always exists on laurbe app, but could be overwrite in app definition
		if(!instanceProperties.navigatorManager)
			this.navigatorManager = new laurbe.NavigatorManager({relatedApp:this});
		//Always exists on laurbe app, but could be overwrite in app definition
		if(!instanceProperties.shareSocialManager)
			this.shareSocialManager = new laurbe.ShareSocialManager({});	
	},	
	/**
	* Render the base html structure based on template
	**/
	_render:function(){
		var self = this;

		//Get the selected appLayout
		var appLayoutTemplate = this.appLayoutTemplates[this.instanceProperties.appLayoutTemplate];
		$('#templateManager').load(laurbe.templateManager.templatePath+appLayoutTemplate.url, function(templateString,  ajaxObject, ajaxState){
			//1.Render APP Template
			$('#'+appLayoutTemplate.scriptId).tmpl({}).appendTo('body');

			//2.Render the menu
			self.menu._selectMenuItem(self.menu.instanceProperties.items[0]); //by default select the first
			self.menu._render();
			self.bottomMenu._render();
			

			//3.Render first view
			self._navigate();

			//4.Bind Global Events
			self._bindGlobalEvents(self);

		});
	},
	_setViews:function(views){
		//Set Views
		this.views = this.instanceProperties.views;
		//Set Directory View (ById)
		for (index = 0; index < views.length; index++) {
			let currentView = views[index];
			this.viewDirectory[currentView.instanceProperties.id] = currentView;
		}
	
	},
	/**
	* Builds the menu based on views
	**/
	_buildMenu:function(){
		var self=this;
		
		var menuItems = [];
		//Add Items
		$.each(this.instanceProperties.views, function( index, view ) {
			
			var menuItem = new laurbe.NavBarMenuItem({
				text:view.instanceProperties.menuName,
				relatedView:view,
				selected: false,
				onclick:function(){
					self._navigate(this.relatedView.instanceProperties.id,null);
				}
			});
			view.relatedMenuItem=menuItem;
			menuItems.push(
				menuItem
			);
		});

		//Build Menus
		this.menu = new laurbe.NavBar({	
				        				renderTo:'appMenuContainer',
										title:this.instanceProperties.title,
										items:menuItems,
          								brand:this.instanceProperties.navBar.brand,
          								searchTool:this.instanceProperties.navBar.searchTool

		});
		this.bottomMenu = new laurbe.NavBarBottom({	
					renderTo:'appMenuFooterContainer',
					items:this.instanceProperties.bottomNavBar.items

		});

		return this.menu;
	},
	/**
	*
	**/
	_showView:function(view){
		//alert('limpiando appMainViewContainer');
		if(!view.initialized){
			view._init();
		}
		$('#appMainViewContainer').empty();
		this.currentView = view;
		view._renderTo('appMainViewContainer');
	},
	/**
	 * Show the desired view and add to navigation history
	 * @param {target } view 
	 * @param {*} args 
	 */
	_navigate:function(viewId, args){
		//0.Validations
		var targetViewID= viewId != undefined ? viewId :this.navigatorManager.getCurrentViewId();
		if(!targetViewID){//calculate
			targetViewID=this.views[0].instanceProperties.id;
		}
		//1.Store Navigation info
		this.navigatorManager.storeNavigationInfo(targetViewID, args);
		//2.Show the view
		var targetView = this.viewDirectory[targetViewID];
		this.menu._selectMenuItem(targetView.relatedMenuItem);
		this._showView(targetView);
	},
	_bindGlobalEvents:function(app){
		// Referencia https://www.yogihosting.com/jquery-infinite-scroll/
		/**	 */
		$(window).scroll(function () {
			// End of the document reached?
			// $('#page_height').html($(document).height() );
			// $('#this_height').html($(this).height() );
			// $('#page_scrolltop').html($(this).scrollTop());
			// $('#page_max_height').html($(this).height());
			// $('#page_acumulated').html((Math.round($(document).height() - $(this).height())) +' mustbeequalsto '+Math.round($(this).scrollTop()));
			
            let currentHeigth = Math.round($(document).height() - $(this).height());
			let currentScrollTop = Math.round($(this).scrollTop());
			if (currentHeigth == currentScrollTop) {
				$('#page_info').html('['+currentHeigth+' == ' + currentScrollTop+']');
				//alert("detectado infinite scroll");
				app._onInfiniteScrollEvent();
				
				var scrollingElement = (document.scrollingElement || document.body);
				scrollingElement.scrollTop = scrollingElement.scrollHeight-5;
				
				//alert("finalizado infinite scroll");
			}else{
				$('#page_info').html('['+currentHeigth+' != ' + currentScrollTop+']');
			}
		});
	
		//alert(window);
		var self=this;
		window.onhashchange=function(){
			//Deactivated
			//self.navigatorManager.onBackPressNavigation();
		}
		// alert('paso a la accion');
		// window.addEventListener('popstate', function(event) {
		// 	this.alert('soy popstate');
		// });
		
	},
	/**
	 * Catch global on infinite scroll and call to currentView onInfiniteScroll
	 */
	_onInfiniteScrollEvent:function(){
		console.log('app.oninfiniteScroll');
		this.currentView.onInfiniteScroll(this.currentView);
	},
	/**
	*
	**/
	start:function(){

	}
		

});


/**
 * Constructor definition
 */
laurbe.App = function APP(args){
	
	/** Init values for laurbe.navBar **/
	var defaults = {
			/**
			 *  the App title and name
			**/
			title: 'My App',
			appLayoutTemplate:'classic'
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	//initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Layout.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.App, {instanceProperties:initializationProps});


	return instance;
}
/**
**

var usersView = new View().fromRest("/users")
							.with({initView:'astable',excludedFields:['creditCard']})
							.and()
							.editData('asForm')
							.with({noneditableFields:['id','email','creditcard']});
var cartsView = new View().fromRest("/carts")
							.with({initView:'table'})
							and()
							.editData('asForm').
							with('notEditable');
var app = new App().withStyleDetfauls().usingViews([new View({'users'}),new View({'carts'})]);
**/
laurbe.prototype.View = $.extend({}, laurbe.BaseViewElement, {

	type:'view',
	/**
	* flag for initialization of current Object
	**/
	initialized:false,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
			scriptId : "viewTemplate",
			url: '/html/components/layout/viewTemplate.html'
	},
	/**
	*
	**/
	instanceProperties:{
		/**
		 *  the App title and name
		**/
		menuName: 'View 1',
		

	},
	/**
	 * If this view is associate with a topNavBar Menu Item
	 */
	relatedMenuItem:null,
	/**
	* View elements
	**/
	items:[],
	
	/**
	* Builds:
	**/
	// init:function(){
	// 	this.id = this.instanceProperties.id;
	// 	laurbe.Directory[this.id] = this;
	// 	initialized=true;
	// },

	// renderTo:function(wrapperId){
	// 	console.log('soy el render to de la view '+wrapperId);
	// 	$.each(this.instanceProperties.items, function( index, item ) {
	// 		item.renderTo(wrapperId);
	// 	});
	// },
	/**
	* Return the div Id where the child element must be append
	**/
	_getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
	onShow:function(){
		laurbe.logger.log('estoy haciendo onshow de una View '+this.id );
		if(this.instanceProperties.onShow)
			this.instanceProperties.onShow(this);
	},
	/**
	 * Called on view infinite scroll
	 */
	onInfiniteScroll:function(){
		console.log('estoy on infiniteScroll');
		if(this.instanceProperties.onInfiniteScroll)
			this.instanceProperties.onInfiniteScroll(this);
		
	}
});


/**
 * Constructor definition
 */
laurbe.View = function View(args){
	
	/** Init values for laurbe.navBar **/
	var defaults = {
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || initializationProps.menuName+'_View' ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.View, {instanceProperties:initializationProps});


	return instance;
}
/**
**

var usersView = new View().fromRest("/users")
							.with({initView:'astable',excludedFields:['creditCard']})
							.and()
							.editData('asForm')
							.with({noneditableFields:['id','email','creditcard']});
var cartsView = new View().fromRest("/carts")
							.with({initView:'table'})
							and()
							.editData('asForm').
							with('notEditable');
var app = new App().withStyleDetfauls().usingViews([new View({'users'}),new View({'carts'})]);
**/
laurbe.prototype.App = $.extend({}, laurbe.prototype.BaseAPP, {
	/**
	* String type definition
	**/
	type: 'app',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "layoutTemplate",
				url: '/html/components/layout/layoutTemplate.html'
	},
	/**
	* Return the div Id where the child element must be append
	**/
	_getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
		

});


/**
 * Constructor definition
 */
laurbe.App = function APP(args){
	
	/** Init values for laurbe.navBar **/
	var defaults = {
			wrapper:{
				tag:'<div>',
				class:'mt-1' //Spacing tòp 1
			},
			text:'Option',
			selected: true
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Layout.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.Layout, {instanceProperties:initializationProps});


	return instance;
}


if(!laurbe.prototype.composite)
	laurbe.prototype.composite = {};

laurbe.prototype.composite.ScrollableCardListView = $.extend({}, laurbe.prototype.View, {

	type:'scrollableCardListView',
	/**
	*
	**/
	/**
	* View elements
	**/
	items:[],
	
	/**Transform Data into two or three layout column representations */
	_loadData:function(data){

		var instanceGridContainer = this.instanceProperties.items[0];
		if(data){
			
			laurbe.utils.pairDataArraywise(data,2, function(obj1,obj2){
				var _items =[];
				if(obj1){
					_items.push(
						new laurbe.Column({
							items:[
								new laurbe.Card({
										title:obj1.title,
										text:obj1.description,
										footMessage:'Metal,'+obj1.tags[1],
										img:{
											src: obj1.img,
											alt: 'Metallic Aftenoon'
										},
										onclick: function(){
											alert('soy '+obj1.title);
										}
									})
							]
						})
					);
				}
				if(obj2){
					_items.push(
						new laurbe.Column({
							items:[
								new laurbe.Card({
										title:obj2.title,
										text:obj2.description,
										footMessage:'Metal,'+obj2.tags[1],
										img:{
											src: obj2.img,
											alt: 'Metallic Aftenoon'
										},
										onclick: function(){
											alert('soy '+obj2);
										}
									})
							]
						})
					);
				}
				instanceGridContainer.instanceProperties.items.push(new laurbe.Row({
					items:_items
				}));
			});
			
			// this.items[0].instanceProperties.items=[];
			
		}
	}
});


/**
 * Constructor definition
 */
laurbe.ScrollableCardListView = function ScrollableCardListView(args){
	
	/** Init values  **/
	var defaults = {
			
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.composite.ScrollableCardListView.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.composite.ScrollableCardListView, {instanceProperties:initializationProps});

	/**Build View */
	//Force to set only ONe Wrapper Grid Element
	instance.instanceProperties.items.push(
		new laurbe.Grid({
			id: initializationProps.id+'_GridWrapper',
			items:[]
		})
	);

	//este metodo es el antiguo, ya que el loadData mete los items antes de pintar
	//Lo bueno es como se hace en vulgus_app (scroollableview) que hace una llamada ajax y hace un appendChilds a algo que ya estaba vacio pero pintado(el grid principal)
	// instance._loadData([
	// 	{
	// 		"title":"And Justice For All",
	// 		"description": "Full Album Cover session",
	// 		"tags":["Metal", "Metallica"],
	// 		"img": "https://www.thomann.de/pics/bdb/128185/12948444_800.jpg"
	
	// 	},
	// 	{
	// 		"title":"Lucifer",
	// 		"description": "Metal Lucifer",
	// 		"tags":["Metal", "Lucifer"],
	// 		"img": "https://img.playbuzz.com/image/upload/q_auto:good,f_auto,fl_lossy,w_640,c_limit,dpr_1/v1510290568/rqjtxqblgt73758sw25c.jpg"
			
	// 	},
	// 	{
	// 		"title":"Pantera Sessions",
	// 		"description": "Tocaremos los temas de Pantera del primer album",
	// 		"tags":["Metal", "Pantera"],
	// 		"img": "https://img.playbuzz.com/image/upload/q_auto:good,f_auto,fl_lossy,w_640,c_limit,dpr_1/v1510292312/elspdi4xiptyndsvrt4p.jpg"
			
	// 	},
	// 	{
	// 		"title":"Sin Frenos",
	// 		"description": "La muerte tiene un precio, exactamente 32,50 euros",
	// 		"tags":["Metal", "Frenando"],
	// 		"img": "https://img.playbuzz.com/image/upload/q_auto:good,f_auto,fl_lossy,w_640,c_limit,dpr_1/v1510291227/hilegxyb9b47qlo2wxwo.jpg"
			
	// 	},
	// 	{
	// 		"title":"PAsa Picha",
	// 		"description": "Somos los pros",
	// 		"tags":["Metal", "Frenando"],
	// 		"img": "https://img.playbuzz.com/image/upload/q_auto:good,f_auto,fl_lossy,w_640,c_limit,dpr_1/v1510291227/hilegxyb9b47qlo2wxwo.jpg"
			
	// 	}
	
	// ]);


	return instance;
}
/**
 * The menu item prototype
 */
 laurbe.prototype.SocialLoginView = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'socialLoginView',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "socialLoginTemplate",
				url: '/html/components/login/socialLoginTemplate.html'
	},
	/**
	 * If Set login Form
	 */
	loginForm:null,
	/**
	 * Socail Login Buttons
	 */
	socialButtons:null, 
	/**
	* Return the div Id where the child element must be append
	**/
	_getRenderChildWrapperId:function(){
		return this.id+'_childsWrapper';
	},
	/**
	* Return the div Id where the child element must be append
	**/
	_getSocialButtonsChildWrapperId:function(){
		return this.id+'_buttonsWrapper';
	},
	/**
	* Custom internal Render items
	**/
	_afterRender:function(){
		if(!this.instanceProperties.wrapper){ //usefull when this.instanceProperties.wrapper is undefined
			$('#'+this.id).on('click', this.onclickHandler);
		}
		var self = this;
		
		//Render social Buttons
		if(this.instanceProperties.socialButtons){
			$.each(self.instanceProperties.socialButtons, function( index, item ) {
				item.owner = self;//reference to parent laurbe object
				item._renderTo(self._getSocialButtonsChildWrapperId());
			});
		}
		
		//self.bindEvents();
		if(self.instanceProperties.items){
			$.each(self.instanceProperties.items, function( index, item ) {
				item.owner = self;//reference to parent laurbe object
				item._renderTo(self._getRenderChildWrapperId());
			});
			// for(item of self.instanceProperties.items){
			// 	item.owner = self;//reference to parent laurbe object
			//   	item._renderTo(self._getRenderChildWrapperId());
			// }
			// for  (i=0;i<self.instanceProperties.items.length;i++){
			// 	self.instanceProperties.items[i].owner = self;//reference to parent laurbe object
			// 	self.instanceProperties.items[i]._renderTo(self._getRenderChildWrapperId());
			// }
		}

	}	

});


/**
 * Constructor definition
 */
laurbe.SocialLoginView = function SocialLoginView(args){
	
	/** Init values for laurbe.navBar **/
	var defaults = {
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.SocialLoginView.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.SocialLoginView, {instanceProperties:initializationProps});


	return instance;
}
/**
 * The menu item prototype
 */
 laurbe.prototype.SocialLoginButton = $.extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'socialLoginButton',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "socialLoginButtonTemplate",
				url: '/html/components/login/socialLoginButtonTemplate.html'
	},
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
	}
		

});


/**
 * Constructor definition
 */
laurbe.SocialLoginButton = function SocialLoginButton(args){
	
	/** Init values **/
	var defaults = {
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = $.extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.SocialLoginButton.type) ;

	/** Return the instance **/
	var instance = $.extend({}, laurbe.prototype.SocialLoginButton, {instanceProperties:initializationProps});


	return instance;
}