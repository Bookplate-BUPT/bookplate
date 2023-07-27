#! /bin/bash

# 检查环境变量是否设置
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

# 检查操作系统
OS=$(uname -s)
EXTRA=""
if [[ "$OS" == "Darwin" ]]; then
    EXTRA="\"\""
fi

# 使用环境变量替换配置文件中的占位符
sed -i $EXTRA "s/your-appid/$BOOKPLATE_APP_ID/g" project.config.json
sed -i $EXTRA "s/your-development-env/$DEVELOPMENT_ENV/g" miniprogram/config.ts
sed -i $EXTRA "s/your-production-env/$PRODUCTION_ENV/g" miniprogram/config.ts

# 忽略配置文件的修改
git update-index --assume-unchanged project.config.json
git update-index --assume-unchanged miniprogram/config.ts