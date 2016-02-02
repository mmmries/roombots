defmodule Recruitbots.SimulationsController do
  use Recruitbots.Web, :controller
  import Recruitbots.Mazes

  def index(conn, %{}) do
    simulation_id = Base.encode64(:crypto.strong_rand_bytes(4))
    render conn, "index.html", generated_id: simulation_id
  end

  def show(conn, %{"id" => id}=opts) do
    maze_type = Map.get(opts, "maze", "empty")
    render conn, "show.html", id: id, maze: maze(maze_type), initial_position: initial_position(maze_type)
  end
end
