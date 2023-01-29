import laurbe from "../core/core.module.js";
import extend from "../core/common.module.js";
/**
 * Como no se puede hacer esto, por problema de cors:
 * import "https://maps.googleapis.com/maps/api/js?key=myKey"
 * Es necesario visitar esa url indicando el APIKey y el fichero javascript que se descarga meterlo en 
 * ../../thirdparty/js/google_maps.js   (si nos fijamos vemos que el JS contiene en el codigo nuestra clave de api)
 * De forma que luego podemos importarlo desde el mismo host asi :
 * import "../../thirdparty/js/google_maps.js" 
 * 
 * Genrera APIKEY, 
 * Crear cuenta de google, entrar en API y Servicios > Credenciales y Pulsas Crear Credenciales y selecionar Clave de API
 * https://console.cloud.google.com/apis/credentials?project=fluid-shadow-293311
 * Despues para habilitar google maps para esa api Key, Crear las restricciones para que solo se pueda usar desde *.miaplicacion.com
 * https://console.cloud.google.com/google/maps-apis/overview;onboard=true?project=fluid-shadow-293311
 * NOTA: creo que con visitar el api de googlemaps ya vale porque automaticamente autogenera una apiKEY
 * 
 * SI VEMOS QUE COBRAN SE PUEDE INSERTAR UN IFRAME CON ILIMITADAS PETICIONES 
 * <iframe
  width="600"
  height="450"
  style="border:0"
  loading="lazy"
  allowfullscreen
  referrerpolicy="no-referrer-when-downgrade"
  src="https://www.google.com/maps/embed/v1/place?key=API_KEY
    &q=Space+Needle,Seattle+WA">
</iframe>
Referecia en esta pagina 
https://developers.google.com/maps/documentation/embed/get-started?_gl=1*u4z81t*_ga*MTkwMDg2OTQ0Ny4xNjY5NTM5Njg5*_ga_NRWSTWS78N*MTY3MzM1MzI1OC4xLjEuMTY3MzM1MzI3OS4wLjAuMA..
 */


//import "../../thirdparty/js/google_maps.js"
// Original from google 
//import "https://maps.googleapis.com/maps/api/js?key=AIzaSyBAp4MAAHQAimgCidlnh6Yp2xe2xOc_Mqc"

//ESte lo resuelve asi https://stephenscaff.com/articles/2019/05/es6-google-maps/


laurbe.prototype.Maps =  extend({}, laurbe.BaseViewElement, {
	/**
	* String type definition
	**/
	type: 'maps',
	/**
	* The laurbe owner element
	**/
	owner:null,
	/**
	* This object is from template, so this is the template info
	**/
	template: {
				scriptId : "mapsTemplate",
				url: '/html/components/maps/mapsTemplate.html'
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
   * Load
   * Create script element with google maps
   * api url, containing api key and callback for
   * map init.
   * @return {promise}
   * @this {_GoogleMapsApi}
   */
	load() {
		let apiKEY = 'AIzaSyBAp4MAAHQAimgCidlnh6Yp2xe2xOc_Mqc';
		if (!this.promise) {
		  this.promise = new Promise(resolve => {
			this.resolve = resolve;
	
			if (typeof window.google === 'undefined') {
			  const script = document.createElement('script');
			//   script.src = `//maps.googleapis.com/maps/api/js?key=${apiKEY}&callback=${this.callbackName}`; 
			  script.src = `//maps.googleapis.com/maps/api/js?key=${apiKEY}`;
			  script.async = true;
			  document.body.append(script);
	
			} else {
			  this.resolve();
			}
		  });
		}
	
		return this.promise;
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
        // The map, centered at location
        const map = new google.maps.Map(document.getElementById("map"), {
            zoom: this.instanceProperties.zoom || 4,
            center: this.instanceProperties.location,
        });
        // The marker, positioned at location
        const marker = new google.maps.Marker({
            position: this.instanceProperties.location,
            map: map,
        });
    },
	/**
	 * 
	 * @param {Update podistion} args 
	 */
	setPosition:function(args){

	}
		

});


/**
 * Constructor definition
 */
laurbe.Maps = function Maps(args){
	
	/** Init values **/
	var defaults = {
        style:{
            custom:'min-height: 600px;width: 100%;'
        },
        zoom: 20,
        /*
        * Cómo obtener las coordenadas de un lugar
        * Abre Google Maps en tu computadora. Haz clic con el botón derecho en el lugar o en el área del mapa. 
        * Se abrirá una ventana emergente. Puedes encontrar tu latitud y longitud en formato decimal en la parte superior.
        */ 
        location:{  //Defatuls Guadarrama
            lat: 40.6727,
            lng: -4.08949
        }
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
	initializationProps.id =  initializationProps.id || laurbe.utils.getIdFor(laurbe.prototype.Maps.type) ;

	/** Return the instance **/
	var instance =  extend({}, laurbe.prototype.Maps, {instanceProperties:initializationProps});

	instance.load();

	return instance;
}

console.log('Component Maps Loaded');

export default laurbe;