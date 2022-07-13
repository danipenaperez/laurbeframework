#!/bin/bash


###########################
# Execute this script to rebuild the ./bin folder. 
# This folder will contains all distribution files needed to use laurbeframework
#
###########################

echo "Publishing the Cloud Distribution"


read -p "Create the Tag Release? (Y/n)? " Continue
if [ "$Continue" = "Y" ] ; then
    read -p "Please insert the Tag for this release (example: 0.0.1, 1.0.1) " TagName
    git add -A
    git commit -m "Created New Tag $TagName"
    git tag $TagName
    git push origin $TagName
    echo "*******************************"
    echo "* Succesully created TAG $TagName"
    echo "*******************************"
fi


read -p "Publish Binary Disttribution on S3 Bucket? (Y/n)? " Continue
if [ "$Continue" = "Y" ] ; then
    aws s3 sync ./bin s3://laurbeframework.com/cdn/dist/$TagName/bin
    aws s3 sync ./bin s3://www.laurbeframework.com/cdn/dist/$TagName/bin
fi
read -p "Publish Demo Examples Distribution on S3 Bucket? (Y/n)? " Continue
if [ "$Continue" = "Y" ] ; then
aws s3 sync ./demos s3://laurbeframework.com/cdn/dist/$TagName/demos
aws s3 sync ./demos s3://www.laurbeframework.com/cdn/dist/$TagName/demos
fi

read -p "Publish Documentation Distribution on S3 Bucket? (Y/n)? " Continue
if [ "$Continue" = "Y" ] ; then
./documentation-server.sh assemble
aws s3 sync ./documentation/site s3://laurbeframework.com/cdn/dist/$TagName/docs
aws s3 sync ./documentation/site s3://www.laurbeframework.com/cdn/dist/$TagName/docs
fi

read -p "Publish Landing Page on S3 Bucket? (Y/n)? " Continue
if [ "$Continue" = "Y" ] ; then
aws s3 sync ./landingPage s3://laurbeframework.com
aws s3 sync ./landingPage s3://www.laurbeframework.com
fi

echo "*******************************"
echo "Invalidate cache on CloudFront....Start"
aws cloudfront create-invalidation --distribution-id E2SPB1VGZ5MD9F --paths "/*"
aws cloudfront create-invalidation --distribution-id EKWL2JY4SGHJX --paths "/*"
echo "Invalidate cache on CloudFront....END"
echo "*******************************"



echo "**************************************"
echo "* Succesfully deployed laurbe Framework, OPEN TO THE WORLD"
echo "* https://www.laurbeframework.com/"
echo "* https://www.laurbeframework.com/cdn/dist/$TagName/docs"
echo "**************************************"