#!/bin/bash


###########################
# Execute this script to rebuild the ./bin folder. 
# This folder will contains all distribution files needed to use laurbeframework
#
###########################

echo "Building laurbeframework distribution"

PORT=8888
if [ "$3" != "" ] ; then
  PORT=$3
fi
echo "*****************************************************"
echo "** Served current directory on http://localhost:$PORT"
echo "** Press Crtl+C to stop the server and exit"

SOURCES_DEV_DIRECTORY="$PWD/src"

docker run --rm=true --name tecmint-web -p $PORT:80 -v "$SOURCES_DEV_DIRECTORY":/usr/local/apache2/htdocs/ httpd:2.4

echo "**************************************"
echo "* Stoppped local Development Server"
echo "**************************************"