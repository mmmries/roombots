FROM hqmq/docker-elixir:1.2.0.0
MAINTAINER Michael Ries <michael@riesd.com>

ADD . /roombots
WORKDIR /roombots
RUN mix clean
RUN mix local.hex --force
RUN mix local.rebar --force
RUN MIX_ENV=prod mix deps.get --only prod
RUN MIX_ENV=prod mix compile
RUN MIX_ENV=prod mix phoenix.digest

CMD MIX_ENV=prod mix phoenix.server
