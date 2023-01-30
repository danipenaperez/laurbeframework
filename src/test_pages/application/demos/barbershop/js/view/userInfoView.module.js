import laurbe from '../../../../../../js/core/laurbe.js';

import DAO from '../dao/dao.module.js';


function BuildUserInfoView(args){
    var userInfoView = new laurbe.View({
        id: 'Profile',
        navigator:{
          menuName: 'Profilaiss'
          // ,extraClass: 'nav-menu-item-text-color-black nav-menu-item-typo'
        },
        items: [
          new laurbe.UserProfileEditableForm({
              id: 'userInfoView_ProfileEditableForm',
              name:'Paco',
              img:'https://i.imgur.com/JgYD2nQ.jpg',
              legend:'Especializado en barberia y corte oriental, esta noche triunfas fijo!.',
              updateModel:function(model){
                document.getElementById('userInfoView_ProfileEditableForm_image_Profile').src=model.imageProfile;
                document.getElementById('userInfoView_ProfileEditableForm_field_email').value=model.email;
                document.getElementById('userInfoView_ProfileEditableForm_field_userName').value=model.name;
                document.getElementById('userInfoView_ProfileEditableForm_field_userBirth').value=model.birth;
              }
          })
        ],
        onShow:function(instance){
            getUserInfo(laurbe.Directory['userInfoView_ProfileEditableForm'].instanceProperties.updateModel);
        },
        /**
         * Update model Data
         * @param {} model 
         */
        updateModel:function(model){

        }
      });
  return userInfoView;
}
  function getUserInfo(callback, fallback){
    alert('hola soy userinfoview');

    
    DAO.getUserInfo(
        function(data){
            alert('he pillado datos!! '+data);
            callback(data);
        }, function(data){
          console.log(data);
            alert('erroraco llamando por ajax '+data);
            
        }
    );
  }

  export default BuildUserInfoView;