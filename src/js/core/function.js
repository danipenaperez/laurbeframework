var functionalFunction = {
	
	afterThen:function(){

	},
	then:function(){
		
		return this;
	}

}

/**
**

var usersView = new View().fromRest("/users")
							.with({initView:'astable',excludedFields:['creditCard']})
							.and()
							.editData('asForm')
							.with({noneditableFields:['id','email','creditcard']});
var cartsView = new View().fromRest("/carts")
							.with({initView:'table'})
							and()
							.editData('asForm').
							with('notEditable');
var app = new App().withStyleDetfauls().usingViews([new View({'users'}),new View({'carts'})]);
**/