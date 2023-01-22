import laurbe from '../../../../../js/core/laurbe.js';
import initView from './view/initview.module.js';
import newServiceView from './view/newService.module.js';
import retailInfo from './view/retailInfo.module.js';



/**Overwrite default configuration**/
laurbe.configure({
  templateManager:{
      templatePath: 'http://localhost:8888'
    }
});

laurbe._init();

var app = new laurbe.App({
                          title: 'Barber Shop',
                          theme: 'modern', //'peluqueriaCanina',//'dark', //'ligth',
                          appLayoutTemplate:'modern',
                          security:{
                            enabled:true,
                            login: new laurbe.SocialLoginView({})
                          },
                          navBar: {
                            position:'fixed-top',  //TODO: pass args to navbar object on createNavbar on app.module.js
                            brand: {
                              logoUrl: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRM8uXhVk-H56P7eVwwth5qnFm8-zEWIYsY1A&usqp=CAU',
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
                            retailInfo
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
                          
                        //   dao: new laurbe.RestDAO({
                        //     basePath: '.'
                        //   }),
                        //   storageManager: new laurbe.LocalStorageManager({}),
                          bottomNavBar: {
                            items: [
                              new laurbe.NavBarBottomMenuItem({
                                items: [
                                  new laurbe.TextLink({
                                    extraClass: 'nav-menu-item-text-color-white',
                                    text:'Demo link copyrigth'
                                  })
                                ]
                              })
                            ]
                          }
                        });
app.init();

console.log('el app id es '+ app.id);

