import laurbe from "../core/core.module.js";

 /**
* Base view element 
*/
var BaseViewElement ={
   /**
   * String type definition
   **/
   type: 'laurbeBaseViewElement',
   /**
    * Current element Id
    */
   id:null,
   /**
    * The wrapper element
    */
   ele:null,
   /**
    * InstanceProperties
    */
   instanceProperties:null,
   /**
   * flag for initialization of current Object
   **/
   initialized:false,
   /**
    * Model Object Data
    */
   model:null,
   /**
   * Returns the id
   **/
   _getName: function(){
       return this.id;
   },
   /**
   * RenderTo Element Jquery reference
   **/
   fatherElement: null,
   /**
   * initialize the wrapper
   **/
   _init: function(){
       this.id = this.instanceProperties.id;
       laurbe.Directory[this.id] = this;
       this.fatherElement = $('#'+this.instanceProperties.renderTo);
       
       if(this.instanceProperties.wrapper && this.instanceProperties.wrapper.tag){
           this.ele = $(this.instanceProperties.wrapper.tag, { 
                                   'id':this.id+'Wrapper',
                                   'click': this.onclickHandler,
                                   'class': this.instanceProperties.wrapper.class
                                   //'html':'<span> soy el '+this.id+'</span>'
                                   });
           this.ele.appendTo(this.fatherElement);
       }else{
           this.ele = this.fatherElement; //father and elewrapper are the same object
       }
       //this.bindEvents();
       if(!this.instanceProperties.items){
           this.instanceProperties.items =[];
       }
       this.initialized = true;
   },
   /**
   * If the component is based on template building
   **/
   template: null,

   
   _render: function(){
       if(!this.initialized){
           this._init();
       }
       if(this.template){
           var self = this;
           var templateInfo = {appendTo: self.ele, data: self.instanceProperties};
           

           /** Load current component template , and render (appentTo) */
            laurbe.templateManager._loadTemplate(self.template.url, function(){
                if(document.getElementById(self.template.scriptId)){
                    //He probado con $('#'+self.template.scriptId).clone() y sigue siendo null la siguiente vez
                    $('#'+self.template.scriptId).clone().tmpl(templateInfo.data).appendTo(templateInfo.appendTo);
                    self._afterRender();
                    if(self.onShow){
                        self.onShow(this);
                    }
                }else{
                        alert('Has cargado la template '+ self.template.url + ' pero el <script id= no concuerda con '+self.template.scriptId);
                        throw 'Has cargado la template '+ self.template.url + ' pero el <script id= no concuerda con '+self.template.scriptId;
                }
            });
            
           
           
           //always load to templateManager div container
           // $('#templateManager').load(laurbe.templateManager.templatePath+self.template.url, function(templateString,  ajaxObject, ajaxState){
           // 	$('#'+self.template.scriptId).tmpl(templateInfo.data).appendTo(templateInfo.appendTo);
           // 	self._afterRender();
           // 	if(self.onShow){
           // 		self.onShow(this);
           // 	}
           // });
           
       }
       
   },
   /**
   * Rebuild/reinitalize the entire element, and render
   **/
   _renderTo:function(wrapperId){
       this.instanceProperties.renderTo=wrapperId;
       this.initialized=false;
       this._render();
   },
   //reload the view component
   refresh:function(){
       console.log('laurbe.refresh()');
       this.destroy();
       this._render();
       // console.log('refreshcated');
   },
   /**
   * After render callback
   **/
   _afterRender:function(){
       if(!this.instanceProperties.wrapper){ //usefull when this.instanceProperties.wrapper is undefined
           $('#'+this.id).on('click', this.onclickHandler);
       }
       
       var self = this;
       //self.bindEvents();
       if(self.instanceProperties.items){
           $.each(self.instanceProperties.items, function( index, item ) {
               item.owner = self;//reference to parent laurbe object
               item._renderTo(self._getRenderChildWrapperId());
           });
           // for(item of self.instanceProperties.items){
           // 	item.owner = self;//reference to parent laurbe object
           //   	item._renderTo(self._getRenderChildWrapperId());
           // }
           // for  (i=0;i<self.instanceProperties.items.length;i++){
           // 	self.instanceProperties.items[i].owner = self;//reference to parent laurbe object
           // 	self.instanceProperties.items[i]._renderTo(self._getRenderChildWrapperId());
           // }
       }

   },
   /**
   * If exists this.items (child laurbe Objects) will renderIt
   **/
   _appendChilds:function(items, renderNow){
       var self = this;
       for  (let i=0;i<items.length;i++){  // Maybe ensure synchronously
           var item = items[i];
           self.instanceProperties.items.push(item);
           item.owner = self;//reference to parent laurbe object
           item.instanceProperties.renderTo = self._getRenderChildWrapperId();
           if(renderNow == true){
               item._render();
           }
       }

   
   },

   /**
   * Where to render child elements
   **/
   _getRenderChildWrapperId:function(){
       console.log('The component '+ this.id+ ' not allows child objects');
   },
   /**
   * Remove all childs
   */
   removeAllChilds:function(){
       console.log('laurbe.removeAllChilds()');
       $('#'+this._getRenderChildWrapperId()).empty();//jquery visual destroy
       this.instanceProperties.items = []; //reinitialize items as empty array
       // console.log('all childs have been removed');
   },
   /**
   * destroy the element
   **/
   destroy:function(){
       console.log('laurbe.destroy()')
       var self = this;
       $.each(this.items, function( index, item ) {
           destroy();
       });
       this.fatherElement.empty();//jquery visual destroy
       // console.log('internal destroy END');
   },
   hide:function(){
    console.log('father element es '+this.fatherElement.id);
    this.fatherElement.hide(); 
   },
   show: function(){
    this.fatherElement.show();
   },
   /**
    * Use it to set the data related with current Element
    * @param {*} args 
    */
   updateModel:function(model){
    if(this.instanceProperties.updateModel){
        this.instanceProperties.updateModel(model);
    }else{
        console.log('Not defined behaviour for this element.');
    }
   },
   /**
   * default onclick framework handlers
   **/
   onclickHandler: function(ev){
       if(true){
           console.log('laurbe.OnclickHandler(), revisa que tu html tiene <div id=${id} porque si no, no resuelve el id y no encuentra el onclick');
        //    console.log('el evento es');
        //    console.log(ev);
        //    console.log(' y el elemento es');
        //    console.log(this);
        //    console.log('y el laurbe element es ');
        //    console.log(laurbe.Directory[ev.currentTarget.id.replace('Wrapper','')]);
       }
   },
   /**
   * To string log traces
   **/
   toString:function(){
       console.log('-----------------------');
       console.log('instanceProperties');
       console.log(this.instanceProperties);
       console.log('this.ele');
       console.log(this.ele);
       console.log('this.fatherElement');
       console.log(this.fatherElement);
       console.log('-----------------------');
   }

}

laurbe.BaseViewElement = BaseViewElement;
console.log('adding BaseViewElement');

export default laurbe;