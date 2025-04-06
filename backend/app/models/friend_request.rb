class FriendRequest < ApplicationRecord
  belongs_to :sender, class_name: 'User'
  belongs_to :receiver, class_name: 'User'

  enum status: { pending: 0, accepted: 1, rejected: 2 }
end
