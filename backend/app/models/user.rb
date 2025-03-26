class User < ApplicationRecord
  extend Devise::Models
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable, :omniauthable
  include DeviseTokenAuth::Concerns::User

  has_many :favorite_places

  validates :lastname, presence: true
  validates :firstname, presence: true
  validates :age, presence: true
  validates :gender, presence: true
  validates :email, presence: true, uniqueness: true
  # validates :password, presence: true

  enum gender: { male: 1, female: 2, other: 3 }
end
