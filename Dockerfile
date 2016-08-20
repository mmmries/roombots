FROM elixir:1.3.2
MAINTAINER Michael Ries <michael@riesd.com>

WORKDIR /roombots
ENV MIX_ENV prod
ADD mix.exs /roombots/mix.exs
ADD mix.lock /roombots/mix.lock
RUN mix local.hex --force && mix local.rebar --force && mix deps.get --only prod && mix deps.compile
ADD . /roombots
RUN mix compile && mix phoenix.digest

CMD MIX_ENV=prod mix phoenix.server
