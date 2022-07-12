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

echo "** Served current directory on http://localhost:$PORT"
echo "** Press Crtl+C to stop the server and exit"
echo $3
echo " "
docker run --rm=true --name tecmint-web -p $PORT:80 -v "$PWD":/usr/local/apache2/htdocs/ httpd:2.4

echo "**************************************"
echo "* Assembled all laurbe framework bin FINIsSHED"
echo "* Building distribution at $SITE_OUTPUT_DIR directory...END"
echo "**************************************"