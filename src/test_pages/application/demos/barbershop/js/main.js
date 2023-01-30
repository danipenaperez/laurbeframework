import laurbe from '../../../../../js/core/laurbe.js';
import './configuration.module.js';
import BuildInitView from './view/initview.module.js';
import BuildNewServiceWizardView from './view/newService.module.js';
import BuildRetailInfoView from './view/retailInfoView.module.js';
import BuildUserInfoView from './view/userInfoView.module.js';
import DAO from './dao/dao.module.js';

var app;

function init(retailInfo, userInfo){
    
    let appArgs ={
      title: retailInfo.name,
      theme: 'modern', //'peluqueriaCanina',//'dark', //'ligth',
      appLayoutTemplate:'modern',
      dao: DAO,
      onInit:function(app){ },
      navBar: {
        position:'fixed-left',  //TODO: pass args to navbar object on createNavbar on app.module.js
        brand: {
          logoUrl: retailInfo.logoUrl,
          extraClass:'rounded-circle'
        },
        searchTool: {
          placeholder: 'looking for...'
        },
        userInfo: userInfo
      },
      views: [    
        BuildInitView(retailInfo) ,
        BuildNewServiceWizardView(retailInfo) ,
        BuildRetailInfoView(retailInfo),
        BuildUserInfoView(retailInfo)
      ],
      bottomNavBar: {
        items: [
          new laurbe.NavBarBottomMenuItem({
            items: [
              new laurbe.TextLink({
                extraClass: 'nav-menu-item-text-color-white',
                text:'Contact us on '+retailInfo.contactInfo.phone + ' or send us an email to '+retailInfo.contactInfo.email 
              })
            ]
          })
        ]
      }
    };
    /**
     * Security
     */
    if(retailInfo.security.enabled){
      appArgs.security={
        enabled:true,
        type:retailInfo.security.type,
        appName: retailInfo.name
      };
    }


    app = new laurbe.App(appArgs);
    app.init();
    window.app=app;
}

/**
 * Chain sequenced loading :-(, change for promises and joinAllPromises
 */
DAO.getBussinesInfo(function(retailInfo){
  DAO.getUserInfo(function(userInfo){
    init(retailInfo, userInfo);
  },null, true);

},null,true);



/**
 

app = new laurbe.App({
      title: retailInfo.name,
      theme: 'modern', //'peluqueriaCanina',//'dark', //'ligth',
      appLayoutTemplate:'modern',
      security:{
        enabled:true,
        login: new laurbe.SocialLoginView({})
      },
      dao: DAO,
      onInit:function(app){
        console.log('onInit de la aplicacion');
        //console.log(app.dao);
        //Preload DAO Data
        //DAO.getBussinesInfo(null,null,true);
        

      },
      navBar: {
        position:'fixed-top',  //TODO: pass args to navbar object on createNavbar on app.module.js
        brand: {
          logoUrl: retailInfo.logoUrl,
          extraClass:'rounded-circle'
        },
        searchTool: {
          placeholder: 'looking for...'
        }
      },
      views: [
        
        initView
        ,
        newServiceView
        ,
        retailInfoView
        ,
        new laurbe.View({
          id: 'Profile',
          navigator:{
            menuName: 'Profile'
            // ,extraClass: 'nav-menu-item-text-color-black nav-menu-item-typo'
          },
          items: [
            new laurbe.Profile({
              
            })
          ]
        })
      ],
      bottomNavBar: {
        items: [
          new laurbe.NavBarBottomMenuItem({
            items: [
              new laurbe.TextLink({
                extraClass: 'nav-menu-item-text-color-white',
                text:'Contact us on '+retailInfo.contactInfo.phone + ' or send us an email to '+retailInfo.contactInfo.email 
              })
            ]
          })
        ]
      }
    });



 */




