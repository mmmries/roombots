defmodule Recruitbots.SimulatorChannel do
  use Phoenix.Channel

  def join("simulator:"<>id, _auth, socket), do: {:ok, assign(socket, :id, id)}

  def handle_in("sensor_update", sensors, socket) do
    id = socket.assigns.id
    Recruitbots.Endpoint.broadcast("simulation:"<>id, "sensor_update", sensors)
    {:reply, {:ok, %{}}, socket}
  end
end
