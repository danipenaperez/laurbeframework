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