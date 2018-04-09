# INSTALLATION
- Create a mongo databse in your host machine called short_urls using Robo 3T or mongo cli
- use short_urls
- db.url_stats.insert({ _id: 'url_stats', url_count: 1 })
- change in Dockerfile the volume mapping to your host machine mongo data directory. Example:

/Users/freudromero/mongo-data:/data/db

That will give you mongo persistence when the container gets destroyed.

# RUN

docker-compose up

# TESTING

To list containers:
docker container ls

Connect to the app container
docker exec -it <container id> /bin/bash

Install dev dependencies on it, because not all consumers will be interested in tests
npm i --dev

Run mocha in that container
./node_modules/mocha/bin/mocha
