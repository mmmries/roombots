current_sha=$(git rev-parse --verify HEAD)
docker-compose run  --rm assets ./node_modules/brunch/bin/brunch build -p .
docker build -t hqmq/roombots:$current_sha -f DockerfileDeploy .
