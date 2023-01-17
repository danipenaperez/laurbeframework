import laurbe from "../../core/core.module.js";
import extend from "../../core/common.module.js";



laurbe.prototype.App =  extend({}, laurbe.prototype.BaseAPP, {
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
		core:{ //Always thirdparty dependencies
			js: ['/thirdparty/js/jquery.min.js',
				 '/thirdparty/js/bootstrap.min.js', 
				 '/thirdparty/js/jquery.tmpl.min.js',
				 '/thirdparty/js/popper.min.js'],
			css: [
				'/thirdparty/css/bootstrap.min.css',
				'/thirdparty/css/font-awesome.min.css'
			] 
		},

		classic:{
			scriptId : "appTemplate",
			url: '/html/components/app/appClassicTemplate.html',
			styles:'/stylesheets/components/app/classicTemplate.css'
		},
		modern:{
			scriptId : "modernTemplate",
			url: '/html/components/app/modernTemplate.html',
			styles:'/stylesheets/components/app/modernTemplate.css'
		},
		dashboard:{
			scriptId : "appTemplate",
			url: '/html/components/app/appDashboardTemplate.html',
			styles:''
		}
	},	
	
	/**
	* The app main Styles , look and feel
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
		//0.load Thirdparty dependencies
		// this._loadThirdPartyDependencies();
		//1.Set core elements
		this._setCoreElements(this.instanceProperties);
		//2.Set the views
		this._setViews(this.instanceProperties.views);
		//3.Build The menu based on views
		this._buildMenu();
		//4.Render The Menu
		this._render();
	},
	
	/**
	 * Initialize DAO or others core features
	 * @param {} instanceProperties 
	 */
	_setCoreElements:function(instanceProperties){
		if(!instanceProperties.securityManager){
			this.securityManager= new laurbe.SecurityManager({});	
			this.securityManager._init();
		}	
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

		// laurbe.templateManager

		$('#templateManager').load(laurbe.templateManager.templatePath+appLayoutTemplate.url, function(templateString,  ajaxObject, ajaxState){
			
			//1.Render APP Template and styles
			$('#'+appLayoutTemplate.scriptId).tmpl({}).appendTo('body');
			laurbe.utils.loadCSS(appLayoutTemplate.styles);

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
		for (var index = 0; index < views.length; index++) {
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

		this.instanceProperties.views.forEach(function (view, index) {
			var menuItem = new laurbe.NavBarMenuItem({
				text:view.instanceProperties.navigator.menuName,
				extraClass:view.instanceProperties.navigator.extraClass,
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
		//Add Items
		// $.each(this.instanceProperties.views, function( index, view ) {
			
		// 	var menuItem = new laurbe.NavBarMenuItem({
		// 		text:view.instanceProperties.navigator.menuName,
		// 		extraClass:view.instanceProperties.navigator.extraClass,
		// 		relatedView:view,
		// 		selected: false,
		// 		onclick:function(){
		// 			self._navigate(this.relatedView.instanceProperties.id,null);
		// 		}
		// 	});

		// 	view.relatedMenuItem=menuItem;
			
		// 	menuItems.push(
		// 		menuItem
		// 	);
		// });

		//Build Menus
		this.menu = new laurbe.NavBar({	
										id: 'navbar_'+self.instanceProperties.id, //The navbar has appNameRefernce
				        				renderTo:'appMenuContainer',
										title:this.instanceProperties.title,
										items:menuItems,
										theme:laurbe.themes[this.instanceProperties.theme],
										position: this.instanceProperties.navBar.position ,
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
		var self = this;
		//0.Security
		this.securityManager.checkLogged(function(){
			//1.Validations
			var targetViewID= viewId != undefined ? viewId :self.navigatorManager.getCurrentViewId();
			if(!targetViewID){//calculate
				targetViewID=self.views[0].instanceProperties.id;
			}
			//Sanitize 
			targetViewID = targetViewID.replace('#','');  //The a href="#" stain the URL adding # at the end and this broke the navigationmanager._navigate

			var random_boolean = Math.random() < 0.5;
			if(random_boolean){
				//$('#loginShowBtn').click();
			}
			//1.Store Navigation info
			self.navigatorManager.storeNavigationInfo(targetViewID, args);
			//2.Show the view
			var targetView = self.viewDirectory[targetViewID];
			self.menu._selectMenuItem(targetView.relatedMenuItem);
			self._showView(targetView);
		});
		
		// alert('acabo de renderizar el login');
		



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
			id:'annonymousAPP',
			/**
			 *  the App title and name
			**/
			title: 'My App',
			/**
			 * Default HTML stub and css configuration
			 */
			appLayoutTemplate:'classic',
			config:{

			}
	};
	
	/** Extends Defautls with args constructor **/
	var initializationProps = extend({}, defaults, args);

	/**Sitio Id **/
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Layout.type) ;

	/** Return the instance **/
	var instance = extend({}, laurbe.prototype.App, {instanceProperties:initializationProps});

	console.log('la instance es ');
	console.log(instance);
	return instance;
}
console.log('Component App Loaded');

export default laurbe;