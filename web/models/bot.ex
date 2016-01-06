defmodule Recruitbots.Bot do
  use Recruitbots.Web, :model

  schema "bots" do
    field :hostname, :string
    field :local_ip, :string

    timestamps
  end

  @required_fields ~w(hostname local_ip)
  @optional_fields ~w()

  @doc """
  Creates a changeset based on the `model` and `params`.

  If no params are provided, an invalid changeset is returned
  with no validation performed.
  """
  def changeset(model, params \\ :empty) do
    model
    |> cast(params, @required_fields, @optional_fields)
  end
end
