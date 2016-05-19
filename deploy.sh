VERSION=$1
docker-compose run --rm assets brunch build -p .
docker build -f DockerfileDeploy -t hqmq/roombots:$VERSION . 
