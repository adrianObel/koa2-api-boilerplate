.PHONY: test
test:
	docker-compose -f docker/docker-compose.yml -f docker/test.yml up --abort-on-container-exit

.PHONY: container
container:
	docker-compose -f docker/docker-compose.yml -f docker/development.yml ${exec}

.PHONY: test-container
test-container:
	docker-compose -f docker/docker-compose.yml -f docker/test.yml ${exec}

.PHONY: clean
clean:
	$(MAKE) exec="down" container && $(MAKE) exec="down" test-container

.PHONY: start
start:
	$(MAKE) exec="up" container

.PHONY: build
build:
	$(MAKE) exec="build" container

.PHONY: migrate
migrate:
	$(MAKE) exec="run api npm run migrate" container

