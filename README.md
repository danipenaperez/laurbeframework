# laurbeframework
Public Repo of laurbeframework

# Directories

/bin: you will find all laurbe runtime files
/src: source code files and scripts
/demos: Some demos using current version 
/docs: Mkdocs site .md (files)


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

