class FriendshipsController < ApplicationController
  before_action :authenticate_user!

  def create
    @friend_request = FriendRequest.find_by(sender_id: params.require(:user).permit(:id)[:id], receiver_id: current_user.id)
    @friend_request.update(status: "accepted")
    Friendship.create!(user_id: current_user.id, friend_id: params.require(:user).permit(:id)[:id])
  end
end
