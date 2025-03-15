class AddDetailsToFavoritePlaces < ActiveRecord::Migration[7.0]
  def change
    add_column :favorite_places, :city, :string
    add_column :favorite_places, :suburb, :string
    add_column :favorite_places, :neighbourhood, :string
    add_column :favorite_places, :road, :string
  end
end
