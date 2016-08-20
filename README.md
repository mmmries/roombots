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

Personally I do this with a docker command like:

```
sudo docker run -d \
  -p 80:80 \
  -p 443:443 \
  -e "SSL_KEY_FILE=/etc/ssl/private/roombots.mx.com.key" \
  -e "SSL_CERT_FILE=/etc/ssl/certs/roombots.mx.com.pem" \
  -e "URL_HOST=roombots.mx.com" \
  -e "URL_PORT=80" \
  -v /etc/ssl:/etc/ssl \
  --name roombots hqmq/roombots:0.2.3
```
