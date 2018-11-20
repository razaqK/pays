#!/bin/sh

cd -P -- "$(dirname -- "$0")"/..

if [ "$1" == "staging" -o "$1" == "production" ]; then
    if [ $1 == "staging" ]; then
        docker build -t gcr.io/apisquare-222314/apiapi-staging:latest -f Dockerfile.k8s . && \
        docker push gcr.io/apisquare-222314/apiapi-staging:latest
    else
        docker build -t gcr.io/apisquare-222314/apiapi:latest -f Dockerfile.k8s . && \
        docker push gcr.io/apisquare-222314/apiapi:latest
    fi

    gcloud beta container clusters get-credentials staging --region europe-west4 --project apisquare-222314
    kubectl delete -f k8s/$1/deployment.yaml && \
    kubectl apply -f k8s/$1/deployment.yaml
else
    echo "argument error"
fi