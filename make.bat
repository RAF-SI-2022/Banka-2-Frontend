@echo off

if "%1" == "" goto dev

if "%1" == "build" (
    :build
    docker build -t banka2frontend .
    goto end
)

if "%1" == "test" (
    :test
    rem #todo
    goto end
)

if "%1" == "dev" (
    :dev
    rem #todo
    goto end
)

if "%1" == "prod" (
    :prod
    docker build -t banka2frontend .
    docker compose up -d banka2frontend
    goto end
)

:end