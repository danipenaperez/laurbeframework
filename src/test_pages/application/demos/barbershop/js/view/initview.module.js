import laurbe from '../../../../../../js/core/laurbe.js';

import DAO from '../dao/dao.module.js';

var initView = new laurbe.View({
    id: 'Inicio',
    navigator:{
      menuName: 'Inicio'
    },
    items: [
      new laurbe.JumbotronGroup({
        items:[
          new laurbe.Jumbotron({
              title:'Solicitar cita',
              description: 'mis movidas uno',
              onclick:function(){
                getBussinesInfo();
                window.app._navigate('Pedir_Cita', {});
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
    ],
    onShow:function(instance){
        // instance._appendChilds([options],true);
     }
  });

  function getBussinesInfo(){
    alert('hola soy initview');

    
    DAO.getBussinesInfo(
        function(data){

            alert('he pillado datos!! '+data);
        }, function(data){
          console.log(data);
            alert('erroraco llamando por ajax '+data);
            
        }
    );
  }

  export default initView;