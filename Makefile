.PHONY: test
test:
		docker-compose -f docker/docker-compose.yml -f docker/test.yml up --abort-on-container-exit

.PHONY: container
container:
	  docker-compose -f docker/docker-compose.yml -f docker/development.yml ${exec}

.PHONY: clean
clean:
	$(MAKE) exec="down" container

.PHONY: start
start:
	$(MAKE) exec="up" container

.PHONY: build
build:
	$(MAKE) exec="build" container
