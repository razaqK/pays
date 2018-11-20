#!/bin/sh

cd -P -- "$(dirname -- "$0")"/..

if [ "$1" == "staging" -o "$1" == "production" ]; then
    if [ $1 == "staging" ]; then
        docker build -t gcr.io/cardapi-222314/cardapi-staging:latest -f Dockerfile.k8s . && \
        docker push gcr.io/cardapi-222314/cardapi-staging:latest
    else
        docker build -t gcr.io/cardapi-222314/cardapi:latest -f Dockerfile.k8s . && \
        docker push gcr.io/cardapi-222314/cardapi:latest
    fi

    gcloud beta container clusters get-credentials staging --region europe-west4 --project cardapi-222314
    kubectl delete -f k8s/$1/deployment.yaml && \
    kubectl apply -f k8s/$1/deployment.yaml
else
    echo "argument error"
fi