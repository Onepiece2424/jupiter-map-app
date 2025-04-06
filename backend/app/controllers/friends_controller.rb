class FriendsController < ApplicationController
  before_action :authenticate_user!

  def index
    @friends = current_user.friends
    render json: @friends
  end
end
