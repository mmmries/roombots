defmodule Recruitbots.PageControllerTest do
  use Recruitbots.ConnCase

  test "GET /", %{conn: conn} do
    conn = get conn, "/"
    assert html_response(conn, 200) =~ "Roombots"
  end
end
