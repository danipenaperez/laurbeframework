define('laurbe', ['jquery' ], function ($) {

	alert('ha cargado jquery??');
	console.log('jquery es ');
	console.log($);



	
	/**
	 * Main object namespace
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
		dependencies:{
			js: [
				'/thirdparty/js/jquery.min.js',
				'/thirdparty/js/bootstrap.min.js', 
				'/thirdparty/js/jquery.tmpl.min.js',
				'/thirdparty/js/popper.min.js'
			],
			css: [
				'/thirdparty/css/bootstrap.min.css',
				'/thirdparty/css/font-awesome.min.css'
			] 
		},
		components:{
			js: [
				'/js/components/app/app.js',
				'/js/components/app/view.js',
				'/js/components/layout.js',
				'/js/components/region.js',
				'/js/components/navbar.js',
				'/js/components/navbarMenuItem.js',
				'/js/components/navbarBottomMenuItem.js',
				'/js/components/navbarbottom.js',
				'/js/components/image.js',
				'/js/components/button.js',
				'/js/components/buttonGroup.js',
				'/js/components/textLink.js',
				'/js/components/container.js',
				'/js/components/form.js',
				'/js/components/textField.js',
				'/js/components/modalDialog.js',
				'/js/components/grid.js',
				'/js/components/row.js',
				'/js/components/column.js',
				'/js/components/cardGroup.js',
				'/js/components/card.js',
				'/js/components/youTubeVideo.js',
				'/js/components/video.js',
				'/js/components/spotifyAudio.js',
				'/js/components/commentsGroup.js',
				'/js/components/comment.js',
				'/js/components/socialLoginView.js',
				'/js/components/composite/scrollableCardListView.js',
				'/js/data/dao.js',
				'/js/data/localStorageManager.js',
				'/js/core/navigatorManager.js',
				'/js/core/shareSocialManager.js'
			]
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
					
					/** Load current component template , and render (appentTo) */
					laurbe.templateManager._loadTemplate(self.template.url, function(){
						$('#'+self.template.scriptId).tmpl(templateInfo.data).appendTo(templateInfo.appendTo);
						self._afterRender();
						if(self.onShow){
							self.onShow(this);
						}
					});
					
					
					//always load to templateManager div container
					// $('#templateManager').load(laurbe.templateManager.templatePath+self.template.url, function(templateString,  ajaxObject, ajaxState){
					// 	$('#'+self.template.scriptId).tmpl(templateInfo.data).appendTo(templateInfo.appendTo);
					// 	self._afterRender();
					// 	if(self.onShow){
					// 		self.onShow(this);
					// 	}
					// });
					
				}
				
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
						console.log(index);
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
				for  (i=0;i<items.length;i++){  // Maybe ensure synchronously
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
			},
			/**
			 * Dinamically add CSS file
			 * @param {} path 
			 */
			loadCSS:function(cssPath){
				var head  = document.getElementsByTagName('head')[0];
				var link  = document.createElement('link');
				link.id   = cssPath;
				link.rel  = 'stylesheet';
				link.type = 'text/css';
				link.href = laurbe.templateManager.templatePath+cssPath;
				link.media = 'all';
				head.appendChild(link);
				console.log('loaded CSS  from '+ laurbe.templateManager.templatePath+cssPath);
			},
			/**
			 * Dinamically load JS file
			 */
			loadJS: function(url, callback){
				//url is URL of external file, implementationCode is the code
				//to be called from the file, location is the location to 
				//insert the <script> element
			
				var scriptTag = document.createElement('script');
				scriptTag.src = laurbe.templateManager.templatePath+url;
				scriptTag.id= url;
				// if(callback){
					scriptTag.onload = function(){
						
						console.log(scriptTag.innerHTML);
					};
					scriptTag.onreadystatechange = function(){
						console.log(scriptTag.innerHTML);
					};
				// }

				document.body.appendChild(scriptTag);
				
			}
		},

		/**
		* Init framework
		**/
		_init:function(){
			//Load thirdparty dependencies
			this._importThirdPartyDependencies();
			//Load Laurbe core compoenents
			this._importLaurbeComponents();
			
			alert('esperando dime tu');
			// while(typeof $ == 'undefined'){console.log('blocking')};
			// alert('available');

			// var waitForJQuery = setInterval(function () {
			// 	if (typeof $ != 'undefined') {
			// 		alert('esta cargado!! ');
			// 		//create div to load template Manager
			// 		this.templateManager._init();
			// 		this.modalDialogManager._init();//create div to load modalDialog Manager
			
			// 		clearInterval(waitForJQuery);
			// 	}else{
			// 		console.log('no esta cargado');
			// 	}
			// }, 10);

			this.templateManager._init();
			this.modalDialogManager._init();//create div to load modalDialog Manager
			
			
		},
		/**
		 * Load dependencies on page
		 */
		_importThirdPartyDependencies:function(){
			var _self=this;
			this.dependencies.css.forEach(function (val, index) {
				console.log('loading css '+ val);
				_self.utils.loadCSS(val);
			});
			this.dependencies.js.forEach(function (val, index) {
				console.log('loading JS '+ val);
				_self.utils.loadJS(val);
			});
		},
		/**
		 * Import Laurbe components JS Files
		 */
		_importLaurbeComponents:function(){
			var _self=this;
			
			this.components.js.forEach(function (val, index) {
				console.log('loading JS '+ val);
				_self.utils.loadJS(val);
			});
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
			
			/**Initialize a hidded div to store all loaded templates */
			_init: function(){
				if(!this.initialized){
					// $('<div/>', { 'id':'templateManager'}).appendTo('body');
					var templateManagerDiv = document.createElement('div');
					templateManagerDiv.id="templateManager";
					document.body.appendChild(templateManagerDiv);
					console.log('templateManager Initialized OK.');
				}else{
					console.log('templateManager Already Initialized.');
				}
			},
			/**public configuration overwrite */
			_configure:function(args){
				if(args.templatePath)
					this.templatePath=args.templatePath;
			},
			/**
			 * Load template, verify if is not already loaded (cached)
			 * intente verificar si ya habiamos cargado la templateURL pero falla :-( habria que volver a intentarlo)
			 * @param {} templateURL 
			 * @param {*} callback 
			 */
			_loadTemplate:function( templateURL,  callback){
				var _self = this;
				$('#templateManager').load(laurbe.templateManager.templatePath+templateURL, function(templateString,  ajaxObject, ajaxState){
					callback();
				});
				
			}
		},
		modalDialogManager:{
			templatePath: '.',
			initialized:false,
			_init: function(){
				if(!this.initialized){
					//OLD $('<div/>', { 'id':'modalDialogManager'}).appendTo('body');
					var modalDialogManagerDiv = document.createElement('div');
					modalDialogManagerDiv.id="modalDialogManager";
					document.body.appendChild(modalDialogManagerDiv);

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

		},
		/**
		 * Overwrite configuration
		 * @param {} args 
		 */
		configure:function(args){
			if(args.templateManager)
				laurbe.templateManager._configure(args.templateManager);
		}
		

	};

    return laurbe;
});



