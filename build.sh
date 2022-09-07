docker build . -t redis-runner-dummy
docker tag redis-runner-dummy marcelcremer/redis-runner-dummy:latest
docker push marcelcremer/redis-runner-dummy:latest