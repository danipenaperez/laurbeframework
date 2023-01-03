import laurbe from '../../../../../js/core/laurbe.js';
import $ from "./jquery.module.js";


alert('he cargado');

laurbe.logger.log('paco is my name');
console.log(laurbe);
alert(' y jquery es '+$);
console.log($);

$('#header').html('joseluis');
var button = new laurbe.Button({});
console.log('ybutton es');
console.log(button);

var ButtonGroup = new laurbe.ButtonGroup({});
console.log('ybuttongroup es');
console.log(ButtonGroup);


var card = new laurbe.Card({});
console.log('card es');
console.log(card);
