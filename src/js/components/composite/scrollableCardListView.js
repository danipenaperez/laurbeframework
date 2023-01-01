define(['laurbe','jquery'], function (laurbe, $) {
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

	return instance;
}

return laurbe.ScrollableCardListView;

});