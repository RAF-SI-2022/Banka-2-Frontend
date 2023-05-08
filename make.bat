@echo off

if "%1" == "" goto dist

if "%1" == "dist" (
    :dist
    docker tag frontend harbor.k8s.elab.rs/banka-2/frontend
    docker build -t frontend . && docker push harbor.k8s.elab.rs/banka-2/frontend
    goto end
)

:end