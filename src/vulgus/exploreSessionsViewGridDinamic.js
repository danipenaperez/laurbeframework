var exploreSessionsViewGridDinamic = new laurbe.ScrollableCardListView({
    menuName:'Explore',
    id: 'ExploreSessions_View',
    items:[],
    pageNumber:0,
    onShow: function(instance){
        //alert('ahi voy');
        fetchSessions({"genre": "metal"},instance);
    },
    
    onInfiniteScroll:function(instance){
		//alert('thats me on infinite scroll');
        fetchSessions({"genre": "metal"},instance);
	}
    
});


/******
 *  FUNCTIONALLITY METHODS
 *****/

 function fetchSessions(args, instance){
    //alert(loadViewArgs.id_session);
    //alert('fetching data from ./vulgus/rest/sessions_andjustice.js...');
    var targetURL = "/vulgus/rest/fetchedSessions.json";
    vulgus_app.dao.getURL(targetURL, 
        function(data){
            printSessions(data,instance);
        }, function(data){
            alert('Problema al cargar las sesiones');
        }
    );
 }

function printSessions(dataLoaded, instance){
    console.log('estoy en ScrollableView y voy a cargar de lo recibido por llamada Ajax a fetchedSessions.js');
    //alert('received new '+ dataLoaded.length+ ' music sessions');
    //Es necesario acceder al grid principal
    var instanceGridContainer = instance.instanceProperties.items[0];
    //Parte un array en pares de 2 y si es impar siempre queda un elemento suelto
    laurbe.utils.pairDataArraywise(dataLoaded,2, function(obj1,obj2){
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
                                    //alert('soy '+obj1.title+ ' '+ obj1.id_session);
                                    vulgus_app._navigate('DetailedSessionView', {"id_session": obj1.id_session});
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
                                    //alert('soy '+obj2.title+ ' '+ obj2.id_session);
                                    vulgus_app._navigate('DetailedSessionView', {"id_session": obj2.id_session});
                                }
                            })
                    ]
                })
            );
        }
        instanceGridContainer._appendChilds([new laurbe.Row({
            items:_items
        })],true);
        
    });
    instance.instanceProperties.pageNumber++;
    $('#page_number').html('['+instance.instanceProperties.pageNumber+']');

}