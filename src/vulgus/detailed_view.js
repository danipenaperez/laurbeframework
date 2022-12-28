var detailedView = new laurbe.ScrollableCardListView({
    menuName:'DetailSession',
    id: 'DetailedSessionView',
    items:[
        new laurbe.Container({
                items:[
                    new laurbe.CardGroup({
                        id:'detailedSessionMainCardGroup',
                        items:[],
                        onShow:function(instance){
                           //CLEAR
                            var mainCardGroup2 = laurbe.Directory['detailedSessionMainCardGroup'];
                            mainCardGroup2.removeAllChilds();
                            //LOAD
                            var id_session = vulgus_app.navigatorManager.getCurrentViewArg('id_session');
                            console.log('es mas es qeu idesesion es '+id_session);
                            if(id_session){
                                fetchSession(id_session, instance);
                            }else{
                                alert('No existe el parametro en la url error No existe el sessionid');
                                vulgus_app._navigate('ExploreSessions_View', {"genre": "metal"});
                            }
                        }
                    })
                ]
            })
    ]                     
    
});


/******
 *  FUNCTIONALLITY METHODS
 *****/
 function fetchSession(id_session, instance){
    //alert(loadViewArgs.id_session);
    //alert('fetching data from ./vulgus/rest/sessions_andjustice.js...');
    var targetURL = "/vulgus/rest/sessions_"+id_session+".json";
    vulgus_app.dao.getURL(targetURL, 
        function(data){
            printSessionInfo(data);
        }, function(data){
            alert('error No existe el sessionid');
            vulgus_app._navigate('ExploreSessions_View', {"genre": "metal"});
        }
    );
 }


 function printSessionInfo(data){




    //SetList
    let setList = [];
    $.each(data.setList, function( key, song ) {
		if(song.link.type=='spotify'){
            setList.push(
                new laurbe.SpotifyAudio({
                    src: song.link.src
                })
            );
        }
	});

    //Comments
    let comments =[];
    $.each(data.comments, function( key, comment ) {
        let text = comment.content.find(function(el){el.type=='text'});
        var commentItems =[];
        $.each(comment.content, function( key, contentItem ) {
            if(contentItem.type == 'text'){
                text = contentItem.value;
            }
            if(contentItem.type == 'youTubeVideo'){
                commentItems.push(
                    new laurbe.YouTubeVideo({
                        src: contentItem.src
                    })
                );
            }
            if(contentItem.type == 'video'){
                commentItems.push(
                    new laurbe.Video({
                        src: contentItem.src
                    })
                );
            }
        });
        //Prepare the full comment
		comments.push(
            new laurbe.Comment({
                title:comment.user.name,
                img:{
                    src:comment.user.img
                },
                text: text || "",
                items:commentItems
            })
        );
        
	});


    let to_append_items=[
        new laurbe.Card({
            title:data.title,
            text:data.description,
            footMessage:'Metal, Metallica',
            img:{
                src: data.img,
                alt: 'Metallic Aftenoon'
            },
            items:[
                new laurbe.CommentsGroup({
                            title:'Set List',
                            id:'detailedSessionSetList',
                            items:[
                                new laurbe.Comment({
                                    title:'Belic Material',
                                    items:setList
                                })
                            ]
                }),
                new laurbe.Button({
                                                text:'boton 11!!',
                                                span:{
                                                    text:'4'
                                                },
                                                onclick:function(){
                                                    
                                                    var setListWrapper = laurbe.Directory['detailedSessionSetList'];
                                                    
                                                    setListWrapper._appendChilds([
                                                            new laurbe.SpotifyAudio({
                                                                    id:'newSong',
                                                                    src: 'https://open.spotify.com/embed/track/78XG7U0UueeC86XpzF9O7f'
                                                                })	
                                                        ], true);

                                                    laurbe.utils.focusAndScrollToElement('newSong');

                                                }
                                            }),
                new laurbe.CommentsGroup({
                            title:'Session Comments',
                            items:comments
                    })

            ]
        })
    ];



    var mainCardGroup2 = laurbe.Directory['detailedSessionMainCardGroup'];
    mainCardGroup2.removeAllChilds();
    mainCardGroup2._appendChilds([new laurbe.Row({
        items:to_append_items
    })],true);
}

