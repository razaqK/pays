#!/bin/sh

cd -P -- "$(dirname -- "$0")"/..

if [ "$1" == "staging" -o "$1" == "production" ]; then
    if [ $1 == "staging" ]; then
        docker build -t gcr.io/balanceapi-222314/balanceapi-staging:latest -f Dockerfile.k8s . && \
        docker push gcr.io/balanceapi-222314/balanceapi-staging:latest
    else
        docker build -t gcr.io/balanceapi-222314/balanceapi:latest -f Dockerfile.k8s . && \
        docker push gcr.io/balanceapi-222314/balanceapi:latest
    fi

    gcloud beta container clusters get-credentials staging --region europe-west4 --project balanceapi-222314
    kubectl delete -f k8s/$1/deployment.yaml && \
    kubectl apply -f k8s/$1/deployment.yaml
else
    echo "argument error"
fi