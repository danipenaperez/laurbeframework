// import 'https://code.jquery.com/jquery-3.6.0.min.js'
// console.log('y jquery es ');
// console.log(jQuery);
// console.log($);
// console.log(window);
// console.log(window.jQuery);
// import 'https://bowercdn.net/c/jquery-tmpl-latest/jquery.tmpl.js'
// console.log('he cargado jquery template');
// console.log(jQuery);
// export default window.jQuery.noConflict(true)


import './jquery.min.js'
console.log('y jquery es ');
console.log(jQuery);
console.log($);
console.log(window);
console.log(window.jQuery);
import './jquery.tmpl.min.js'
console.log('he cargado jquery template');
console.log(jQuery);
// window.global = {};
// import './popper.js'

// import './bootstrap.bundle.min.js'
import './bootstrap.min.js'

console.log('he cargado bootstrap');
console.log(bootstrap);
bootstrap.$ = bootstrap.jQuery = jQuery;

// import './popper.js'
// console.log('he cargado popper template');
export default window.jQuery.noConflict(true)