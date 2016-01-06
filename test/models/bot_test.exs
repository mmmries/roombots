defmodule Recruitbots.BotTest do
  use Recruitbots.ModelCase

  alias Recruitbots.Bot

  @valid_attrs %{hostname: "some content", local_ip: "some content"}
  @invalid_attrs %{}

  test "changeset with valid attributes" do
    changeset = Bot.changeset(%Bot{}, @valid_attrs)
    assert changeset.valid?
  end

  test "changeset with invalid attributes" do
    changeset = Bot.changeset(%Bot{}, @invalid_attrs)
    refute changeset.valid?
  end
end
