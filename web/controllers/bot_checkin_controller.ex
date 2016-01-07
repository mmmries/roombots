defmodule Recruitbots.BotCheckinController do
  use Recruitbots.Web, :controller
  alias Recruitbots.BotCheckin

  def update(conn, params) do
    bot = BotCheckin.checkin(params)
    json conn, Map.take(bot, [:name, :local_ip])
  end
end
