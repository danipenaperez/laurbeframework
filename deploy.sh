#!/bin/bash


###########################
# Execute this script to rebuild the ./bin folder. 
# This folder will contains all distribution files needed to use laurbeframework
#
###########################

echo "Publishing the Cloud Distribution"

echo "Create the Tag Release"
read -p "Please insert the Tag for this release (example: 0.0.1, 1.0.1) " TagName
git add -A
git commit -m "Created New Tag $TagName"
git tag $TagName
git push origin $TagName
echo "Succesully created TAG $TagName"


echo "1. Publish on S3 Bucket"
aws s3 sync ./bin s3://laurbeframework.com/cdn/dist/$TagName/bin
aws s3 sync ./bin s3://www.laurbeframework.com/cdn/dist/$TagName/bin

aws s3 sync ./demos s3://laurbeframework.com/cdn/dist/$TagName/demos
aws s3 sync ./demos s3://www.laurbeframework.com/cdn/dist/$TagName/demos


echo "2. Invalidate cache on CloudFront"
aws cloudfront create-invalidation --distribution-id E2SPB1VGZ5MD9F --paths "/*"
aws cloudfront create-invalidation --distribution-id EKWL2JY4SGHJX --paths "/*"

echo "**************************************"
echo "* Succesfully deployed laurbe Framework, OPEN TO THE WORLD"
echo "**************************************"