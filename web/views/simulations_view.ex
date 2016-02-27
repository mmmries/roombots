defmodule Recruitbots.SimulationsView do
  use Recruitbots.Web, :view

  def socket_url do
    base_url = Recruitbots.Router.Helpers.page_url(Recruitbots.Endpoint, :index)
    |> String.replace("http", "ws")

    "#{base_url}socket/websocket"
  end
end
