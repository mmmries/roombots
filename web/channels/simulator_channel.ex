defmodule Recruitbots.SimulatorChannel do
  use Phoenix.Channel

  def join("simulator:"<>id, _auth, socket), do: {:ok, assign(socket, :id, id)}
end
