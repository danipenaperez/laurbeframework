var dynamicView = new laurbe.View({
    id:'dynamicView',
    menuName:'dynamicView',
    onShow:function(instance){
        laurbe.logger.log('--------on show especifico de la instancia--------');
    },
    items:[
        new laurbe.Layout({
            items: [
                new laurbe.Region({
                    text:'',
                    items:[
                        new laurbe.Form({
                            id:'dynamicView_UserForm',
                            items:[
                                new laurbe.Button({
                                    text:'Load Form Data',
                                    onclick:function(_self){
                                        fetchUserData();
                                    }
                                })

                            ]
                        })
                        
                    ]
                })
            ]
        })
    ]
});		


function fetchUserData(){
    vulgus_app.dao.getURL("/vulgus/rest/userData.json", function(data){
                                                            printUserFormData(data);
                                                        });
}
   
   
   function printUserFormData(data){
        alert('printeando al user '+data.name);
       laurbe.Directory['dynamicView_UserForm']._appendChilds([
           new laurbe.Image({
               img_src: 'https://yt3.ggpht.com/-tO_SdVYSVg8/AAAAAAAAAAI/AAAAAAAAAAA/t089mcHnzD0/s100-mo-c-c0xffffffff-rj-k-no/photo.jpg',
               alt:'Daniel Peña Perez',
               onclick: function(){
                   alert('Yeah, Rock Now!');
               }
           }),
           new laurbe.TextField({
               label:'Name',
               value:data.name
           }),
           new laurbe.TextField({
               label:'edad',
               value:data.age
           }),
           new laurbe.TextField({
               label:'Score',
               value:'4/5'
           }),
           new laurbe.TextField({
               label:'Plays',
               value:'Guitar, Bass'
           }),
           new laurbe.TextField({
               label:'Zones',
               value:data.zones
           })
           ], true);
   }