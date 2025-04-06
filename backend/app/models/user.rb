class User < ApplicationRecord
  extend Devise::Models
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  has_many :favorite_places
  has_many :friendships
  has_many :friends, through: :friendships
  has_many :inverse_friendships, class_name: 'Friendship', foreign_key: 'friend_id'
  has_many :inverse_friends, through: :inverse_friendships, source: :user
  has_many :sent_friend_requests, class_name: 'FriendRequest', foreign_key: 'sender_id', dependent: :destroy
  has_many :received_friend_requests, class_name: 'FriendRequest', foreign_key: 'receiver_id', dependent: :destroy

  validates :lastname, presence: true
  validates :firstname, presence: true
  validates :age, presence: true
  validates :gender, presence: true
  validates :email, presence: true, uniqueness: true
  # validates :password, presence: true

  enum gender: { male: 1, female: 2, other: 3 }

  def all_friends
    (friends + inverse_friends).uniq(&:id)
  end
end
