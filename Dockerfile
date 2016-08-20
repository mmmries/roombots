FROM elixir:1.3.2
MAINTAINER Michael Ries <michael@riesd.com>

ADD . /roombots
WORKDIR /roombots
ENV MIX_ENV prod
RUN mix local.hex --force && mix local.rebar --force && mix deps.get --only prod && mix compile && mix phoenix.digest

CMD MIX_ENV=prod mix phoenix.server
