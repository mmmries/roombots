defmodule Recruitbots.BotCheckin do
  alias Timex.Time

  def start_link, do: Agent.start_link(fn -> Map.new end, name: __MODULE__)

  def reset, do: Agent.update(__MODULE__, fn(_old) -> Map.new end)
  def bots, do: Agent.get(__MODULE__, fn(bots) -> bots end)
  def checkin(%{"name" => name, "local_ip" => local_ip}) do
    new_bot = %{name: name, local_ip: local_ip, last_checkin_at: Time.now}
    :ok = Agent.update(__MODULE__, fn(bots) ->
      Map.put(bots, name, new_bot)
    end)
    new_bot
  end
end
