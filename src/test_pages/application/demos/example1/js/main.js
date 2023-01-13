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
                            new laurbe.View({
                              id: 'jumbontron',
                              navigator:{
                                menuName: 'jumbotron'
                                // ,extraClass: 'nav-menu-item-text-color-black nav-menu-item-typo'
                              },
                              items: [
                                  new laurbe.CardGroup({
                                    items: [
                                        new laurbe.Card({
                                          title:'Card1',
                                          text:'Novedades de la herramieta, conectate y sientete conectado',
                                          footMessage:'footermeeess',
                                          img:{
                                            src: 'https://mdbcdn.b-cdn.net/img/new/slides/041.webp'
                                            ,
                                            alt: 'mi imagen'
                                          }
                      
                      
                                        }),	
                                        new laurbe.Card({
                                          title:'Card2',
                                          text:'Si quiere convertirte en chef este es tu lugar',
                                          footMessage:'footermeeess',
                                          img:{
                                            src: 'https://www.paradigmadigital.com/wp-content/uploads/2019/03/testKotlin-01.jpg',
                                            alt: 'mi imagen'
                                          },
                                          onclick:function(){
                                            console.log('estoy clickando pero no sale el alert!!!');
                                            alert('me han pulsado' +this.id);
                                          }
                                        })
                                    ]
                                  })
                                ]
                            }),
                            new laurbe.View({
                              id: 'maps',
                              navigator:{
                                menuName: 'maps'
                                // ,extraClass: 'nav-menu-item-text-color-black nav-menu-item-typo'
                              },
                              items: [
                                new laurbe.Maps({
                                  location:{ 
                                    lat: 40.67299325724363,
                                    lng: -4.090292276699187
                                    
                                  } ,
                                  onclickHandler: function(){
                                    alert('soy el maps');
                                  }
                                })
                              ]
                            }),
                            new laurbe.View({
                              id: 'wizard',
                              navigator:{
                                menuName: 'Wizard'
                                // ,extraClass: 'nav-menu-item-text-color-black nav-menu-item-typo'
                              },
                              items: [
                                new laurbe.Wizard({
                                        title:'Nueva Cita',
                                        description: 'Creando nueva cita',
                                        steps:[
                                            new laurbe.WizardStep({  
                                                                    stepTitle:'Datos', 
                                                                    formTitle:'Datos personales' , 
                                                                    description: 'dame tus datos',
                                                                    items:[
                                                                        new laurbe.Form({
                                                                            items:[
                                                                                new laurbe.TextField({
                                                                                    //label:'email',
                                                                                    value:'aucton@hotmail.com'
                                                                                }),
                                                                                new laurbe.TextField({
                                                                                    //label:'edad',
                                                                                    value:'25'
                                                                                }),
                                                                                new laurbe.TextField({
                                                                                    //label:'Features',
                                                                                    value:'vago y gandul'
                                                                                })
                                        
                                                                            ]
                                                                        })
                                                                    ]
                                                                }),
                                            new laurbe.WizardStep({ 
                                                                    stepTitle:'Pagamientos', 
                                                                    formTitle:'DAtos Bancarios' , 
                                                                    description: 'como vas a pagar' , 
                                                                    items:[
                                                                        new laurbe.Image({
                                                                            img_src: 'https://cronicaglobal.elespanol.com/uploads/s1/21/10/73/63/europapress-4382401-paz-padilla-imagen-archivo.jpeg',
                                                                            alt:'Paz padilla',
                                                                            onclick: function(){
                                                                                alert('me han clickado y soy la imagen del '+this.alt);
                                                                                loadMore();
                                        
                                                                            }
                                                                        })
                                                                    ]
                                                                }),
                            
                                            new laurbe.WizardStep({
                                                                stepTitle:'Ya veo', formTitle:'Gafas personales' , description: 'pues yo no veo nada', 
                                                                items:[
                                                                  new laurbe.Profile({
                                  
                                                                  }),
                                                                  new laurbe.Profile({
                                  
                                                                  })
                                                                ] 
                                            }),
                                            new laurbe.WizardStep({
                                                                    stepTitle:'Finalizar', formTitle:'Datos personales' , description: 'terminar', 
                                                                  items:[
                                                                      new laurbe.Image({
                                                                          img_src: 'https://upload.wikimedia.org/wikipedia/commons/thumb/6/68/Rafael_Nadal_%2812054444625%29.jpg/500px-Rafael_Nadal_%2812054444625%29.jpg',
                                                                          alt:'Nadal',
                                                                          onclick: function(){
                                                                              alert('me han clickado y soy la imagen del '+this.alt);
                                                                              loadMore();
                                                  
                                                                          }
                                                                      })
                                                                  ] 
                                              })
                                        ]
                                })
                              ]
                            }),
                            new laurbe.View({
                              id: 'jumbotrones',
                              navigator:{
                                menuName: 'jumbotrones'
                                // ,extraClass: 'nav-menu-item-text-color-black nav-menu-item-typo'
                              },
                              items: [
                                new laurbe.JumbotronGroup({
                                  items:[
                                    new laurbe.Jumbotron({
                                        title:'Pedir citacion',
                                        description: 'mis movidas uno',
                                        onclick:function(){
                                          alert('Vamos a pedir una cita');
                                        }
                                    }),
                                    new laurbe.Jumbotron({
                                      title:'Anular citacion',
                                      description: 'mis movidas dos',
                                      onclick:function(){
                                        alert('Anulando citas');
                                      }
                                    }),
                                    new laurbe.Jumbotron({
                                      title:'Consutar citas',
                                      description: 'Consulta tus citas facilmente',
                                      onclick:function(){
                                        alert('Consultando citas');
                                      }
                                    })
                                  ]
                                })
                              ]
                            }),
                            new laurbe.View({
                              id: 'viewA_View',
                              navigator:{
                                menuName: 'Menu A'
                                // ,extraClass: 'nav-menu-item-text-color-black nav-menu-item-typo'
                              },
                              items: [
                                new laurbe.Region({
                                  text: 'Region A.1',
                                  extraClass:'bg-info' 
                                }),
                                new laurbe.Region({
                                  text: 'Region A.2',
                                  extraClass:'bg-danger' 
                                }),
                                new laurbe.Region({
                                  text: 'Region A.3',
                                  extraClass:'bg-warning' 
                                })
                              ]
                            }),
                            new laurbe.View({
                              id: 'viewB_View',
                              navigator:{
                                menuName: 'Menu B'
                                // extraClass: 'nav-menu-item-text-color-black nav-menu-item-typo'
                              },
                              items: [
                                new laurbe.Region({
                                  text: 'Region A.1',
                                  extraClass:'bg-warning', 
                                  extraStyle:'height: 5550px',
                                  items:[
                                        new laurbe.Region({
                                                  text: 'Sub Region A.1.1',
                                                  extraClass:'bg-success border border-dark rounded'
                                        }), 
                                        new laurbe.Region({
                                                  text: 'Sub Region A.1.2',
                                                  extraClass:'bg-secondary border border-dark rounded'
                                        })
                                  ]
                                }),
                                new laurbe.Region({
                                  text: 'Region A.2',
                                  extraClass:'bg-secondary' 
                                }),
                                new laurbe.Region({
                                  text: 'Region A.3',
                                  extraClass:'bg-success' 
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

