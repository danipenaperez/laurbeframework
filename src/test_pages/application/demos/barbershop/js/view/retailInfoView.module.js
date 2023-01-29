import laurbe from '../../../../../../js/core/laurbe.js';

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
          lat: 40.67299325724363,
          lng: -4.090292276699187
          
        } ,
        onclickHandler: function(){
          alert('soy el maps');
        }
      })
    ]
    , onShow:function(instance){
      getUserInfo(laurbe.Directory['AboutUs_Map'].instanceProperties.updateModel);
    }
});

export default retailInfoView;