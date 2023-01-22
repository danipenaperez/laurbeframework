import laurbe from '../../../../../../js/core/laurbe.js';

var retailInfo = new laurbe.View({
    id: 'aboutUs',
    navigator:{
      menuName: 'Sobre Nosotros'
      // ,extraClass: 'nav-menu-item-text-color-black nav-menu-item-typo'
    },
    items: [
      new laurbe.Calendar({
        
      })
    ]
});

export default retailInfo;