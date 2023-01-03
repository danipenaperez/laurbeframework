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