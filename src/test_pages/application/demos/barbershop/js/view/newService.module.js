import laurbe from '../../../../../../js/core/laurbe.js';

var newServiceView = new laurbe.View({
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
                                                  legend:' Soy un hijo puta..... <b>pero hare brillar tu pelo tanto que tus amigos fliparan</b>'
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
  });





export default newServiceView;