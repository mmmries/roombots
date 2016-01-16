defmodule Recruitbots.Router do
  use Recruitbots.Web, :router

  forward "/beaker", Beaker.Web

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end

  scope "/", Recruitbots do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
    get "/bots", BotCheckinController, :index
    get "/simulations", SimulationsController, :index
  end

  scope "/", Recruitbots do
     pipe_through :api

    put "/bot_checkin", BotCheckinController, :update
   end
end
