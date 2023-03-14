.DEFAULT_GOAL := dev

build:
	docker build -t banka2frontend .

test:
    #TODO

dev:
    #TODO

prod:
    docker build -t banka2frontend .
    docker compose up -d banka2frontend