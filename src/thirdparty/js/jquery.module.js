/**
 * Extracted from:
 * import 'https://code.jquery.com/jquery-3.6.0.min.js'
 * import 'https://bowercdn.net/c/jquery-tmpl-latest/jquery.tmpl.js'
**/

import './jquery.min.js'
import './jquery.tmpl.min.js'
import './bootstrap.min.js'

bootstrap.$ = bootstrap.jQuery = jQuery;

export default window.jQuery.noConflict(true)