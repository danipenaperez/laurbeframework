import laurbe from "./core.module.js";

var utils = {
    
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
}

laurbe.utils = utils;
console.log('añadiendo funcion utils a laurbe');

export default laurbe;