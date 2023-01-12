# laurbeframework
Public Repo of laurbeframework

# Directories
/bin: you will find all laurbe runtime files
/src: source code files and scripts
/demos: Some demos using current version 
/docs: Mkdocs site .md (files)

# Branch
It is only main branch, and created tags from this branch.

# HOW TO DEVELOP NEW FEATURES
1. Run ./development-server.sh will serve /bin and /demos at http://localhost:8888/bin http://localhost:8888/demos
2. Change source files at /src 
3. Build the whole JS executing ./build.sh (automatically server will serve it)
4. Test the framework using /demos html files at  http://localhost:8888

# HOW TO DOCUMENT FEATURE
1. Execute ./documentation-server.sh to run MKDOCS server. 
2. Edit /documentation/docs/**.md files
3. Check it at http://localhost:9999
4. Stop server ./documentation-server.sh stop

# HOW BUILD A VERSION

1. Execute ./build.sh 
2. Execute ./documentation-server.sh generate
3. Execute ./deploy.sh


# Pending Task
1. Hacer un objeto laurbeConfig. que contenga la informacion relativa a donde esta la ruta de las templates, los css a cargar, etc..
y la app al hacer el init lo carga.
2. Comprobar que no tenemos dependencias de js ni css de terceros, porque al cargar luego la pagina fuera de localhost puede dar problemas de cors y otras movidas.
3. Comprobar que templateManger al llamar 2 veces por una template de componente,  no la esta metiendo 2 veces en el <div id"templateManager">
La llamada http la hace y esto ya esta mal. Habria que comprobar si la tiene y si la tiene, pues no se hace el load,  y se va directamente a pintarse.
4. Navigation : Hay un problema por el cual se pone view_id=Loquesea# y se cuela la almohadilla, de manera que si refrescamos la pagina el metodo navigate busca la vista por id con la almohadilla y claro no encuentra nada

5. Cargar CSS en los propios elementos 
6. El jumbotron tiene la plantilla a pincho, hay que partirla en componentes

5.BaseView todo extiende de baseview pero en verdad es baseviewElement, hay que aclarar todo este asunto para que no haya ambiguedad
ejemplo require
https://github.com/requirejs/example-multipage

EJEMPLOS CON EMCSA 6 import modules, creo que esta es la buena
https://github.dev/mdn/js-examples/blob/main/module-examples/basic-modules/index.html

!!BACKGROUND IMAGES GENERATOR!!
https://bgjar.com/

IDEAS ESTILOS:
https://codepen.io/ig_design/pen/XWXZaGb