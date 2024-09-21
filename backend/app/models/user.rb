class User < ApplicationRecord
  extend Devise::Models
  devise :database_authenticatable, :registerable,
        :recoverable, :rememberable, :trackable, :validatable,
        :confirmable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  has_many :favorite_places
end
