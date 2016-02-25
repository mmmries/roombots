# Roombots

A website that documents how to interact with roombots and also keeps tabs on the current whereabouts of my roombots.

# Deploying

This project is deployed with docker. You can see the Dockerfile for details or you can run your own using the [public docker image](https://hub.docker.com/r/hqmq/roombots/).

To build a new docker image follow these steps:
* make your own `config/prod.secret.exs` file with your database credentials
* change the host in `config/prod.exs`
* compile assets: `brunch build --production`
* build the docker: `docker build -t hqmq/roombots:latest .`

The image exposes port 80 (and optionally port 443) so when you run the docker container make sure you map that to something public.

When you run the docker image you will need to set the following environment variables:
* `URL_HOST` the hostname to use for generating links
* `URL_PORT` the port you use publicly for accepting traffic, used for generating links
* `SECRET_KEY_BASE` the secret to use for signing sessions and other secret data
* `SSL_KEY_FILE` __optional__ the SSL key file
* `SSL_CERT_FILE` __optional__ the SSL cert file

Personally I do this with an nginx config on the docker host like this:

```
upstream roombots {
  server 127.0.0.1:4000 fail_timeout=5s;
}

server {
  server_name roombots.riesd.com;
  listen 80;
  root /home/ec2-user/www;
  try_files $uri/index.html $uri.html $uri @app;
  location @app {
    proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    proxy_set_header Host $http_host;
    proxy_pass http://roombots;
    proxy_http_version 1.1;
    proxy_set_header Upgrade $http_upgrade;
    proxy_set_header Connection "upgrade";
  }
}
```
