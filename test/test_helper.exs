ExUnit.start

Mix.Task.run "ecto.create", ~w(-r Recruitbots.Repo --quiet)
Mix.Task.run "ecto.migrate", ~w(-r Recruitbots.Repo --quiet)
Ecto.Adapters.SQL.begin_test_transaction(Recruitbots.Repo)

