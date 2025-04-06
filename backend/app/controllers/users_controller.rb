class UsersController < ApplicationController
  before_action :authenticate_user!
  before_action :set_users, only: [:me]

  def index
    @users = User.all
    render json: @users
  end

  def me
    render json: { user: @user.as_json.merge(signed_in: user_signed_in?) }
  end

  def suggestions
    sent_request_ids = current_user.sent_friend_requests.pluck(:receiver_id)
    friends_candidates = User.where.not(id: sent_request_ids + [current_user.id])
    render json: friends_candidates
  end

  def notifications
    sender_ids = current_user.received_friend_requests.where(status: "pending").pluck(:sender_id)
    @users = User.where(id: sender_ids)
    render json: @users
  end

  private

  def set_users
    @user = current_user
  end
end
