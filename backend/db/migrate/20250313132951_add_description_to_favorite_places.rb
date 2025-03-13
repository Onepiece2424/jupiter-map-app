class AddDescriptionToFavoritePlaces < ActiveRecord::Migration[7.0]
  def change
    add_column :favorite_places, :description, :string
  end
end
