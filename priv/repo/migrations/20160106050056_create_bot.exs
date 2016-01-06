defmodule Recruitbots.Repo.Migrations.CreateBot do
  use Ecto.Migration

  def change do
    create table(:bots) do
      add :hostname, :string
      add :local_ip, :string

      timestamps
    end

  end
end
