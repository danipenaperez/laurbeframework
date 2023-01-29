import laurbe from '../../../../../js/core/laurbe.js';

/**Overwrite default configuration**/
laurbe.configure({
    templateManager:{
         templatePath: 'http://localhost:8888'
        //templatePath: 'http://192.168.1.44:8888'
      }
  });

  
laurbe._init();

