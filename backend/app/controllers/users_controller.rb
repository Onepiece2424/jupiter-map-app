class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_users, only: [:me]

  def index
    @users = User.all
    render json: @users
  end

  def me
    render json: @user
  end

  private

  def set_users
    @user = current_user
  end
end
