#!/bin/bash

for package_dir in `ls`; do
    if [[ $package_dir != 'test.sh' ]]
    then
        pwd
        cd $package_dir
        go test
        cd ..
    fi
done
