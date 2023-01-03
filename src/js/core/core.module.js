

var laurbe ={
        /**
		 * Reference for all created elements
		 */
		Directory:{

		},
		/**
		 * Reference for current APP Instance
		 */
		currentApp:{

		},/**
		 * Default store for prototype loaded references
		 * (if the Js file is loaded will be added here to be available
		 */
		prototype:{
			BaseApp:{},
			BaseView:{},
			composite:{}
		},
        /**
		* Init framework
		**/
		_init:function(){
			//Load thirdparty dependencies
			this._importThirdPartyDependencies();
			//Load Laurbe core compoenents
			this._importLaurbeComponents();
			
			
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
		 * Overwrite configuration
		 * @param {} args 
		 */
		configure:function(args){
			if(args.templateManager)
				laurbe.templateManager._configure(args.templateManager);
		}
};
console.log('ejecutando el core');
export default laurbe ;




