defmodule Recruitbots.SimulationsController do
  use Recruitbots.Web, :controller

  def index(conn, %{}) do
    conn = put_layout(conn, "simulation.html")
    render conn, "index.html"
  end
end
