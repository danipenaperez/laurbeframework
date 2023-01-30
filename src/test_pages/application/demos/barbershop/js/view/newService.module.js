import laurbe from '../../../../../../js/core/laurbe.js';

function BuildNewServiceWizardView(args){


    var newServiceView = new laurbe.View({
        id: 'Pedir_Cita',
        navigator:{
          menuName: 'Nueva Cita'
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
                                          items:
                                            buildServices(args)
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
                            slots: buildScheduleList()
                        })
                      ] 
                    }),
                    new laurbe.WizardStep({
                      stepTitle:'Finalizado', formTitle:'Reserva completada' , description: 'Vas a quedar to guapo', 
                      items:[
                          new laurbe.Image({
                            img_src: '/images/success.gif',
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
  return newServiceView;
}


function buildServices(retailInfo){
  var retailServices =[];
  retailInfo.services.forEach(function (serviceInfo, index) {
      var ServiceCarouselItem = new laurbe.CarouselItem({
                                    items:[
                                      new laurbe.Profile({
                                        name:serviceInfo.name,
                                        img:serviceInfo.photo,
                                        legend:serviceInfo.description,
                                        onShow:function(){
                                          alert('asociando '+ '#'+this.id+'_chooseButton');
                                          $('#'+this.id+'_chooseButton').on('click', function(component){
                                            component.preventDefault();
                                            alert('me han clikeado '+ component);
                                            
                                          });
                                        }
                                      })
                                    ]
                                  });
      retailServices.push(ServiceCarouselItem);
  });
  return retailServices;
}

function buildScheduleList(selectedDate, reservedList){
  //Default Time slots
  var selectedDate = '1995-12-17';
  var slots=[
    {start: new Date(selectedDate+'T'+'10:00'), end: new Date(selectedDate+'T'+'10:30') , available:true},
    {start: new Date(selectedDate+'T'+'10:30'), end: new Date(selectedDate+'T'+'11:00'), available:true},
    {start: new Date(selectedDate+'T'+'11:00'), end: new Date(selectedDate+'T'+'11:30'), available:true},
    {start: new Date(selectedDate+'T'+'11:30'), end: new Date(selectedDate+'T'+'12:00'), available:true},
    {start: new Date(selectedDate+'T'+'12:00'), end: new Date(selectedDate+'T'+'12:30'), available:true},
    {start: new Date(selectedDate+'T'+'12:30'), end: new Date(selectedDate+'T'+'13:00'), available:true},
    {start: new Date(selectedDate+'T'+'13:00'), end: new Date(selectedDate+'T'+'13:30'), available:true},
    {start: new Date(selectedDate+'T'+'13:30'), end: new Date(selectedDate+'T'+'14:00'), available:true},
    {start: new Date(selectedDate+'T'+'16:00'), end: new Date(selectedDate+'T'+'16:30'), available:true},
    {start: new Date(selectedDate+'T'+'16:30'), end: new Date(selectedDate+'T'+'17:00'), available:true},
    {start: new Date(selectedDate+'T'+'17:00'), end: new Date(selectedDate+'T'+'17:30'), available:true},
    {start: new Date(selectedDate+'T'+'17:30'), end: new Date(selectedDate+'T'+'18:00'), available:true},
    {start: new Date(selectedDate+'T'+'18:00'), end: new Date(selectedDate+'T'+'18:30'), available:true},
    {start: new Date(selectedDate+'T'+'18:30'), end: new Date(selectedDate+'T'+'19:00'), available:true},
    {start: new Date(selectedDate+'T'+'19:00'), end: new Date(selectedDate+'T'+'19:30'), available:true},
    {start: new Date(selectedDate+'T'+'19:30'), end: new Date(selectedDate+'T'+'20:00'), available:true},
    {start: new Date(selectedDate+'T'+'20:00'), end: new Date(selectedDate+'T'+'20:30'), available:true},
    {start: new Date(selectedDate+'T'+'20:30'), end: new Date(selectedDate+'T'+'21:00'), available:true}
  ];
  //Mark unavailables already reserved

  return slots;
}

export default BuildNewServiceWizardView;