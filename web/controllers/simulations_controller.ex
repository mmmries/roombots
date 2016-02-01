defmodule Recruitbots.SimulationsController do
  use Recruitbots.Web, :controller

  def index(conn, %{}) do
    simulation_id = Base.encode64(:crypto.strong_rand_bytes(4))
    render conn, "index.html", generated_id: simulation_id
  end

  def show(conn, %{"id" => id}=opts) do
    maze_type = Map.get(opts, "maze", "empty")
    render conn, "show.html", id: id, maze_type: maze_type
  end
end
