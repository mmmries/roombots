defmodule Recruitbots.BotCheckinTest do
  use ExUnit.Case
  alias Recruitbots.BotCheckin

  setup do
    BotCheckin.reset
  end

  test "we can get a list of all bots" do
    assert %{} == BotCheckin.bots
  end

  test "a bot can checkin" do
    assert %{name: "pi1", local_ip: "127.0.0.1"} = BotCheckin.checkin(%{"name" => "pi1", "local_ip" => "127.0.0.1"})
    assert %{"pi1" => %{name: "pi1", local_ip: "127.0.0.1", last_checkin_at: last_checkin}} = BotCheckin.bots
    assert Timex.Time.diff(last_checkin, Timex.Time.now, :seconds) <= 0.1
  end
end
