defmodule Recruitbots.PageController do
  use Recruitbots.Web, :controller

  def index(conn, _params) do
    render conn, "index.html"
  end

  def sensors(conn, _params) do
    render conn, "sensors.html"
  end
end
