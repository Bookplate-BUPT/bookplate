#! /bin/bash

if [[ -z $BOOKPLATE_APP_ID ]]; then
    echo "BOOKPLATE_APP_ID is not set"
    exit 1
fi

if [[ -z $DEVELOPMENT_ENV ]]; then
    echo "DEVELOPMENT_ENV is not set"
    exit 1
fi

if [[ -z $PRODUCTION_ENV ]]; then
    echo "PRODUCTION_ENV is not set"
    exit 1
fi

OS=$(uname -s)
EXTRA=""
if [[ "$OS" == "Darwin" ]]; then
    EXTRA="\"\""
fi

sed -i $EXTRA "s/your-appid/$BOOKPLATE_APP_ID/g" project.config.json
sed -i $EXTRA "s/your-development-env/$DEVELOPMENT_ENV/g" miniprogram/config.ts
sed -i $EXTRA "s/your-production-env/$PRODUCTION_ENV/g" miniprogram/config.ts

git update-index --assume-unchanged project.config.json
git update-index --assume-unchanged miniprogram/config.ts