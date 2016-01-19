defmodule Recruitbots.SimulationChannel do
  use Phoenix.Channel

  def join("simulation:"<>id, _auth, socket), do: {:ok, assign(socket, :id, id)}

  def handle_in("drive", %{"velocity" => v, "radius" => r}, socket) do
    id = socket.assigns.id
    Recruitbots.Endpoint.broadcast("simulator:"<>id, "drive", %{velocity: v, radius: r})
    {:reply, {:ok, %{}}, socket}
  end
end
