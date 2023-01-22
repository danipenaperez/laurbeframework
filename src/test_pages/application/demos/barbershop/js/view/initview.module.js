import laurbe from '../../../../../../js/core/laurbe.js';

var initView = new laurbe.View({
    id: 'Inicio',
    navigator:{
      menuName: 'Inicio'
      // ,extraClass: 'nav-menu-item-text-color-black nav-menu-item-typo'
    },
    items: [
      
    ],
    onShow:function(instance){
        alert('soy el onwho del initview');
        var options = new laurbe.JumbotronGroup({
            items:[
              new laurbe.Jumbotron({
                  title:'Solicitar cita',
                  description: 'mis movidas uno',
                  onclick:function(){
                    app._navigate('Pedir_Cita', {});
                  }
              }),
              new laurbe.Jumbotron({
                title:'Anular Cita',
                description: 'mis movidas dos',
                onclick:function(){
                  alert('WIP Anulando citas');
                }
              }),
              new laurbe.Jumbotron({
                title:'Mis Citas',
                description: 'Consulta tus citas facilmente',
                onclick:function(){
                  alert('WIP Consultando citas');
                }
              })
            ]
          })
        instance._appendChilds([options],true);
     }
  });

  function saludame(){
    alert('hola soy initview');
  }

  export default initView;