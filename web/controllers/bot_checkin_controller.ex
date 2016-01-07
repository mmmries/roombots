defmodule Recruitbots.BotCheckinController do
  use Recruitbots.Web, :controller
  alias Recruitbots.BotCheckin

  def update(conn, params) do
    bot = BotCheckin.checkin(params)
    render conn, bot
  end
end
