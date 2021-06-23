build:
	cd wargame-backend && $(MAKE) build
	cd wargame-frontend && $(MAKE) build

run:
	docker-compose up

stop:
	docker-compose down