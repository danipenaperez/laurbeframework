# laurbeframework
Public Repo of laurbeframework

# Directories

/bin: you will find all laurbe runtime files
/src: source code files and scripts
/demos: Some demos using current version 
/docs: Mkdocs site .md (files)


# HOW BUILD A VERSION

cd src
./build.sh (this command will populate /bin directory)



docker run -it --rm docker-node-grunt:1.0.0

https://gordonlesti.com/create-grunt-docker-image/

docker build -t danipenaperez_grunt .

docker run --rm -v "$PWD":/tmp -w /tmp danipenaperez_grunt npm install

docker run --rm -p8080:8080 -v "$PWD":/tmp -w /tmp danipenaperez_grunt grunt 