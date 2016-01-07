defmodule Recruitbots.BotCheckinControllerTest do
  use Recruitbots.ConnCase

  test "PUT /bot_checkin", %{conn: conn} do
    conn = put conn, "/bot_checkin", %{name: "pi1", local_ip: "127.0.0.1"}
    parsed = json_response(conn, 200)
    assert %{} = parsed
  end
end
