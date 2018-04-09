#INSTALLATION
- Create a mongo DB called short_urls using Robo 3T or mongo cli
- use short_urls
- db.url_stats.insert({ _id: 'url_stats', url_count: 1 })


#RUN

docker-compose up

#TESTING
List containers
docker container ls

Connect to the app container
docker exec -it <container id> /bin/bash

Install dev dependencies because not all consumers will be interested in tests
npm i --dev

Run mocha in that container
./node_modules/mocha/bin/mocha
