defmodule Recruitbots.BotCheckinController do
  use Recruitbots.Web, :controller
  alias Recruitbots.BotCheckin

  def index(conn, %{}) do
    conn = assign(conn, :bots, BotCheckin.bots)
    render conn, "index.html"
  end

  def update(conn, params) do
    bot = BotCheckin.checkin(params)
    json conn, Map.take(bot, [:name, :local_ip])
  end
end
