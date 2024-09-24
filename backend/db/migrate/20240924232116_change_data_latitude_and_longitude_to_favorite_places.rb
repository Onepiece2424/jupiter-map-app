class ChangeDataLatitudeAndLongitudeToFavoritePlaces < ActiveRecord::Migration[7.0]
  def change
    change_column :favorite_places, :latitude, :float
    change_column :favorite_places, :longitude, :float
  end
end
