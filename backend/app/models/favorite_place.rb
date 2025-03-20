class FavoritePlace < ApplicationRecord
  include Rails.application.routes.url_helpers

  belongs_to :user
  has_one_attached :image do |attachable|
    attachable.variant :thumb, resize_to_limit: [100, 100]
  end

  def image_url
    image.attached? ? url_for(image) : nil
  end
end
