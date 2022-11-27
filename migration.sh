#!/bin/sh

# yarn ts-node $(yarn bin typeorm) migration:generate migration/add-population -d ./src/app/mysql/data-source.ts

generate="gen"
run="run"
revert="re"

if [ "$1" = "$generate" ]
then
    if [ -z "$2" ]
    then
        echo 'usage: ./migration.sh gen {name}'
        exit 1;
    fi

    yarn ts-node $(yarn bin typeorm) migration:generate migration/"$2" -d ./src/app/mysql/data-source.ts
elif [ "$1" = "$run" ]
then
    yarn ts-node $(yarn bin typeorm) migration:run -d ./src/app/mysql/data-source.ts
elif [ "$1" = "$revert" ]
then
    echo "revert!!!"
else
    echo "usage: ./migration.sh {command}"
    echo "1. gen"
    echo "2. run"
    echo "3. re"
fi