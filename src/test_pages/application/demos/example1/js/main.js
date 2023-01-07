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

alert('ejecutando on load');
/**Overwrite default configuration**/
laurbe.configure({
  templateManager:{
      templatePath: 'http://localhost:8888'
    }
});

laurbe._init();

var app = new laurbe.App({
                          title: 'Example layout 1',
                          theme: 'ligth',
                          navBar: {
                            brand: {
                              logoUrl: 'https://upload.wikimedia.org/wikinews/en/7/7e/International_Monetary_Fund_logo.svg'
                            },
                            searchTool: {
                              placeholder: 'looking for...'
                            }
                          },
                          views: [
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
                                  extraStyle:'height: 250px',
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

