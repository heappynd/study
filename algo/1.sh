#!/bin/bash

# 获取当前主机的IP地址
CURRENT_IP=$(hostname -I | cut -d' ' -f1)

# 根据IP判断当前环境
if [[ $CURRENT_IP == "10.252.132.145" ]]; then
    NAMESPACE="aiapppl4-ganzhoukyop4-tst"
elif [[ $CURRENT_IP == "10.208.96.7" ]]; then
    NAMESPACE="aiplatpl1-zunyi1op2-syt"
else
    echo "无法确定当前环境，请手动指定命名空间。"
    exit 1
fi

# 用户选择部署名称
echo "请选择要编辑的部署名称："
echo "1. ai-platform-model-trainning-management-web"
echo "2. ai-platform-playground-web"
read -p "请输入选项数字：" CHOICE

case $CHOICE in
1)
    DEPLOYMENT_NAME="ai-platform-model-trainning-management-web"
    ;;
2)
    DEPLOYMENT_NAME="ai-platform-playground-web"
    ;;
*)
    echo "错误：无效选项，请选择 1 或 2."
    exit 1
    ;;
esac

# 打印即将执行的命令
echo "将执行以下命令："
echo "kubectl delete pod -n $NAMESPACE $DEPLOYMENT_NAME"
