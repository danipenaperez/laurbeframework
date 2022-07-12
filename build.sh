#!/bin/bash

echo "Building laurbeframework distribution"

#Execute dependent scripts
# ./assembly-snippets.sh

CURRENT_USER=$(whoami)
echo $CURRENT_USER


SITE_OUTPUT_DIR=$PWD/bin
# Remove old folder
if [ -d "$SITE_OUTPUT_DIR" ]; 
  echo "Cleaning ouputFolder"
  then rm -Rf $SITE_OUTPUT_DIR; 
fi

mkdir $SITE_OUTPUT_DIR

# Static resources
echo "Copying Html source to output Bin directory...."
cp -R ./html $SITE_OUTPUT_DIR
echo "Copying images source to output Bin directory...."
cp -R ./images $SITE_OUTPUT_DIR
echo "Copying Stylesheets source to output Bin directory...."
cp -R ./stylesheets $SITE_OUTPUT_DIR
echo "Copying Thirdparty source to output Bin directory...."
cp -R ./thirdparty $SITE_OUTPUT_DIR


# Building Javascript concat and minify
echo "Concat all Js files...."
SRC_DIR=$PWD/src
JS_CONCAT_OUTPUT_DIR=$SRC_DIR/js
# Remove old folder
if [ -d "$JS_CONCAT_OUTPUT_DIR" ]; 
  echo "Cleaning ouputFolder"
  then rm -Rf $JS_CONCAT_OUTPUT_DIR; 
fi

# Execute grunt and generate js dir
cd $SRC_DIR
npm install
grunt
echo "Concat all Js files....END"
echo "Moving concat JS to Bin dir...."
mv $JS_CONCAT_OUTPUT_DIR  $SITE_OUTPUT_DIR
echo "Moving concat JS to Bin dir....END"
#Build Image
#docker build -t fwkcna/mkdocs .


#Assmebly site folder
# docker run --rm -it --name fwkcna_mkdocs -p 9999:8000 -v $PWD:/docs fwkcna/mkdocs:latest build

# Reassign permissions to current user 
# sudo chown -R $CURRENT_USER:$CURRENT_USER ./site

echo "Building distribution at $SITE_OUTPUT_DIR directory...END"