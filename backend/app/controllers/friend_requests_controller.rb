class FriendRequestsController < ApplicationController
  before_action :authenticate_user!

  def create
    FriendRequest.create!(sender_id: current_user.id, receiver_id: friend_requests_params[:id], status: 0)
    render json: { status: 'success' }
  end

  def reject
    @friend_request = current_user.received_friend_requests.find_by(sender_id: params.require(:user).permit(:id)[:id])
    @friend_request.update!(status: "rejected")
  end

  private

  def friend_requests_params
    params.require(:user).permit(:id)
  end
end
