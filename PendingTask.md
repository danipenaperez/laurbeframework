# Configuracion

Para encontrar las templates a usar y la configuracion y demas, estaria bien un objeto configuraiton
La idea es pasar configuracion luego se lee por ejemplo el css y se haria un document.appendNode(css)
var app_config = {
    templatesDir: 'http://myrepositoriodetemplates.com/templates',
    extraCss: 'http://myrepositoriodecss.com/css'
}
var app = new laurbeApp({configuration: config})


y luego internamente añadir los css por ejemplo: 
var head = document.getElementsByTagName('head')[0]
      
    // Creating link element
    var style = document.createElement('link') 
    style.href = 'styles.css'
    style.type = 'text/css'
    style.rel = 'stylesheet'
    head.append(style);