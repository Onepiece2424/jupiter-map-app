class UsersController < ApplicationController
  def index
    users = { id:1, nickname: "ぴよっち", age: 22 }
    render json: users
  end
end
