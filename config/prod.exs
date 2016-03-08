use Mix.Config

config :recruitbots, Recruitbots.Endpoint,
  http: [port: 80],
  url: [host: System.get_env("URL_HOST"), port: System.get_env("URL_PORT")],
  cache_static_manifest: "priv/static/manifest.json"

if System.get_env("SSL_KEY_FILE") do
 config :recruitbots, Recruitbots.Endpoint,
  https: [
    port: 443,
    keyfile: System.get_env("SSL_KEY_FILE"),
    certfile: System.get_env("SSL_CERT_FILE"),
  ]
end

# Do not print debug messages in production
config :logger, level: :info

# Finally import the config/prod.secret.exs
# which should be versioned separately.
import_config "prod.secret.exs"
