import laurbe from '../../../../../js/core/laurbe.js';
// import jQuery from "./jquery.module.js";
// window.$ = window.jQuery = jQuery;
// console.log('soy el primer import');
// console.log(jQuery);

// import '../../../../../thirdparty/js/popper.js'

// import 'https://code.jquery.com/jquery-3.6.0.min.js'
// import 'https://bowercdn.net/c/jquery-tmpl-latest/jquery.tmpl.js'

laurbe.logger.log('paco is my name');
console.log(laurbe);

console.log($);

// $('#header').html('joseluis');
var button = new laurbe.Button({});
console.log('ybutton es');
console.log(button);

var ButtonGroup = new laurbe.ButtonGroup({});
console.log('ybuttongroup es');
console.log(ButtonGroup);


var card = new laurbe.Card({});
console.log('card es');
console.log(card);

var cardGroup = new laurbe.CardGroup({});
console.log('cardgroup es');
console.log(cardGroup);

var column = new laurbe.Column({});
console.log('column es');
console.log(column);

var Comment = new laurbe.Comment({});
console.log('Comment es');
console.log(Comment);

var CommentsGroup = new laurbe.CommentsGroup({});
console.log('CommentsGroup es');
console.log(CommentsGroup);

var Container = new laurbe.Container({});
console.log('Container es');
console.log(Container);

var Form = new laurbe.Form({});
console.log('Form es');
console.log(Form);

var Grid = new laurbe.Grid({});
console.log('Grid es');
console.log(Grid);

var Image = new laurbe.Image({});
console.log('Image es');
console.log(Image);

var Layout = new laurbe.Layout({});
console.log('Layout es');
console.log(Layout);

var ModalDialog = new laurbe.ModalDialog({});
console.log('ModalDialog es');
console.log(ModalDialog);

var NavBar = new laurbe.NavBar({});
console.log('NavBar es');
console.log(NavBar);

var NavBarBottom = new laurbe.NavBarBottom({});
console.log('NavBarBottom es');
console.log(NavBarBottom);

var NavBarBottomMenuItem = new laurbe.NavBarBottomMenuItem({});
console.log('NavBarBottomMenuItem es');
console.log(NavBarBottomMenuItem);

var NavBarMenuItem = new laurbe.NavBarMenuItem({});
console.log('NavBarMenuItem es');
console.log(NavBarMenuItem);

var Region = new laurbe.Region({});
console.log('Region es');
console.log(Region);

var Row = new laurbe.Row({});
console.log('Row es');
console.log(Row);

var SpotifyAudio = new laurbe.SpotifyAudio({});
console.log('SpotifyAudio es');
console.log(SpotifyAudio);

var TextField = new laurbe.TextField({});
console.log('TextField es');
console.log(TextField);

var TextLink = new laurbe.TextLink({});
console.log('TextLink es');
console.log(TextLink);

var Title = new laurbe.Title({});
console.log('Title es');
console.log(Title);

var Video = new laurbe.Video({});
console.log('Video es');
console.log(Video);

var YouTubeVideo = new laurbe.YouTubeVideo({});
console.log('YouTubeVideo es');
console.log(YouTubeVideo);

var App = new laurbe.App({});
console.log('App es');
console.log(App);

var View = new laurbe.View({});
console.log('View es');
console.log(View);

/**Overwrite default configuration**/
laurbe.configure({
  templateManager:{
      templatePath: 'http://192.168.1.44:8888'
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
                            new laurbe.View({
                              id: 'Inicio',
                              navigator:{
                                menuName: 'Inicio'
                                // ,extraClass: 'nav-menu-item-text-color-black nav-menu-item-typo'
                              },
                              items: [
                                new laurbe.JumbotronGroup({
                                  items:[
                                    new laurbe.Jumbotron({
                                        title:'Pedir citacion',
                                        description: 'mis movidas uno',
                                        onclick:function(){
                                          app._navigate('Pedir_Cita', {});
                                        }
                                    }),
                                    new laurbe.Jumbotron({
                                      title:'Anular citacion',
                                      description: 'mis movidas dos',
                                      onclick:function(){
                                        alert('WIP Anulando citas');
                                      }
                                    }),
                                    new laurbe.Jumbotron({
                                      title:'Consutar citas',
                                      description: 'Consulta tus citas facilmente',
                                      onclick:function(){
                                        alert('WIP Consultando citas');
                                      }
                                    })
                                  ]
                                })
                              ]
                            }),
                            new laurbe.View({
                              id: 'Pedir_Cita',
                              navigator:{
                                menuName: 'Nueva Cita'
                                // ,extraClass: 'nav-menu-item-text-color-black nav-menu-item-typo'
                              },
                              items: [
                                new laurbe.Wizard({
                                        title:'Nueva Cita',
                                        description: 'Creando nueva cita',
                                        steps:[
                                            new laurbe.WizardStep({
                                                                stepTitle:'Elige tu estilista', formTitle:'Tu Profesional' , description: 'Elige al pollito', 
                                                                items:[
                                                                  new laurbe.Carousel({
                                                                    items:[
                                                                      new laurbe.CarouselItem({
                                                                        items:[
                                                                          new laurbe.Profile({
                                                                            name:'Vladimir',
                                                                            img:'https://i2-prod.walesonline.co.uk/news/uk-news/article23927263.ece/ALTERNATES/s1200c/0_F038F02A-D11F-11EC-A042-0A2111BCB09D.jpg',
                                                                            legend:' Soy un hijo puta pero hare brillar tu pelo tanto que tus amigos fliparan'
                                                                          })
                                                                        ]
                                                                      }),
                                                                      new laurbe.CarouselItem({
                                                                        items:[
                                                                          new laurbe.Profile({
                                                                            name:'Paco',
                                                                            img:'https://i.imgur.com/JgYD2nQ.jpg',
                                                                            legend:'Especializado en barberia y corte oriental, esta noche triunfas fijo!.'
                                                                          })
                                                                        ]
                                                                        
                                                                      })
                                                                    ]
                                                                  })
                                                                ] 
                                            }),
                                            new laurbe.WizardStep({
                                                                  stepTitle:'Dia', formTitle:'¿Que dia te viene mejor' , description: 'No te olvides de venir', 
                                                                  items:[
                                                                    new laurbe.Calendar({
                                  
                                                                    })
                                                                  ] 
                                              }),
                                              new laurbe.WizardStep({
                                                stepTitle:'Hora', formTitle:'Horas disponibles en verde' , description: 'veras la que lias', 
                                                items:[
                                                  new laurbe.ChoiceButtonList({
                
                                                  })
                                                ] 
                                              }),
                                              new laurbe.WizardStep({
                                                stepTitle:'Finalizado', formTitle:'Reserva completada' , description: 'Vas a quedar to guapo', 
                                                items:[
                                                    new laurbe.Image({
                                                      img_src: 'https://i.pinimg.com/originals/e8/06/52/e80652af2c77e3a73858e16b2ffe5f9a.gif',
                                                      alt:'Finalizado',
                                                      onclick: function(){
                                                      
                                                      }
                                                  })
                                                ] 
                                              })
                                        ]
                                })
                              ]
                            }),
                            new laurbe.View({
                              id: 'aboutUs',
                              navigator:{
                                menuName: 'Sobre Nosotros'
                                // ,extraClass: 'nav-menu-item-text-color-black nav-menu-item-typo'
                              },
                              items: [
                                new laurbe.Calendar({
                                  
                                })
                              ]
                            }),
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

