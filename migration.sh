#!/bin/sh

generate="gen"
run="run"
revert="re"
create="create"

if [ "$1" = "$generate" ] # generate
then

    if [ -z "$2" ]
    then
        echo 'usage: ./migration.sh gen {name}'
        exit 1;
    fi

    yarn ts-node $(yarn bin typeorm) migration:generate migration/"$2" -d ./libs/entity/src/data-source.ts

elif [ "$1" = "$run" ] # run
then

    yarn ts-node $(yarn bin typeorm) migration:run -d ./libs/entity/src/data-source.ts

elif [ "$1" = "$revert" ] # revert
then

    yarn ts-node $(yarn bin typeorm) migration:revert -d ./libs/entity/src/data-source.ts

elif [ "$1" = "$create" ] # create
then

    if [ -z "$2" ]
    then
        echo 'usage: ./migration.sh create {name}'
        exit 1;
    fi

    yarn ts-node $(yarn bin typeorm) migration:create migration/"$2"

else
    echo "usage: ./migration.sh {command}"
    echo "1. gen"
    echo "2. run"
    echo "3. re"
    echo "4. create"
    exit 1;
fi