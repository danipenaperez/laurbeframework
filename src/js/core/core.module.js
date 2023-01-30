

var laurbe ={
		dependencies:{
			// js: [
			// 	'/thirdparty/js/jquery.min.js',
			// 	'/thirdparty/js/bootstrap.min.js', 
			// 	'/thirdparty/js/jquery.tmpl.min.js',
			// 	'/thirdparty/js/popper.min.js'
			// ],
			css: [
				'/thirdparty/css/bootstrap.min.css',
				'/thirdparty/css/font-awesome.min.css'
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
			this.templateManager._init();
			this.modalDialogManager._init();//create div to load modalDialog Manager
			
			
		},
		/**
		 * Load dependencies on page
		 */
		_importThirdPartyDependencies:function(){
			var _self=this;

			this.dependencies.css.forEach(function (val, index) {
				
				_self.utils.loadCSS(val);
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

export default laurbe ;




