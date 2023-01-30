import laurbe from '../../../../../../js/core/laurbe.js';

function BuildRetailInfoView(args){
    var retailInfoView = new laurbe.View({
        id: 'aboutUs',
        navigator:{
          menuName: 'Sobre Nosotros'
          // ,extraClass: 'nav-menu-item-text-color-black nav-menu-item-typo'
        },
        items: [
          new laurbe.Maps({
            id:'AboutUs_Map',
            location:{ 
              lat: args.location.lat,
              lng: args.location.lng
              
            } ,
            onclickHandler: function(){
              alert('soy el maps');
            }
          })
        ]
        
    });
    return retailInfoView;
}

export default BuildRetailInfoView;