
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