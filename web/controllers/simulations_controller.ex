defmodule Recruitbots.SimulationsController do
  use Recruitbots.Web, :controller

  def index(conn, %{}) do
    render conn, "index.html"
  end
end
