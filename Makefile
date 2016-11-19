tests:
		docker-compose -f docker/docker-compose.yml -f docker/test.yml up
container:
	  docker-compose -f docker/docker-compose.yml -f docker/development.yml ${exec}

clean:
	$(MAKE) exec="down" container

start:
	$(MAKE) exec="up" container
