defmodule Recruitbots.SimulationsController do
  use Recruitbots.Web, :controller

  def index(conn, %{}) do
    simulation_id = Base.encode64(:crypto.strong_rand_bytes(4))
    redirect conn, to: "/simulations/#{simulation_id}"
  end

  def show(conn, %{"id" => id}) do
    render conn, "index.html", id: id
  end
end
