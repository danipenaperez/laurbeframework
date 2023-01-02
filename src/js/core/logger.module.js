import laurbe from "./core.module.js";

var logger = {
    enabled:true,
    log:function(obj){
        if(this.enabled){
            console.log(obj);
        }
    }
}

laurbe.logger = logger;
console.log('añadiendo funcion logger a laurbe');

export default laurbe;